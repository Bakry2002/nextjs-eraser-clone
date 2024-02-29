'use client';

import { FileListContext } from '@/context/file-list-context';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Image from 'next/image';
import { Archive, ArrowRightLeft, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

const FileList = () => {
    const { user } = useKindeBrowserClient();
    const router = useRouter();
    const { fileList_ } = useContext(FileListContext);

    const [fileList, setFileList] = useState<any>();

    useEffect(() => {
        fileList_ && setFileList(fileList_);
        console.log('fileList_', fileList_);
    }, [fileList_]);

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
                    {fileList &&
                        fileList.map((file: FileProps) => (
                            <tr
                                key={file?._id}
                                onClick={() =>
                                    router.push(`/workspace/${file?._id}`)
                                }
                                className="cursor-pointer transition hover:bg-neutral-800/75"
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
                                <td className="whitespace-nowrap px-4 py-2 text-white">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="border border-neutral-700 bg-[#171717] text-white">
                                            <DropdownMenuItem className="gap-2">
                                                <Archive className=" h-4 w-4" />
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2">
                                                <ArrowRightLeft className=" h-4 w-4" />
                                                Switch file
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Team
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Subscription
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileList;
