import ROUTES from './routes'
import { ISortItem } from '@cookup/types'

export let SIDEBAR_ARRAY = [
  {
    active: false,
    title: 'Perfomance Analytics',
    path: ROUTES.ROOT || ROUTES.ANALYTICS,
    icon: '/assets/icons/statistics.svg',
    activeIcon: '/assets/icons/statistics_active.svg',
  },
  {
    active: false,
    path: ROUTES.ADMINS,
    title: 'Manage Admins',
    icon: '/assets/icons/admin.svg',
    activeIcon: '/assets/icons/customersupport_active.svg',
  },
  {
    active: false,
    path: ROUTES.USERS || ROUTES.SINGLE_USER,
    title: 'Manage Users',
    icon: '/assets/icons/group.svg',
    activeIcon: '/assets/icons/ad_active.svg',
  },
  {
    active: false,
    path: ROUTES.EDIT,
    title: 'Manage Editors',
    icon: '/assets/icons/edit.svg',
    activeIcon: '/assets/icons/ad_active.svg',
  },
  {
    active: false,
    path: ROUTES.BOOKINGS,
    title: 'Manage Books',
    icon: '/assets/icons/book_open.svg',
    activeIcon: '/assets/icons/customersupport_active.svg',
  },
  {
    active: false,
    path: ROUTES.ADS,
    title: 'Manage Ads',
    icon: '/assets/icons/ad.svg',
    activeIcon: '/assets/icons/ad_active.svg',
  },
  {
    active: false,
    title: 'Customer Support',
    path: ROUTES.CUSTOMER_SUPPORT,
    icon: '/assets/icons/customersupport.svg',
    activeIcon: '/assets/icons/customersupport_active.svg',
  },
]

export const DASHBOARD_USERS = [
  {
    counter: 159,
    percentage: +4.5,
    duration: 'last week',
    navigate: ROUTES.USERS,
    title: 'Registered Users',
  },
  {
    counter: 98,
    percentage: -1.8,
    duration: 'last week',
    navigate: ROUTES.USERS,
    title: 'Personal Accounts',
  },
  {
    counter: 159,
    percentage: 4.5,
    duration: 'last week',
    navigate: ROUTES.USERS,
    title: 'Business Accounts',
  },
  {
    counter: 159,
    percentage: 4.5,
    duration: 'last week',
    navigate: ROUTES.USERS,
    title: 'Deactivated Users',
  },
]

export const DASHBOARD_ACTIVITES = [
  {
    counter: 159,
    percentage: +4.5,
    duration: 'last week',
    title: 'Uploaded Videos',
  },
  {
    counter: 98,
    percentage: -1.8,
    duration: 'last week',
    title: 'Uploaded Stories',
  },
  {
    title: 'Ads',
    counter: 159,
    percentage: 4.5,
    navigate: ROUTES.ADS,
    duration: 'last week',
  },
]

export const DASHBOARD_POPULAR_RECIPE = [
  {
    title: 'Lasagna',
    counterWithText: 159,
  },
  {
    title: 'Steak',
    counterWithText: 98,
  },
  {
    title: 'Apple Pie',
    counterWithText: 159,
  },
  {
    title: 'Pancake',
    counterWithText: 159,
  },
]

export const DASHBOARD_POPULAR_RESTAURANTS = [
  {
    counterWithText: 159,
    title: 'Penfolds',
  },
  {
    counterWithText: 98,
    title: 'Marchesi Antinori',
  },
  {
    counterWithText: 159,
    title: 'Louis Roederer',
  },
  {
    counterWithText: 159,
    title: 'Harlan Estate',
  },
]

export const SORT_MODAL_ARRAY: ISortItem[] = [
  {
    title: 'Today',
    value: 'Jul 9',
  },
  {
    title: 'Last Week',
    value: 'June 27 - July 3',
  },
  {
    title: 'Last Month',
    value: 'June 1 - June 30',
  },
]

