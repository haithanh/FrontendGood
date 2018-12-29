export class InfomationAdministrator {
  address: string = '';
  birthday: string = '';
  first_name: string = '';
  full_name: string = '';
  gender: boolean = false;
  last_name: string = '';
  phone: string = '';
  social: string = '';
}

export class User {
  id ?: number = -1;
  username?: string = '';
  email?: string = '';
  information: any = {};
  roles: any = {};
  status?: number = 1;
  updated_at?: string = '';
  created_at?: string = '';
  deleted_at?: string = '';

  constructor() {
    this.information = new InfomationAdministrator();
  }
}
