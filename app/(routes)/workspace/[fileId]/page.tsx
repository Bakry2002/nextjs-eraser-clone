import FileHeader from './_components/file-header';
import Editor from './_components/editor';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import Canvas from './_components/canvas';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Skeleton } from '@/components/ui/skeleton';

const FilePage = async ({ params }: { params: { fileId: string } }) => {
    const { fileId } = params;

    if (!fileId) {
        return;
    }
    const file = await fetchQuery(api.files.getFileById, {
        _id: fileId as any,
    });

    return (
        <div>
            <FileHeader file={file} />
            {file ? (
                <ResizablePanelGroup
                    direction="horizontal"
                    className="min-h-[200px]"
                >
                    <ResizablePanel minSize={25}>
                        {/* 1. Document */}
                        <div className="h-[calc(100vh-58.4px)]">
                            <Editor file={file} />
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle className="bg-neutral-800" />
                    <ResizablePanel minSize={50}>
                        {/* 2. WhiteBoard/Canvas  */}
                        <div className="h-[calc(100vh-58.4px)] border-l border-neutral-800">
                            <Canvas file={file} />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            ) : (
                <div className="mt-8 flex h-screen flex-col items-center space-y-3">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[500px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilePage;
