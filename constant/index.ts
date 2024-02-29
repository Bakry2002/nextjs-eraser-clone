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
        path: '/teams/settings',
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
        path: '/dashboard/getting-started',
        icon: Flag,
        isBeta: false,
    },
    {
        id: 3,
        name: 'Github Sync',
        path: '/teams/settings',
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
