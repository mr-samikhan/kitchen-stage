import { generateWeekGap, getLastMonthDateRange } from '@cookup/helpers'
import ROUTES from './routes'
import { ISortItem } from '@cookup/types'

export let SIDEBAR_ARRAY = [
  {
    active: false,
    title: 'Perfomance Analytics',
    label: 'Performance Analytics',
    path: ROUTES.ROOT || ROUTES.ANALYTICS,
    icon: '/assets/icons/statistics.svg',
    activeIcon: '/assets/icons/selected-analytics.svg',
  },
  {
    active: false,
    path: ROUTES.ADMINS,
    label: 'Manage Admins',
    title: 'Manage Admins',
    icon: '/assets/icons/admin.svg',
    activeIcon: '/assets/icons/selected-admin.svg',
  },
  {
    active: false,
    title: 'Manage Users',
    label: 'Manage Users',
    icon: '/assets/icons/group.svg',
    path: ROUTES.USERS || ROUTES.SINGLE_USER,
    activeIcon: '/assets/icons/selected-user.svg',
  },
  // {
  //   active: false,
  //   path: ROUTES.EDIT,
  //   title: 'Manage Editors',
  //   icon: '/assets/icons/edit.svg',
  //   activeIcon: '/assets/icons/ad_active.svg',
  // },
  // {
  //   active: false,
  //   path: ROUTES.BOOKINGS,
  //   title: 'Manage Books',
  //   icon: '/assets/icons/book_open.svg',
  //   activeIcon: '/assets/icons/customersupport_active.svg',
  // },
  {
    active: false,
    path: ROUTES.POSTS,
    title: 'Manage Posts',
    label: 'Manage Posts',
    icon: '/assets/icons/post.svg',
    activeIcon: '/assets/icons/selected-post.svg',
  },
  {
    active: false,
    title: 'Customer Support',
    label: 'Customer Support',
    path: ROUTES.CUSTOMER_SUPPORT,
    icon: '/assets/icons/customersupport.svg',
    activeIcon: '/assets/icons/selected-support.svg',
  },
]

export const DASHBOARD_USERS = [
  {
    counter: 159,
    percentage: +4.5,
    type: 'registered',
    duration: 'last week',
    navigate: ROUTES.USERS,
    title: 'Registered Users',
  },
  // {
  //   counter: 98,
  //   type: 'personal',
  //   percentage: -1.8,
  //   duration: 'last week',
  //   navigate: ROUTES.USERS,
  //   title: 'Personal Accounts',
  // },
  // {
  //   counter: 159,
  //   type: 'business',
  //   percentage: 4.5,
  //   duration: 'last week',
  //   navigate: ROUTES.USERS,
  //   title: 'Business Accounts',
  // },
  {
    counter: 159,
    type: 'deactivated',
    percentage: 4.5,
    duration: 'last week',
    navigate: ROUTES.USERS,
    title: 'Deactivated Users',
  },
]

export const DASHBOARD_ACTIVITES = [
  {
    id: 1,
    counter: 159,
    percentage: +4.5,
    duration: 'last week',
    title: 'Posts Submitted',
    navigate: ROUTES.POSTS,
  },
  {
    id: 2,
    counter: 98,
    percentage: -1.8,
    duration: 'last week',
    title: 'Comments Submitted',
    navigate: ROUTES.POSTS,
  },
  {
    id: 3,
    counter: 159,
    percentage: 4.5,
    duration: 'last week',
    title: 'Likes Submitted',
    navigate: ROUTES.POSTS,
  },
  {
    id: 4,
    counter: 159,
    percentage: 4.5,
    duration: 'last week',
    navigate: ROUTES.POSTS,
    title: 'User Accounts Followed',
  },
]

export const DASHBOARD_BUSINESS_ACTIVITES = [
  {
    counter: 159,
    percentage: +4.5,
    duration: 'last week',
    title: 'Partners Submitted',
    navigate: ROUTES.POSTS,
  },
  {
    counter: 98,
    percentage: -1.8,
    duration: 'last week',
    title: 'Partners Clicked',
    navigate: ROUTES.POSTS,
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
    type: 'today',
    value: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    }),
  },
  {
    type: 'lastWeek',
    title: 'Last Week',
    value: generateWeekGap(),
  },
  {
    type: 'lastMonth',
    title: 'Last Month',
    value: getLastMonthDateRange(),
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

export const ADMINS_HEADER = [
  'NAME',
  'EMAIL ADDRESS',
  'ROLE',
  'STATUS',
  'LAST LOGIN',
]

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

export const PERSONAL_USERS_HEADER = ['NAME', 'EMAIL', 'PHONE NUMBER', 'STATUS']

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
  // {
  //   label: 'Ads',
  //   value: 'ads',
  // },
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
  // {
  //   key: 'Budget',
  //   value: '$400.00',
  // },
  // {
  //   key: 'Start Date',
  //   value: 'July 9, 2021',
  // },
  // {
  //   key: 'End Date',
  //   value: 'July 13, 2021',
  // },
  {
    key: 'Post Date',
    value: 'July 9, 2021, 10:30 AM',
  },
  {
    key: 'Description',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit.',
  },
  // {
  //   key: 'Website',
  //   value: 'shakespeareandcompanycafe',
  // },
  {
    key: 'Likes',
    value: '328',
  },
  {
    key: 'Comments',
    value: '54',
  },
]

