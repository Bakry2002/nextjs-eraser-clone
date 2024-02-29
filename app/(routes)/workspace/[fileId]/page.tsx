import FileHeader from './_components/file-header';
import Editor from './_components/editor';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import Canvas from './_components/canvas';

const FilePage = async ({ params }: { params: { fileId: string } }) => {
    const { fileId } = params;

    if (!fileId) {
        return;
    }

    const file = await fetchQuery(api.files.getFileById, {
        _id: fileId as any,
    });

    if (!file) {
        return;
    }

    return (
        <div>
            <FileHeader fileName={file?.name} />

            {/* workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* 1. Document */}
                <div className="h-[calc(100vh-58.4px)]">
                    <Editor file={file} />
                </div>
                {/* 2. WhiteBoard/Canvas  */}
                <div className="h-[calc(100vh-58.4px)] border-l border-neutral-800">
                    <Canvas file={file} />
                </div>
            </div>
        </div>
    );
};

export default FilePage;
