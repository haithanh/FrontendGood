import {FuseNavigation} from '@fuse/types';
import {ROLE_REPORT_CHART, ROLE_SUPER_ADMIN, ROLE_MANAGE_EVENT, ROLE_REWARDS} from '../fuse-config/global-const';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'home',
                title: 'Dashboard',
                translate: 'NAV.HOME.TITLE',
                type: 'item',
                icon: 'home',
                url: '/',
                role: ''
            }
        ],
        role: ''
    },
    {
        id: 'game',
        title: 'Game',
        translate: 'NAV.GAME.TITLE',
        type: 'group',
        children: [
            {
                id: 'events',
                title: 'Event',
                translate: 'NAV.GAME.EVENTS.TITLE',
                type: 'collapsable',
                icon: 'star_rate',
                role: ROLE_MANAGE_EVENT,
                children: [
                    {
                        id: 'events_lottery',
                        title: 'Lottery',
                        translate: 'NAV.GAME.EVENTS.LOTTERY',
                        type: 'item',
                        url: '/events/lottery',
                        role: ROLE_MANAGE_EVENT
                    }
                ]
            },
            {
                id: 'rewards',
                title: 'Reward',
                translate: 'NAV.GAME.REWARDS.TITLE',
                type: 'collapsable',
                icon: 'card_giftcard',
                role: ROLE_REWARDS,
                children: [
                    {
                        id: 'rewards_logs',
                        title: 'Reward Logs',
                        translate: 'NAV.GAME.REWARDS.LOGS',
                        type: 'item',
                        url: '/rewards/logs',
                        role: ROLE_REWARDS
                    }
                ]
            }
        ],
        role: ''
    }
];
