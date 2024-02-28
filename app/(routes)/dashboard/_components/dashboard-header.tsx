'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Loader2, Search, Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const DashboardHeader = () => {
    const { user, isLoading } = useKindeBrowserClient();

    return (
        <div className="mb-12 flex w-full items-center justify-end gap-4">
            <div className="flex items-center rounded-md border border-neutral-700 bg-neutral-800 px-2">
                <Search className="h-4 w-4" />
                <Input
                    placeholder="Search"
                    type="text"
                    className="w-40 border-none bg-transparent py-0  placeholder-neutral-100 focus:border-none focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <div>
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Image
                        src={user?.picture || ''}
                        alt="user avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                )}
            </div>
            <div>
                <Button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-500/75">
                    <Send className="h-4 w-4" />
                    Invite
                </Button>
            </div>
        </div>
    );
};

export default DashboardHeader;
