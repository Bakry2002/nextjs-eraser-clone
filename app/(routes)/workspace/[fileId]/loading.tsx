import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-black">
            <div className="flex-1">
                <Image
                    src="/logo-text.svg"
                    alt="logo"
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex items-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin" />
                Loading Eraser clone...
            </div>
        </div>
    );
}
