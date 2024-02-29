import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-900">
            <div className="flex flex-1 items-center justify-center self-center justify-self-center">
                <Image
                    src="/logo-text.svg"
                    alt="logo"
                    width={300}
                    height={300}
                />
            </div>
            <div className="mb-4 ml-4 flex items-center gap-2 self-start justify-self-start">
                <Loader2 className="h-8 w-8 animate-spin" />
                Eraser clone...
            </div>
        </div>
    );
}
