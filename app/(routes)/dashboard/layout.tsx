import React from 'react';
import Sidebar from './_components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="grid grid-cols-4">
                <div>
                    <Sidebar />
                </div>
                <div className="grid-cols-3">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
