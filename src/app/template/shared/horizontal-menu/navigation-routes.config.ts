import { RouteInfo } from "../vertical-menu/vertical-menu.metadata";

export const HROUTES: RouteInfo[] = [
  { path: '/', title: 'Dashboard', icon: 'ft-bar-chart-2', class: 'dropdown nav-item ', isExternalLink: false, submenu: [] },
  
  { path: '/stock', title: 'Stocks', icon: 'ft-box', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
    { path: '/stock/main', title: 'Main stocks', icon: 'ft-arrow-right submenu-icon', role: 'view_main_stock', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    { path: '/stock/sub', title: 'Sub stocks', icon: 'ft-arrow-right submenu-icon', role: 'view_sub_stock', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    { path: '/category', title: 'Categories', icon: 'ft-arrow-right submenu-icon', role: 'view_category', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    { path: '/product', title: 'Products', icon: 'ft-arrow-right submenu-icon', role: 'view_product', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    { path: '/purchase', title: 'Purchases', icon: 'ft-arrow-right submenu-icon', role: 'view_purchase', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  ] }, 

  {
    path: '/shop', title: 'Shop', icon:'ft-archive', class: 'dropdown nav-item has-sub', isExternalLink: false,
    submenu: [
      { path: '/onsales', title: 'OnSales', icon: 'ft-arrow-right submenu-icon', role: 'view_on_sale', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/sales', title: 'Sales', icon: 'ft-arrow-right submenu-icon', role: 'view_sale', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/customers', title: 'Customers', icon: 'ft-arrow-right submenu-icon', role: 'view_customer', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      
    ]
},


{
  path: '/employee', title: 'Employees', icon: 'ft ft-users', class: 'dropdown nav-item has-sub', isExternalLink: false,
  submenu: [
    { path: '/employees', title: 'Employees', icon: 'ft-arrow-right submenu-icon', role: 'view_employee', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    { path: '/expenses', title: 'Expenses', icon: 'ft-arrow-right submenu-icon', role: 'view_expense', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  ]
},
{
  path: '/web', title: 'Website', icon: 'ft ft-users', class: 'dropdown nav-item has-sub', isExternalLink: false,
  submenu: [
    { path: '/homeinfo', title: 'Home-Info', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    { path: '/banner', title: 'Banner', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }, 
    { path: '/webcategory', title: 'Category', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }, 
    { path: '/webproduct', title: 'Product', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    ]
},

// {
//   path: '/products', title: 'products', icon: 'ft ft-users', class: 'dropdown nav-item has-sub', isExternalLink: false,
//   submenu: [
//     { path: '/products', title: 'Products', icon: 'ft-arrow-right submenu-icon', role: 'view_employee', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    
//   ]
// },

  {
      path: '', title: 'Settings', icon: 'ft ft-settings', class: 'dropdown nav-item has-sub', isExternalLink: false,
      submenu: [
        { path: '/admin/users', title: 'Users', icon: 'ft-arrow-right submenu-icon', role: 'view_user', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/roles', title: 'Roles', icon: 'ft-arrow-right submenu-icon', role: 'view_role', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/permissions', title: 'Permissions', icon: 'ft-arrow-right submenu-icon', role: 'view_permission', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      ]
  },
];
