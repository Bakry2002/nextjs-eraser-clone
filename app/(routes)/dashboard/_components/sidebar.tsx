'use client';

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { teamMenu } from '@/constant';
import { api } from '@/convex/_generated/api';

import {
    LogoutLink,
    useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import {
    ChevronDown,
    LayoutGrid,
    Loader2,
    LogInIcon,
    LogOut,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CTALinks from './cta-links';

interface TeamProps {
    name: string;
    createdBy: string;
    _id: string;
}

const Sidebar = () => {
    const [teamList, setTeamList] = useState<TeamProps[]>();
    const [isTeamLoading, setIsTeamLoading] = useState(false);
    const [activeTeam, setActiveTeam] = useState<TeamProps | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, isLoading } = useKindeBrowserClient();
    const convex = useConvex();
    const router = useRouter();

    useEffect(() => {
        user && checkTeams();
    }, [user]);

    const checkTeams = async () => {
        const result = await convex.query(api.teams.getTeam, {
            email: user?.email ?? '',
        });

        if (!result?.length) {
            // navigate to create team page
            router.push('teams/create');
        }
    };

    useEffect(() => {
        user && getTeamList();
    }, [user]);

    const getTeamList = async () => {
        setIsTeamLoading(true);
        const result = await convex.query(api.teams.getTeam, {
            email: user?.email ?? '',
        });

        setTeamList(result);
        setActiveTeam(result[0]);
        setIsTeamLoading(false);
    };

    return (
        <aside className="fixed flex h-screen w-[275px] flex-col border-r border-neutral-700 p-[22px] drop-shadow">
            {/* Team CTA links => Top section */}
            <div className="">
                {/* Team Info & CTA options */}
                <Popover>
                    {/* Active Team */}
                    <PopoverTrigger onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className="flex items-center gap-x-3 rounded-lg px-2 py-3 transition hover:bg-neutral-800">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={35}
                                height={35}
                            />
                            <h2 className="flex flex-1 items-center justify-between gap-1 font-bold">
                                {isTeamLoading ? (
                                    <Loader2 className="flex h-7 w-7 animate-spin items-center justify-center text-center" />
                                ) : (
                                    activeTeam?.name || (
                                        <Loader2 className="flex h-7 w-7 animate-spin items-center justify-center text-center" />
                                    )
                                )}

                                <ChevronDown
                                    className={`transition ${isMenuOpen && 'rotate-180'} h-4 w-4 font-bold`}
                                />
                            </h2>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[210px] border border-neutral-700 bg-[#171717] p-2">
                        {/* Teams options */}
                        <ul className="flex flex-col gap-2">
                            {/* TODO: Get teams from DB */}
                            {isTeamLoading ? (
                                <li className="flex cursor-pointer items-center justify-center rounded-sm px-2 py-1  text-sm font-medium text-white hover:bg-neutral-800">
                                    <Loader2 className="h-7 w-7 animate-spin " />
                                </li>
                            ) : (
                                teamList?.map((team) => (
                                    <li
                                        onClick={() => setActiveTeam(team)}
                                        key={team._id}
                                        className={`cursor-pointer rounded-sm  px-2 py-1 text-sm font-medium text-white transition hover:bg-neutral-800 ${activeTeam?._id === team._id && 'bg-blue-500 hover:bg-blue-500'}`}
                                    >
                                        {team.name}
                                    </li>
                                ))
                            )}
                        </ul>

                        <Separator className="-mx-2 my-2 w-[calc(100%+16px)] bg-neutral-700" />

                        {/* CTA Options */}
                        <ul className="flex flex-col gap-1">
                            {teamMenu.map((item) => (
                                <>
                                    <Link
                                        href={item.path}
                                        key={item.id}
                                        className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-sm font-medium text-white hover:bg-neutral-800"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                </>
                            ))}
                            <LogoutLink className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-sm font-medium text-white hover:bg-neutral-800">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </LogoutLink>
                        </ul>

                        <Separator className="-mx-2 my-2 w-[calc(100%+16px)] bg-neutral-700" />

                        {/* Profile */}
                        {user && (
                            <div className="mt-3 flex justify-start gap-2 px-2">
                                {isLoading && (
                                    <Loader2 className="h-7 w-7 animate-spin " />
                                )}
                                <Image
                                    src={user?.picture || ''}
                                    alt="Profile picture"
                                    width={30}
                                    height={30}
                                    className="my-2 rounded-full bg-green-600"
                                />

                                <div className="flex flex-col justify-center">
                                    <h3 className="text-sm font-bold text-white">
                                        {user?.given_name} {user?.family_name}
                                    </h3>
                                    <h4 className="text-xs text-white/75">
                                        {user?.email}
                                    </h4>
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>

            {/* Other CTA links => Bottom section */}

            <CTALinks />
        </aside>
    );
};

export default Sidebar;
