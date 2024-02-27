'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { ArrowRight, Loader2, Menu } from 'lucide-react';
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
    useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';

const Header = () => {
    const convex = useConvex();

    const createUser = useMutation(api.user.createUser);

    const { user, isLoading, isAuthenticated } = useKindeBrowserClient(); // get current user session

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        if (user) {
            checkUser();
        }
    }, [user]);

    const checkUser = async () => {
        const result = await convex.query(api.user.getUser, {
            email: user?.email ?? '',
        });
        if (!result?.length) {
            createUser({
                name: `${user?.given_name} ${user?.family_name}` ?? '',
                email: user?.email ?? '',
                image: user?.picture ?? '',
            }).then((res) => {
                console.log(res);
            });
        } else {
            console.log('User already exists');
            return;
        }
    };

    return (
        <header className="relative z-10 py-8">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                {/* LOGO */}
                <Link href="/">
                    <Image
                        src="/logo-text.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                </Link>

                {/* Nav */}
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    {/* Links */}
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link
                                    className="text-white transition hover:text-white/75"
                                    href="#"
                                >
                                    {' '}
                                    About{' '}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-white transition hover:text-white/75"
                                    href="#"
                                >
                                    {' '}
                                    Careers{' '}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-white transition hover:text-white/75"
                                    href="#"
                                >
                                    {' '}
                                    History{' '}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-white transition hover:text-white/75"
                                    href="#"
                                >
                                    {' '}
                                    Services{' '}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-white transition hover:text-white/75"
                                    href="#"
                                >
                                    {' '}
                                    Projects{' '}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-white transition hover:text-white/75"
                                    href="#"
                                >
                                    {' '}
                                    Blog{' '}
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        {isLoading && (
                            <Loader2 className="h-8 w-8 animate-spin" />
                        )}

                        {user?.picture && (
                            <Image
                                src={user?.picture}
                                alt="Profile picture"
                                width={50}
                                height={50}
                                className="mx-auto my-2 rounded-full"
                            />
                        )}

                        {user && !user?.picture && (
                            <div className="mx-auto my-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs">
                                {user?.given_name?.[0]}
                            </div>
                        )}

                        {/* {user?.email && (
                            <p className="mb-3 text-center text-xs">
                                Logged in as {user?.email}
                            </p>
                        )} */}

                        {!isLoading && isAuthenticated && (
                            <Button>
                                <LogoutLink>Logout</LogoutLink>
                            </Button>
                        )}

                        {!isLoading && !isAuthenticated && (
                            <div className="hidden sm:flex sm:gap-4">
                                <LoginLink
                                    postLoginRedirectURL="/dashboard"
                                    className={cn(
                                        'flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-white/75',
                                    )}
                                >
                                    Login
                                </LoginLink>

                                <RegisterLink
                                    className={cn(
                                        'hidden items-center justify-center rounded-md px-5 py-2 text-sm font-medium  transition  sm:flex',
                                        buttonVariants({
                                            variant: 'secondary',
                                        }),
                                    )}
                                >
                                    Try Eraser
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </RegisterLink>
                            </div>
                        )}

                        {/* Mobile toggle */}
                        <button className="block rounded p-2.5 text-white transition hover:text-white/75 md:hidden">
                            <span className="sr-only">Toggle menu</span>
                            <Menu className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
