'use client';

import { FileListContext } from '@/context/file-list-context';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Image from 'next/image';
import { Archive, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ActiveTeamContext } from '@/context/active-team-context';

export type FileProps = {
    _id: string;
    name: string;
    archive: boolean;
    createdBy: string;
    document: string;
    whiteboard: string;
    teamId: string;
    _creationTime: number;
};

const ArchiveList = () => {
    const { activeTeam_ } = useContext(ActiveTeamContext);
    const { user } = useKindeBrowserClient();
    const router = useRouter();
    const convex = useConvex();
    // const { fileList_ } = useContext(FileListContext);

    const [archivedFileList, setArchivedFileList] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArchivedFiles();
        console.log('archived files: ', archivedFileList);
        setLoading(false);
    }, [archivedFileList]);

    const getArchivedFiles = async () => {
        const result = await convex.query(api.files.getFiles, {
            teamId: activeTeam_?._id ?? '',
            archive: true,
        });
        console.log('result', result);
        setArchivedFileList(result);
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-neutral-800">
            <table className="min-w-full divide-y-2 divide-neutral-800  bg-[#171717] text-sm">
                <thead className="bg-neutral-800 text-left">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                            Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                            Created
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                            Edited
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                            Author
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-neutral-800">
                    {!loading &&
                        !archivedFileList &&
                        archivedFileList?.length === 0 && (
                            <tr>
                                <td>No Archived files</td>
                            </tr>
                        )}
                    {!loading &&
                    archivedFileList &&
                    archivedFileList.length !== null ? (
                        archivedFileList.map((file: FileProps) => (
                            <tr
                                key={file?._id}
                                className="cursor-pointer transition hover:bg-neutral-800/75"
                                onClick={() =>
                                    router.push(`/workspace/${file?._id}`)
                                }
                            >
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                    {file?.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white">
                                    {moment(file?._creationTime).format(
                                        'DD MMM YYYY',
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white">
                                    {moment(file?._creationTime).format(
                                        'DD MMM YYYY',
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white">
                                    <Image
                                        src={user?.picture ?? ''}
                                        alt="user"
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                </td>
                                <td className="relative z-50 whitespace-nowrap px-4 py-2 text-white">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="border border-neutral-700 bg-[#171717] text-white">
                                            <DropdownMenuItem className="gap-2">
                                                <Edit className=" h-4 w-4" />
                                                Rename
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="gap-2">
                                                <Archive className=" h-4 w-4" />
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2">
                                                <Trash2 className=" h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                <Skeleton className="h-4 w-[200px]" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                <Skeleton className="h-4 w-[200px]" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                <Skeleton className="h-4 w-[200px]" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                <Skeleton className="h-4 w-[200px]" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                <Skeleton className="h-4 w-[200px]" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ArchiveList;
