import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/header';
import { cn } from '@/lib/utils';
import ConvexClientProvider from './ConvexClientProvider';
import { Toaster } from '@/components/ui/sonner';

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
            <body className={cn('bg-[#171717]', inter.className)}>
                <ConvexClientProvider>
                    <main>{children}</main>
                </ConvexClientProvider>
            </body>

            <Toaster />
        </html>
    );
}
