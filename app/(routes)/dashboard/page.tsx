import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const page = async () => {
    const { isAuthenticated } = getKindeServerSession();

    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        redirect('/api/auth/login');
    }

    return (
        <>
            <div>Dashboard page</div>
        </>
    );
};

export default page;
