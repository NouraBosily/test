import { NbMenuItem } from '@nebular/theme';

export class NbMenuItemWithPermissions extends NbMenuItem {
    permissionRequired?:any[];
    featureFlag?: string
    children?: NbMenuItemWithPermissions[];
  }