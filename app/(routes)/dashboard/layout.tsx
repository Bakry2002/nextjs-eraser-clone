'use client';

import React from 'react';
import Sidebar from './_components/sidebar';
import { FileListContext } from '@/context/file-list-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [fileList_, setFileList_] = React.useState([]);
    return (
        <div className="">
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
        </div>
    );
};

export default DashboardLayout;
