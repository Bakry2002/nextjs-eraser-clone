'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { FileProps } from '@/app/(routes)/dashboard/_components/file-list';
import { SaveTriggerContext } from '@/context/save-trigger-context';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Canvas = ({ file }: { file: FileProps }) => {
    const router = useRouter();
    const { saveTrigger_ } = useContext(SaveTriggerContext);
    const updateCanvas = useMutation(api.files.updateWhiteboard);
    const [whiteboardData, setWhiteboardData] = useState<any>();

    useEffect(() => {
        saveTrigger_ && onSaveCanvas();
    }, [saveTrigger_]);

    const onSaveCanvas = () => {
        updateCanvas({
            _id: file._id as any,
            whiteboard: JSON.stringify(whiteboardData),
        }).then((res) => {
            router.refresh();
        });
    };

    return (
        <div style={{ height: '100%' }}>
            {file && (
                <Excalidraw
                    initialData={{
                        elements:
                            file?.whiteboard && JSON.parse(file?.whiteboard),
                    }}
                    onChange={(excalidrawElements, appState, canvas) =>
                        setWhiteboardData(excalidrawElements)
                    }
                    theme="dark"
                    UIOptions={{
                        canvasActions: {
                            loadScene: false,
                            saveToActiveFile: false,
                            export: false,
                            toggleTheme: true,
                        },
                    }}
                >
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />
                        <MainMenu.DefaultItems.Export />
                        <MainMenu.DefaultItems.ToggleTheme />
                        <MainMenu.DefaultItems.ChangeCanvasBackground />
                    </MainMenu>
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.Heading>
                                <WelcomeScreen.Center.Logo>
                                    <div className="flex items-center justify-center">
                                        <img
                                            src="/logo.png"
                                            alt="logo"
                                            width="100"
                                            height="100"
                                        />
                                    </div>
                                </WelcomeScreen.Center.Logo>
                                Welcome to Eraser. Start draw something
                            </WelcomeScreen.Center.Heading>
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            )}
        </div>
    );
};

export default Canvas;
