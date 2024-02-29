'use client';

import React from 'react';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { FileProps } from '@/app/(routes)/dashboard/_components/file-list';

const Canvas = ({ file }: { file: FileProps }) => {
    return (
        <div style={{ height: '100%' }}>
            <Excalidraw
                onChange={(exportedElements, appState, canvas) =>
                    console.log(exportedElements)
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
        </div>
    );
};

export default Canvas;
