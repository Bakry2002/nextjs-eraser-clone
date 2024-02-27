import HeroSection from '@/components/sections/hero';
import { api } from '@/convex/_generated/api';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { useMutation } from 'convex/react';
import { redirect } from 'next/navigation';

export default function Home() {
    return (
        <div>
            <HeroSection />
        </div>
    );
}
