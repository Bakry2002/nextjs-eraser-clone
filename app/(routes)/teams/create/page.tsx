import { cn } from '@/lib/utils';
import { PersonStanding, Users } from 'lucide-react';
import { Fira_Sans_Condensed } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import { CreateTeamForm } from '../../dashboard/_components/create-team-form';
const fira = Fira_Sans_Condensed({
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const page = () => {
    return (
        <div className="fixed left-0 top-0 flex h-full w-full flex-col">
            {/* LOGO */}
            <div className="my-12 ml-14 mr-0 flex w-[135px] flex-row items-center justify-center">
                <Image
                    src="/logo-text.svg"
                    alt="logo"
                    width={135}
                    height={135}
                />
            </div>

            {/* CONTENT */}
            <div className="flex max-h-full w-[790px] max-w-full flex-1 items-stretch justify-center self-center overflow-auto text-center">
                <div className="flex w-full flex-col px-0 pb-3 text-center">
                    <div className="flex max-h-full min-h-0 w-full flex-col items-center ">
                        {/* Banner Badge */}
                        <div className="relative inline-flex cursor-default select-none items-center rounded-lg bg-[#304a36] px-3 py-2 text-sm leading-[100%] text-green-300 drop-shadow-lg">
                            <Users className="mr-2 h-4 w-4" />
                            <span className=" ">Team Name</span>
                        </div>
                        <h1
                            className={cn(
                                'mx-0 mb-8 mt-11 text-5xl font-bold tracking-[0.48px]',
                                fira.className,
                            )}
                        >
                            What should we call your team?
                        </h1>
                        <p className="text-white/75">
                            You can always change this later from settings.
                        </p>

                        <CreateTeamForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