export const EXPERIENCED_ARRAY = [
  'Easy',
  'Moderate',
  'Hard',
  'Chef',
  'Professional',
]

export const AGE_RANGE_ARRAY = [
  '21-27yrs',
  '28-35yrs',
  '36-43yrs',
  '44-51yrs',
  '52 and over',
  'All',
]

export const GENDER_ARRAY = ['male', 'female', 'Non-Binary', 'All']

export const BUSINESS_TYPES_ARRAY = [
  'Winery/Vineyard',
  'Restuarant',
  'Bar',
  'Cafe',
  'All',
]

export const SETTINGS_TAB_ARRAY = [
  { label: 'Email', value: 'email' },
  {
    label: 'Password',
    value: 'password',
  },
]

export const SUPPORT_REPORT_HEADER = [
  'REQUESTER',
  'SUPPORT REASON',
  'REQUESTED DATE',
  'REPORTED USERNAME',
]

export const SUPPORT_REPORT_DATA = [
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
  {
    requester: 'Requester',
    supportReason: 'Support Reason',
    requestedDate: 'Request Date',
    reportedUserName: 'tipsydude(1)',
    // viewMessage: 'View Message',
  },
]

export const SUPPORT_SUSPENDED_HEADER = [
  'NAME',
  'EMAIL',
  'EXPERIENCE',
  'CITY',
  'STATE, ZIPCODE',
]

export const SUPPORT_SUSPENDED_DATA = [
  {
    name: 'Lance Stroll',
    email: 'lance.s@gmail.com',
    experience: 'Novice',
    city: 'Newport',
    state: 'California,92627',
  },
  {
    name: 'Lewis Hamilton',
    email: 'lewis.h@gmail.com',
    experience: 'Intermediate',
    city: 'Costa Mesa',
    state: 'California,92627',
  },
  {
    name: 'Lance Stroll',
    email: 'lance.s@gmail.com',
    experience: 'Novice',
    city: 'Newport',
    state: 'California,92627',
  },
  {
    name: 'Lewis Hamilton',
    email: 'lewis.h@gmail.com',
    experience: 'Intermediate',
    city: 'Costa Mesa',
    state: 'California,92627',
  },
]

export const SUPPORT_TABS = [
  { label: 'Reports', value: 'reports' },
  { label: 'Suspended Users', value: 'suspended-users' },
  { label: 'Resolved', value: 'resolved' },
]

export const EXPORT_CSV_DATA = [
  { label: 'First Name', value: 'firstName', isChecked: false },
  { label: 'Last Name', value: 'lastName', isChecked: false },
  { label: 'Email Address', value: 'email', isChecked: false },
  { label: 'Joined Date', value: 'joinedDate', isChecked: false },
  { label: 'State', value: 'state', isChecked: false },
  { label: 'City', value: 'city', isChecked: false },
  { label: 'Gender', value: 'gender', isChecked: false },
  { label: 'Age', value: 'age', isChecked: false },
  { label: 'Experience', value: 'experience', isChecked: false },
]

export const ADS_TABS = [
  { label: 'Current Ads', value: 'current' },
  { label: 'Expired Ads', value: 'expired' },
  { label: 'Drafts', value: 'drafts' },
]

export const ADS_CARD_DATA = [
  { img: '/assets/images/ad_card1.svg', title: 'Ad Name', clickRate: '2.8' },
  { img: '/assets/images/ad_card2.svg', title: 'Ad Name', clickRate: '1.9' },
  { img: '/assets/images/ad_card3.svg', title: 'Ad Name', clickRate: '-3.5' },
  { img: '/assets/images/ad_card4.svg', title: 'Ad Name', clickRate: '1.9' },
  { img: '/assets/images/ad_card5.svg', title: 'Ad Name', clickRate: '-3.5' },
]

export const ADS_ARRAY = [
  { img: '/assets/images/media_card1.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card2.svg', user: '/assets/icons/user2.svg' },
  { img: '/assets/images/media_card3.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card4.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card5.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card2.svg', user: '/assets/icons/user2.svg' },
  { img: '/assets/images/media_card1.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card3.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card4.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card1.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card5.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card2.svg', user: '/assets/icons/user2.svg' },
  { img: '/assets/images/media_card3.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card4.svg', user: '/assets/icons/user1.svg' },
  { img: '/assets/images/media_card5.svg', user: '/assets/icons/user1.svg' },
]

export const SUPPORT_HIDDEN_KEYS = [
  'id',
  'uid',
  'gender',
  'dateOfBirth',
  'experience',
  'createdAt',
]

export const LIKES_DATA = [
  {
    id: 1,
    userName: 'Lance Stroll',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 2,
    userName: 'Lewis Hamilton',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 2,
    userName: 'Lewis Hamilton',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 3,
    userName: 'Valtteri Bottas',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 4,
    userName: 'Sergio Perez',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 5,
    userName: 'Pierre Gasly',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 6,
    userName: 'Max Verstappen',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
  {
    id: 7,
    userName: 'Lewis Hamilton',
    comment: 'Hello',
    time: '2m ago',
    totalLikes: '33 Likes',
  },
]

export const ADMIN_OPTIONS = [{ label: 'Admin', value: 'Admin' }]

export const SUPER_ADMIN_OPTIONS = [
  { label: 'Super Admin', value: 'Super Admin' },
  { label: 'Admin', value: 'Admin' },
]
