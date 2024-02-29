'use client';

import React from 'react';
import Sidebar from './_components/sidebar';
import { FileListContext } from '@/context/file-list-context';
import { ActiveTeamContext } from '@/context/active-team-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [fileList_, setFileList_] = React.useState([]);
    const [activeTeam_, setActiveTeam_] = React.useState(null);

    return (
        <div className="">
            <ActiveTeamContext.Provider value={{ activeTeam_, setActiveTeam_ }}>
                <FileListContext.Provider value={{ setFileList_, fileList_ }}>
                    <div className="grid grid-cols-4">
                        <div className="fixed h-screen w-72">
                            <Sidebar />
                        </div>
                        <div className="col-span-4 ml-72 mr-10 mt-6">
                            {children}
                        </div>
                    </div>
                </FileListContext.Provider>
            </ActiveTeamContext.Provider>
        </div>
    );
};

export default DashboardLayout;
