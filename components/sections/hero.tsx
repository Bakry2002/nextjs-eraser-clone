import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Fira_Sans_Condensed } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const fira = Fira_Sans_Condensed({
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const HeroSection = () => {
    return (
        <>
            <section className="relative z-10 pt-8">
                {/* What's new Banner  */}

                <div className="flex items-baseline justify-center py-10">
                    <h2 className="rounded-full border border-white p-2 px-3 text-center text-white">
                        See what's new |{' '}
                        <Link href="/" className="font-medium text-[#95dbff]">
                            AI Diagrams
                        </Link>
                    </h2>
                </div>
                <div className="mx-auto max-w-screen-xl px-4  lg:flex lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1
                            className={cn(
                                'text-5xl font-extrabold  text-[#95dbff] sm:text-6xl md:text-7xl',
                                fira.className,
                            )}
                        >
                            Documents & diagrams
                            <strong className="font-extrabold text-white sm:block">
                                {' '}
                                for engineering teams{' '}
                            </strong>
                        </h1>

                        <p className="mt-4 font-semibold text-white/65 sm:text-2xl/relaxed">
                            All-in-one markdown editor, collaborative canvas,
                            <br />
                            and diagram-as-code builder
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                className="active:bg-white-500 flex w-full items-center justify-center rounded bg-white px-8 py-3.5 text-sm 
                                font-medium text-black shadow hover:bg-white/75 focus:outline-none focus:ring sm:w-auto"
                                href="#"
                            >
                                Try Eraser
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Img-bg */}
            <div className="absolute inset-0">
                <Image
                    aria-hidden="true"
                    src="/hero-bg.png"
                    alt="Hero bg"
                    layout="fill"
                    className="mx-auto h-full w-full"
                    objectPosition="top"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 [background-image:linear-gradient(transparent,#171717_60%)]"></div>
            </div>
        </>
    );
};

export default HeroSection;
