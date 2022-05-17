import { NbMenuItem } from '@nebular/theme';
import { roleMatch } from '../shared/roleMatch.roles';
import { NbMenuItemWithPermissions } from './pagesClass';

export const MENU_ITEMS: NbMenuItemWithPermissions[] = [
 
    {

    
        title:'المستخدمين',
        //icon: 'shopping-cart-outline',
        link:'/pages/availableusers'
       },
      {

    
        title:'إدراج / تعديل إدارة',
        //icon: 'shopping-cart-outline',
        link:'/pages/create-center/add'
       }, 

       {

    
        title:'الماركات',
        //icon: 'shopping-cart-outline',
        link:'/pages/availablemarks'
       },
       {

    
        title:'الأجهزة',
        //icon: 'shopping-cart-outline',
        link:'/pages/devicesmangsform/add'
       },
       {

    
        title:'التقارير',
        children: [
            {
              title: 'تقرير بحالة ونوع الجهاز',
              link:'/pages/reports'

            },
            {
              title: 'تقرير بتاريخ التوريد',
              link:'/pages/reportsdate'

            },
            {
              title: 'تقرير بالإدارات التي لا يوجد بها أجهزة ومعدات',
              link:'/pages/reports2'

            },
            {
              title: 'تقريرالاحتياجات',
              link:'/pages/reportsneeds'

            },
            {
              title: 'تقرير أعداد الأجهزة حسب القطاع',
              link:'/pages/reportssectorscount'

            },
        ]
        //icon: 'shopping-cart-outline',
       }/* ,
       {

    
        title:'tree',
        //icon: 'shopping-cart-outline',
        link:'/pages/test-tree'
       }, */
       
       /* {
        title: 'Reporting',
        icon: 'lock-outline',
        children: [
          {
            title: 'Group Title A',
            icon: 'lock-outline',
            group: true,
          },
          {
            title: 'Menu Item 1',
            link: '/auth/register',
          },
          {
            title: 'Menu Item 2',
            link: '/auth/request-password',
          },
          {
            title: 'Menu Item 3',
            link: '/auth/request-password',
          },
        ],
      }, */
       
       
     
]; 


      

