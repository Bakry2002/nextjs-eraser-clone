'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Archive,
    ArrowRightLeft,
    LayoutDashboard,
    Link,
    MoreHorizontal,
    Save,
    Share,
} from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { SaveTriggerContext } from '@/context/save-trigger-context';
import { FileListContext } from '@/context/file-list-context';

const FileHeader = ({ fileName }: { fileName: string }) => {
    const router = useRouter();
    const { setSaveTrigger_, saveTrigger_ } = useContext(SaveTriggerContext);

    return (
        <div className="flex flex-col items-center justify-between gap-y-4 border-b border-neutral-800 p-3 sm:flex-row">
            {/* File name */}
            <div className="flex items-center justify-start gap-2">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <h2 className="text-sm font-semibold">{fileName}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border border-neutral-700 bg-[#171717] text-white">
                        <DropdownMenuItem className="gap-2">
                            <Archive className=" h-4 w-4" />
                            Archive
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
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Show/Hide */}
            <div className="flex items-center justify-center">
                <div className="flex flex-row items-center rounded  bg-neutral-800">
                    <div className="flex h-full  items-center overflow-hidden whitespace-nowrap rounded border border-neutral-700  bg-neutral-800">
                        <span className="inline-flex">
                            <Button className="relative h-8 min-w-20 rounded-none border-r border-neutral-700 bg-neutral-800 px-3 py-1 text-sm font-medium text-white shadow-sm outline-transparent hover:bg-neutral-800/75 ">
                                Document
                            </Button>
                        </span>

                        <span className="inline-flex">
                            <Button className="relative hidden h-8 min-w-20 rounded-none border-r border-neutral-700 px-3 py-1 text-sm font-medium text-white shadow-sm outline-transparent hover:bg-neutral-800/75 sm:block">
                                Both
                            </Button>
                        </span>

                        <span className="inline-flex">
                            <Button className="relative h-8 min-w-20 rounded-none  px-3 py-1 text-sm font-medium text-white shadow-sm outline-transparent hover:bg-neutral-800/75 ">
                                Canvas
                            </Button>
                        </span>
                    </div>
                </div>
            </div>

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
                    Share <Link className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default FileHeader;
