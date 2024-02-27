import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/header';
import { cn } from '@/lib/utils';
import ConvexClientProvider from './ConvexClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Eraser | Documents & diagrams for engineering teams',
    description:
        'All-in-one markdown editor, collaborative canvas, and diagram-as-code builder',

    icons: ['favicon.ico'],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn('bg-[#0b0b0b]', inter.className)}>
                <ConvexClientProvider>
                    <main>{children}</main>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
