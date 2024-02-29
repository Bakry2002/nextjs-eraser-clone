'use client';

import { SaveTriggerContext } from '@/context/save-trigger-context';
import React, { useState } from 'react';

const FileLayout = ({ children }: { children: React.ReactNode }) => {
    const [saveTrigger_, setSaveTrigger_] = useState(false);
    return (
        <SaveTriggerContext.Provider value={{ saveTrigger_, setSaveTrigger_ }}>
            <div>{children}</div>
        </SaveTriggerContext.Provider>
    );
};

export default FileLayout;
