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
import { useContext, useEffect, useState } from 'react';
import CTALinks from './cta-links';
import { FileListContext } from '@/context/file-list-context';
import { ActiveTeamContext } from '@/context/active-team-context';

interface TeamProps {
    name: string;
    createdBy: string;
    _id: string;
}

const Sidebar = () => {
    const convex = useConvex();
    const router = useRouter();
    const { setFileList_ } = useContext(FileListContext);
    const { setActiveTeam_, activeTeam_ } = useContext(ActiveTeamContext);

    const [teamList, setTeamList] = useState<TeamProps[]>();
    const [isTeamLoading, setIsTeamLoading] = useState(false);
    const [activeTeam, setActiveTeam] = useState<TeamProps | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [totalFiles, setTotalFiles] = useState<number>(0);

    const { user, isLoading } = useKindeBrowserClient();

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
    }, [user, teamList]);

    const getTeamList = async () => {
        setIsTeamLoading(true);
        const result = await convex.query(api.teams.getTeam, {
            email: user?.email ?? '',
        });

        setTeamList(result);
        // setActiveTeam(result[0]);
        setActiveTeam_(result[0]);

        // Check if there is an active team stored in local storage
        const storedActiveTeamId = localStorage.getItem('activeTeamId');
        const defaultActiveTeam = result[0];

        if (storedActiveTeamId) {
            // Find the stored active team by id
            const storedActiveTeam = result.find(
                (team) => team._id === storedActiveTeamId,
            );

            // Set the active team to the stored one if found, otherwise use the default
            setActiveTeam_(storedActiveTeam || defaultActiveTeam);
        } else {
            // Set the active team to the default
            setActiveTeam_(defaultActiveTeam);
        }
        setIsTeamLoading(false);
    };

    const setActiveTeamHandler = (team: TeamProps) => {
        // Set the active team in the state
        setActiveTeam_(team);
        // Store the active team id in local storage
        localStorage.setItem('activeTeamId', team._id);
    };

    useEffect(() => {
        (totalFiles || activeTeam_) && getFiles();
    }, [totalFiles, activeTeam_]);

    const getFiles = async () => {
        const result = await convex.query(api.files.getFiles, {
            teamId: activeTeam_?._id ?? '',
            archive: false,
        });
        setFileList_(result);
        setTotalFiles(result?.length);
    };

    return (
        <aside className="fixed flex h-screen w-[275px] flex-col border-r border-neutral-700 p-[22px] drop-shadow">
            {/* Team CTA links => Top section */}
            <div className="flex items-center">
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
                                    activeTeam_?.name || (
                                        <Loader2 className="flex h-7 w-7 animate-spin items-center justify-center text-center" />
                                    )
                                )}

                                <ChevronDown
                                    className={`transition ${isMenuOpen && 'rotate-180'} h-4 w-4 font-bold`}
                                />
                            </h2>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent
                        align="start"
                        className="w-[210px] border border-neutral-700 bg-[#171717] p-2"
                    >
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
                                        onClick={() => {
                                            setActiveTeamHandler(team);
                                        }}
                                        key={team._id}
                                        className={`cursor-pointer rounded-sm  px-2 py-1 text-sm font-medium text-white transition hover:bg-neutral-800 ${activeTeam_?._id === team._id && 'bg-blue-500 hover:bg-blue-500'}`}
                                    >
                                        {team.name}
                                    </li>
                                ))
                            )}
                        </ul>

                        <Separator className="-mx-2 my-2 w-[calc(100%+16px)] bg-neutral-700" />

                        {/* CTA Options */}
                        <ul className="flex flex-col gap-1">
                            {teamMenu.map((item, index) => (
                                <>
                                    <Link
                                        key={index}
                                        href={item.path}
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

            <CTALinks totalFiles={totalFiles} updateTotalFiles={getFiles} />
        </aside>
    );
};

export default Sidebar;
