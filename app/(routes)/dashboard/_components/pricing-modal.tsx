import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const PricingModal = () => {
    return (
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle className="">Upgrade Plan</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                        <div className="rounded-2xl border border-blue-500 p-6 shadow-sm ring-1 ring-blue-500 sm:order-last sm:px-8 lg:p-12">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-white">
                                    Pro
                                    <span className="sr-only">Plan</span>
                                </h2>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-white sm:text-4xl">
                                        {' '}
                                        30${' '}
                                    </strong>

                                    <span className="text-sm font-medium text-white/75">
                                        /month
                                    </span>
                                </p>
                            </div>

                            <ul className="mt-6 space-y-2">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        20 users included{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        5GB of storage{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        Email support{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        Help center access{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        Phone support{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        Community access{' '}
                                    </span>
                                </li>
                            </ul>

                            <a
                                href="#"
                                className="mt-8 block rounded-full border border-blue-500 bg-blue-500 px-12 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 hover:ring-1 hover:ring-blue-700 focus:outline-none focus:ring active:text-blue-500"
                            >
                                Get Started
                            </a>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-white">
                                    Starter
                                    <span className="sr-only">Plan</span>
                                </h2>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-white sm:text-4xl">
                                        {' '}
                                        20${' '}
                                    </strong>

                                    <span className="text-sm font-medium text-white/75">
                                        /month
                                    </span>
                                </p>
                            </div>

                            <ul className="mt-6 space-y-2">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        10 users included{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        2GB of storage{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        Email support{' '}
                                    </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-blue-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>

                                    <span className="text-white/75">
                                        {' '}
                                        Help center access{' '}
                                    </span>
                                </li>
                            </ul>

                            <a
                                href="#"
                                className="mt-8 block rounded-full border border-blue-500 bg-white px-12 py-3 text-center text-sm font-medium text-blue-500 hover:ring-1 hover:ring-blue-500 focus:outline-none focus:ring active:text-blue-500"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </DialogDescription>
        </DialogContent>
    );
};

export default PricingModal;
