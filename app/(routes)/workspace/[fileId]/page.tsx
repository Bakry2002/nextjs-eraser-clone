import FileHeader from './_components/file-header';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import FileResizablePanel from './_components/file-resizable-panel';

const FilePage = async ({ params }: { params: { fileId?: string } }) => {
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
            <FileResizablePanel file={file} />
        </div>
    );
};

export default FilePage;
