'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Archive,
    ArchiveRestore,
    ArrowRightLeft,
    LayoutDashboard,
    LinkIcon,
    MoreHorizontal,
    Save,
    Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useContext } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { SaveTriggerContext } from '@/context/save-trigger-context';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FileProps } from '@/app/(routes)/dashboard/_components/file-list';
import { toast } from 'sonner';
import { ViewTypeContext } from '@/context/view-type-context';
import { cn } from '@/lib/utils';

const FileHeader = ({ file }: { file: FileProps }) => {
    const router = useRouter();

    const { setSaveTrigger_, saveTrigger_ } = useContext(SaveTriggerContext);
    const { viewType_, setViewType_ } = useContext(ViewTypeContext);

    const deleteFile = useMutation(api.files.deleteFile);
    const handleDelete = () => {
        deleteFile({ _id: file?._id as any }).then((res) => {
            toast.success('File deleted successfully');
            router.push('/dashboard');
        });
    };

    const archiveFile = useMutation(api.files.archiveFile);
    const handleArchive = () => {
        archiveFile({
            _id: file?._id as any,
            archive: !file?.archive,
        }).then((res) => {
            if (file?.archive) {
                toast.success('File restored!');
                router.refresh();
                router.push('/dashboard');
            } else {
                toast.success('File archived!');
                router.refresh();
                router.push('/dashboard');
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-between gap-y-4 border-b border-neutral-800 p-3 sm:flex-row">
            {/* File name */}
            <div className="flex items-center justify-start gap-2">
                <Link href="/dashboard">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                </Link>
                <h2 className="text-sm font-semibold">{file?.name}</h2>

                {/* File Options */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border border-neutral-700 bg-[#171717] text-white">
                        <DropdownMenuItem
                            className="gap-2"
                            onClick={handleArchive}
                        >
                            {file?.archive ? (
                                <span className="flex gap-2">
                                    <ArchiveRestore className=" h-4 w-4" />
                                    Restore file
                                </span>
                            ) : (
                                <span className="flex gap-2">
                                    <Archive className=" h-4 w-4" />
                                    Archive
                                </span>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="gap-2"
                            onClick={() => router.push('/dashboard')}
                        >
                            <LayoutDashboard className=" h-4 w-4" />
                            Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <ArrowRightLeft className=" h-4 w-4" />
                            Switch file
                        </DropdownMenuItem>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="h-8 w-full justify-start gap-2 rounded-md  px-0 pl-2 hover:bg-red-500 hover:text-white">
                                    <Trash2 className="h-4  w-4" /> Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the file and remove
                                        your data inside it.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Show/Hide */}
            <div className="flex items-center justify-center">
                <div className="flex flex-row items-center rounded  bg-neutral-800">
                    <div className="flex h-full  items-center overflow-hidden whitespace-nowrap rounded border border-neutral-700  bg-neutral-800">
                        <span className="inline-flex">
                            <Button
                                className={cn(
                                    'relative h-8 min-w-20 rounded-none border-r border-neutral-700  px-3 py-1 text-sm font-medium text-white shadow-sm outline-transparent hover:bg-neutral-800/75 ',
                                    viewType_ === 'document' &&
                                        'bg-neutral-800 ',
                                )}
                                onClick={() => {
                                    setViewType_('document');
                                }}
                            >
                                Document
                            </Button>
                        </span>

                        <span className="inline-flex">
                            <Button
                                className={cn(
                                    'relative h-8 min-w-20 rounded-none border-r border-neutral-700  px-3 py-1 text-sm font-medium text-white shadow-sm outline-transparent hover:bg-neutral-800/75 ',
                                    viewType_ === 'both' && 'bg-neutral-800 ',
                                )}
                                onClick={() => {
                                    setViewType_('both');
                                }}
                            >
                                Both
                            </Button>
                        </span>

                        <span className="inline-flex">
                            <Button
                                className={cn(
                                    'relative h-8 min-w-20 rounded-none border-r border-neutral-700  px-3 py-1 text-sm font-medium text-white shadow-sm outline-transparent hover:bg-neutral-800/75 ',
                                    viewType_ === 'canvas' && 'bg-neutral-800 ',
                                )}
                                onClick={() => {
                                    setViewType_('canvas');
                                }}
                            >
                                Canvas
                            </Button>
                        </span>
                    </div>
                </div>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-4">
                {/* Save button */}
                <Button
                    className="hidden h-8 items-center justify-center gap-2 bg-red-500  hover:bg-red-500/75 sm:flex"
                    onClick={() => {
                        setSaveTrigger_(!saveTrigger_);
                    }}
                >
                    Save <Save className="h-4 w-4" />
                </Button>
                {/* Share button */}
                <Button className="hidden h-8 items-center justify-center gap-2 bg-blue-500  hover:bg-blue-500/75 sm:flex">
                    Share <LinkIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default FileHeader;
