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
            <FileHeader fileName={file?.name} />
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
        </div>
    );
};

export default FilePage;
