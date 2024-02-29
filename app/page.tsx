import HeroSection from '@/components/sections/hero';
import Header from '@/components/shared/header';
import Loading from './(routes)/workspace/[fileId]/loading';

export default function Home() {
    return (
        <div>
            <Header />
            <HeroSection />
        </div>
    );
}
