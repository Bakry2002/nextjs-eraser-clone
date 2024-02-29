import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import DashboardHeader from '../_components/dashboard-header';
import ArchiveList from './_components/archive-list';

const page = async () => {
    const { isAuthenticated } = getKindeServerSession();

    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        redirect('/api/auth/login');
    }

    return (
        <div>
            <DashboardHeader />
            <div>
                <h2 className="mb-5 mt-0 px-2 text-2xl font-bold">Archive</h2>
            </div>
            <ArchiveList />
        </div>
    );
};

export default page;
