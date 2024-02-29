'use client';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Skeleton } from '@/components/ui/skeleton';
import { FileProps } from '@/app/(routes)/dashboard/_components/file-list';
import Canvas from './canvas';
import Editor from './editor';
import { useContext } from 'react';
import { ViewTypeContext } from '@/context/view-type-context';
import Image from 'next/image';

const FileResizablePanel = ({ file }: { file: FileProps }) => {
    const { viewType_ } = useContext(ViewTypeContext);
    return (
        <div>
            {file?.archive && (
                <div className="h-auto w-full bg-white text-black">
                    <div>
                        <h2 className="text-center text-xl font-bold">
                            This file is archived
                        </h2>
                        <p className="text-center">by: {file?.createdBy}</p>
                    </div>
                </div>
            )}
            {file ? (
                <ResizablePanelGroup
                    direction="horizontal"
                    className="min-h-[200px]"
                >
                    {viewType_ === 'document' && (
                        <ResizablePanel minSize={25}>
                            {/* 1. Document */}
                            <div className={` h-[calc(100vh-58.4px)]`}>
                                <Editor file={file} />
                            </div>
                        </ResizablePanel>
                    )}
                    {viewType_ === 'canvas' && (
                        <ResizablePanel minSize={50}>
                            {/* 2. WhiteBoard/Canvas  */}
                            <div className="h-[calc(100vh-58.4px)] border-l border-neutral-800">
                                <Canvas file={file} />
                            </div>
                        </ResizablePanel>
                    )}

                    {viewType_ === 'both' && (
                        <>
                            <ResizablePanel minSize={25}>
                                {/* 1. Document */}
                                <div className={` h-[calc(100vh-58.4px)]`}>
                                    <Editor file={file} />
                                </div>
                            </ResizablePanel>
                            <ResizableHandle
                                withHandle
                                className="bg-neutral-800"
                            />
                            <ResizablePanel minSize={50}>
                                {/* 2. WhiteBoard/Canvas  */}
                                <div className="h-[calc(100vh-58.4px)] border-l border-neutral-800">
                                    <Canvas file={file} />
                                </div>
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            ) : (
                <div className="mt-8 flex h-screen flex-col items-center space-y-3">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[900px]" />
                        <Skeleton className="h-4 w-[500px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileResizablePanel;
