export const CHECK_EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

// Status user

export const USER_STATUS_UNACTIVE = 0;
export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_BAN = 2;
export const USER_TEST = 1;
export const USER_IS_AGENCY = 1;
export const USER_CANT_CHANGE_GOLD = 1;

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
export const ROLE_MANAGE_USER = 'ROLE_MANAGE_USER';
export const ROLE_MANAGE_SERVER = 'ROLE_MANAGE_SERVER';
export const ROLE_MANAGE_GAME = 'ROLE_MANAGE_GAME';
export const ROLE_MANAGE_SUB_GAME = 'ROLE_MANAGE_SUB_GAME';
export const ROLE_MANAGE_PAYMENT = 'ROLE_MANAGE_PAYMENT';
export const ROLE_REPORT_CHART = 'ROLE_REPORT_CHART';
export const ROLE_REWARDS = 'ROLE_REWARDS';
export const ROLE_GMTOOL = 'ROLE_GMTOOL';
export const ROLE_TOOL = 'ROLE_TOOL';
export const ROLE_MANAGE_EVENT = 'ROLE_MANAGE_EVENT';
export const ROLES = [
    {
        role: ROLE_MANAGE_USER,
        url: '/customers'
    },
    {
        role: ROLE_MANAGE_SERVER,
        url: '/servers'
    },
    {
        role: ROLE_MANAGE_GAME,
        url: '/games'
    },
    {
        role: ROLE_MANAGE_SUB_GAME,
        url: '/sub-games'
    },
    {
        role: ROLE_MANAGE_PAYMENT,
        url: '/payment-gateways'
    },
    {
        role: ROLE_REPORT_CHART,
        url: '/report/chart'
    },
    {
        role: ROLE_REWARDS,
        url: '/rewards'
    },
    {
        role: ROLE_TOOL,
        url: '/gmtools'
    },
    {
        role: ROLE_GMTOOL,
        url: '/tools'
    },
    {
        role: ROLE_MANAGE_EVENT,
        url: '/events'
    }
];

export const LIMIT_PAGINATION = 30;
export const REWARDS_TYPE = [
    'Card', 'Gold', 'Item'
];

export const GAME_CAVANGTYPHU = 2;
export const GAME_SUNDAYCLUB = 15;
export const GAME_IFISH = 18;
export const GAME_123SANCA = 16;
export const GAME_TRUMSANCA = 20;

export const CODE_TYPE_TRANSLATE = {
    'type_1': 'EVENTS.LOTTERY.TITLE'
};
