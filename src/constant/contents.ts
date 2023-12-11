import ROUTES from './routes'

export let SIDEBAR_ARRAY = [
  {
    active: false,
    title: 'Perfomance Analytics',
    path: ROUTES.ROOT || ROUTES.ANALYTICS,
    icon: 'assets/icons/statistics.svg',
    activeIcon: 'assets/icons/statistics_active.svg',
  },
  {
    active: false,
    path: ROUTES.ADMINS,
    title: 'Manage Admins',
    icon: 'assets/icons/admin.svg',
    activeIcon: 'assets/icons/customersupport_active.svg',
  },
  {
    active: false,
    path: ROUTES.USERS,
    title: 'Manage Users',
    icon: 'assets/icons/group.svg',
    activeIcon: 'assets/icons/ad_active.svg',
  },
  {
    active: false,
    path: ROUTES.EDIT,
    title: 'Manage Editors',
    icon: 'assets/icons/edit.svg',
    activeIcon: 'assets/icons/ad_active.svg',
  },
  {
    active: false,
    path: ROUTES.BOOKINGS,
    title: 'Manage Books',
    icon: 'assets/icons/book_open.svg',
    activeIcon: 'assets/icons/customersupport_active.svg',
  },
  {
    active: false,
    path: ROUTES.ADS,
    title: 'Manage Ads',
    icon: 'assets/icons/ad.svg',
    activeIcon: 'assets/icons/ad_active.svg',
  },
  {
    active: false,
    title: 'Customer Support',
    path: ROUTES.CUSTOMER_SUPPORT,
    icon: 'assets/icons/customersupport.svg',
    activeIcon: 'assets/icons/customersupport_active.svg',
  },
]
