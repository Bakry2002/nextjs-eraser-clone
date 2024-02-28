'use client';
import { Button } from '@/components/ui/button';
import { CTAMenu } from '@/constant';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';

const CTALinks = () => {
    // extract the first item from the array
    const active = CTAMenu[0];
    const [activeLink, setActiveLink] = useState(CTAMenu[0]);
    console.log('Active Link: ', activeLink);
    return (
        <>
            <ul className="flex flex-1 flex-col justify-end gap-2">
                <>
                    <div className="mt-8 flex-1">
                        <li
                            onClick={() => setActiveLink(active)}
                            key={active.id}
                            className={cn(
                                'flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-sm font-bold text-white transition',

                                activeLink === active &&
                                    'border border-neutral-700 bg-neutral-800 hover:text-white',
                            )}
                        >
                            <active.icon className="h-4 w-4" />
                            {active.name}
                        </li>
                    </div>
                    {CTAMenu.filter((cta) => cta.id !== 1).map((cta) => (
                        <li
                            onClick={() => setActiveLink(cta)}
                            key={cta.id}
                            className={cn(
                                'flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-800',
                                activeLink === cta &&
                                    'border border-neutral-700 bg-neutral-800 hover:text-white',
                            )}
                        >
                            <cta.icon className="h-4 w-4" />
                            {cta.name}
                        </li>
                    ))}
                </>
            </ul>

            {/* Add new file button */}
            <Button
                variant="default"
                className="mt-3 flex justify-start bg-blue-500 px-4 hover:bg-blue-500/75"
            >
                New File
            </Button>

            {/* Progress bar => File creation limit */}
            <div className="mt-5 h-4 w-full rounded-full bg-neutral-800">
                {/* TODO: Change the percentage dynamically */}
                <div className="h-4 w-[40%] rounded-full bg-blue-500"></div>
            </div>
            <div className="mb-2">
                <h2 className="mt-4 text-xs">
                    <strong>1</strong> out of <strong>5</strong> files used.
                </h2>
                <p className="text-xs">
                    <span className="underline">Upgrade</span> your plan for
                    unlimited access.
                </p>
            </div>
        </>
    );
};

export default CTALinks;
