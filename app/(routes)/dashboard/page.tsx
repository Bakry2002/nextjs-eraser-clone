import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import DashboardHeader from './_components/dashboard-header';
import FileList from './_components/file-list';

const page = async () => {
    const { isAuthenticated } = getKindeServerSession();

    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        redirect('/api/auth/login');
    }

    return (
        <div>
            <DashboardHeader />
            <FileList />
        </div>
    );
};

export default page;
