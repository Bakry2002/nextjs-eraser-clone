'use client';

import EditorJS from '@editorjs/editorjs';
import { useContext, useEffect, useRef, useState } from 'react';
import Header from '@editorjs/header';

// @ts-expect-error
import List from '@editorjs/list';
// @ts-expect-error
import Checklist from '@editorjs/checklist';
// @ts-expect-error
import SimpleImage from '@editorjs/simple-image';
// @ts-expect-error
import Paragraph from '@editorjs/paragraph';
// @ts-expect-error
import Alert from 'editorjs-alert';
// @ts-expect-error
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist';
// @ts-expect-error
import CodeTool from '@editorjs/code';
// @ts-expect-error
import Underline from '@editorjs/underline';
// @ts-expect-error
import DragDrop from 'editorjs-drag-drop';
import { SaveTriggerContext } from '@/context/save-trigger-context';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FileProps } from '@/app/(routes)/dashboard/_components/file-list';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const rowDocument = {
    time: 1629782400000,
    blocks: [
        {
            data: {
                text: 'Document Name',
                level: 2,
            },
            id: '123',
            type: 'header',
        },
        {
            data: {
                level: 4,
            },
            id: '1234',
            type: 'header',
        },
    ],
    version: '2.8.1',
};

const Editor = ({ file }: { file: FileProps }) => {
    const { saveTrigger_ } = useContext(SaveTriggerContext);
    const updateDocument = useMutation(api.files.updateDocument);
    const router = useRouter();

    const rowDocument = {
        time: 1629782400000,
        blocks: [
            {
                data: {
                    text: file?.name || 'Untitled File',
                    level: 2,
                },
                id: '123',
                type: 'header',
            },
            {
                data: {
                    level: 4,
                },
                id: '1234',
                type: 'header',
            },
        ],
        version: '2.8.1',
    };

    useEffect(() => {
        initEditor();
    }, []);

    useEffect(() => {
        saveTrigger_ && onSaveDocument();
    }, [saveTrigger_]);

    const onSaveDocument = () => {
        if (ref.current) {
            ref.current
                .save()
                .then((outputData) => {
                    updateDocument({
                        _id: file?._id as any,
                        document: JSON.stringify(outputData),
                    }).then(
                        (res) => {
                            toast.success('Document updated!');
                            router.refresh();
                        },
                        (error) => {
                            toast.error('Failed to update document');
                        },
                    );
                })
                .catch((error) => {
                    console.log('Saving failed: ', error);
                });
        }
    };

    const ref = useRef<EditorJS>();
    const [document, setDocument] = useState<any>(rowDocument);

    const initEditor = () => {
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            onReady: () => {
                new DragDrop(editor);
            },
            tools: {
                underline: Underline,
                code: {
                    class: CodeTool,
                    config: {
                        placeholder: 'Enter code',
                    },
                },
                nestedchecklist: editorjsNestedChecklist,
                alert: {
                    class: Alert,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+A',
                    config: {
                        defaultType: 'primary',
                        messagePlaceholder: 'Enter something',
                    },
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                image: {
                    class: SimpleImage,
                },
                list: {
                    class: List as any,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered',
                    },
                },
                header: {
                    class: Header as any,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header',
                    },
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
            },
            holder: 'editorjs',
            data: file?.document ? JSON.parse(file?.document) : document,
            placeholder: 'Let`s write an awesome story!',
        });
        ref.current = editor;
    };
    return (
        <div>
            <div id="editorjs" className="ml-20 mr-10"></div>
        </div>
    );
};

export default Editor;
