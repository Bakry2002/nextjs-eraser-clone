'use client';

import { SaveTriggerContext } from '@/context/save-trigger-context';
import { ViewTypeContext } from '@/context/view-type-context';
import React, { useState } from 'react';

import FilePage from './page';

const FileLayout = ({ children }: { children: React.ReactNode }) => {
    const [saveTrigger_, setSaveTrigger_] = useState(false);
    const [viewType_, setViewType_] = useState<string>('both');
    console.log('View type: ', viewType_);
    return (
        <ViewTypeContext.Provider value={{ viewType_, setViewType_ }}>
            <SaveTriggerContext.Provider
                value={{ saveTrigger_, setSaveTrigger_ }}
            >
                <div>{children}</div>
            </SaveTriggerContext.Provider>
        </ViewTypeContext.Provider>
    );
};

export default FileLayout;
