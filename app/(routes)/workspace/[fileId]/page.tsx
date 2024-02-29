import FileHeader from './_components/file-header';
import Editor from './_components/editor';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

const FilePage = async ({ params }: { params: { fileId: string } }) => {
    const { fileId } = params;

    const file = await fetchQuery(api.files.getFileById, {
        _id: fileId as any,
    });

    return (
        <div>
            <FileHeader fileName={file?.name} />

            {/* workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* 1. Document */}
                <div className="h-screen ">
                    <Editor fileName={file?.name} />
                </div>
                {/* 2. WhiteBoard/Canvas  */}
                <div className="h-screen bg-lime-500">Canvas Grid</div>
            </div>
        </div>
    );
};

export default FilePage;
