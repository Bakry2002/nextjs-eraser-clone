'use client';
import React, { useContext, useEffect, useState } from 'react';
import {
    Excalidraw,
    MainMenu,
    WelcomeScreen,
    convertToExcalidrawElements,
} from '@excalidraw/excalidraw';

// import '@excalidraw/excalidraw/index.css';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { SaveTriggerContext } from '@/context/save-trigger-context';
import { toast } from 'sonner';
import { FileProps } from '@/app/(routes)/dashboard/_components/file-list';

const CanvasWrapper = ({ file }: { file: FileProps }) => {
    const router = useRouter();
    const { saveTrigger_ } = useContext(SaveTriggerContext);
    const updateCanvas = useMutation(api.files.updateWhiteboard);
    const [whiteboardData, setWhiteboardData] = useState<any>();

    const [isSrrReady, setSrrReady] = useState(false);

    useEffect(() => {
        setSrrReady(true);
    }, [isSrrReady]);

    useEffect(() => {
        saveTrigger_ && onSaveCanvas();
    }, [saveTrigger_]);

    const onSaveCanvas = () => {
        updateCanvas({
            _id: file._id as any,
            whiteboard: JSON.stringify(whiteboardData),
        }).then((res) => {
            toast.success('Canvas updated!');
            router.refresh();
        });
    };

    if (!isSrrReady) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ height: '100%' }}>
            {isSrrReady && file && (
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
export default CanvasWrapper;