export const ADMINS_DATA = [
  {
    name: 'Zack Summers',
    email: 'zech@cookup.com',
    role: 'Super Admin',
  },
  {
    name: 'Jef Gellis',
    email: 'jeff.g@cookup.com',
    role: 'Super Admin',
  },
  {
    name: 'Jack Sparrow',
    email: 'jack.s@cookup.com',
    role: 'Admin',
  },
]

export const ADMINS_HEADER = ['NAME', 'EMAIL ADDRESS', 'ROLE']

export const PERSONAL_USERS_DATA = [
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
  {
    name: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
  },
]

export const PERSONAL_USERS_HEADER = [
  'NAME',
  'EMAIL',
  'CITY',
  'STATE, ZIP CODE',
]

export const BUSINESS_USERS_DATA = [
  {
    businessName: 'Shakespeare & Company Cafe',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
  {
    businessName: 'Emma Gosling',
    email: 'sam@sam.com',
    city: 'New York',
    state: 'NY, 123456',
    type: 'admin',
  },
]

export const BUSINESS_USERS_HEADER = [
  'BUSNIESS NAME',
  'EMAIL',
  'TYPE',
  'CITY',
  'STATE, ZIP CODE',
]

export const USER_TAB_OPTIONS = [
  {
    label: 'Account Info',
    value: 'account-info',
  },
  {
    label: 'Profile Info',
    value: 'profile-info',
  },
  {
    label: 'Uploaded Media',
    value: 'uploaded-media',
  },
  {
    label: 'Ads',
    value: 'ads',
  },
]

export const PERSONAL_USER_PROFILE_DATA = [
  {
    key: 'Name',
    value: 'Emma Gosling',
  },
  {
    key: 'Username',
    value: 'tipsyemma',
  },
  {
    key: 'Age Range',
    value: '28-35',
  },
  {
    key: 'Gender',
    value: 'Non-Binary',
  },
  {
    key: 'City',
    value: 'Costa Mesa',
  },
  {
    key: 'State',
    value: 'California',
  },
  {
    key: 'Zip Code',
    value: '92626',
  },
]

export const BUSINESS_USER_PROFILE_DATA = [
  {
    key: 'Name',
    value: 'Emma Gosling',
  },
  {
    key: 'Type',
    value: 'Restaurant',
  },
  {
    key: 'Username',
    value: 'tipsyemma',
  },
  {
    key: 'Age Range',
    value: '28-35',
  },
  {
    key: 'Gender',
    value: 'Non-Binary',
  },
  {
    key: 'City',
    value: 'Costa Mesa',
  },
  {
    key: 'State',
    value: 'California',
  },
  {
    key: 'Zip Code',
    value: '92626',
  },
  {
    key: 'About',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit',
  },
]

export const IMAGES_ARRAY = [
  '/assets/images/food/food-1.svg',
  '/assets/images/food/food-2.svg',
  '/assets/images/food/food-2.svg',
  '/assets/images/food/food-2.svg',
  '/assets/images/food/food-3.svg',
  '/assets/images/food/food-4.png',
  '/assets/images/food/food-5.svg',
  '/assets/images/food/food-5.svg',
  '/assets/images/food/food-4.png',
  '/assets/images/food/food-3.svg',
  '/assets/images/food/food-4.png',
  '/assets/images/food/food-5.svg',
  '/assets/images/food/food-5.svg',
  '/assets/images/food/food-4.png',
  '/assets/images/food/food-3.svg',
]

export const USER_ADS_DATA = [
  {
    key: 'Budget',
    value: '$400.00',
  },
  {
    key: 'Start Date',
    value: 'July 9, 2021',
  },
  {
    key: 'End Date',
    value: 'July 13, 2021',
  },
  {
    key: 'Description',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit.',
  },
  {
    key: 'Website',
    value: 'shakespeareandcompanycafe',
  },
]
