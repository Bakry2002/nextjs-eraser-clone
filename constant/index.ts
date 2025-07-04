import {
    Archive,
    Flag,
    Github,
    LayoutGrid,
    LogOut,
    Settings,
    Users,
} from 'lucide-react';

export const teamMenu = [
    {
        id: 1,
        name: 'Join or Create Team',
        path: '/teams/create',
        icon: Users,
    },
    {
        id: 2,
        name: 'Settings',
        path: '/dashboard',
        icon: Settings,
    },
];

export const CTAMenu = [
    {
        id: 1,
        name: 'All Files',
        path: '/dashboard',
        icon: LayoutGrid,
        isBeta: false,
    },
    {
        id: 2,
        name: 'Getting Started',
        path: '/dashboard',
        icon: Flag,
        isBeta: false,
    },
    {
        id: 3,
        name: 'Github Sync',
        path: '/dashboard',
        icon: Github,
        isBeta: true,
    },
    {
        id: 4,
        name: 'Archive',
        path: '/dashboard/archived',
        icon: Archive,
        isBeta: false,
    },
];

export const MAX_FREE_FILE = 5;
