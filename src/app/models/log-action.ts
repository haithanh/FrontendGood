export class LogAction {
  id ?: number = -1;
  admin_id: number = -1;
  item_id: number = -1;
  type: string = '';
  old_data: any ;
  new_data: any ;
  updated_at?: string = '';
  created_at?: string = '';
  deleted_at?: string = '';

  constructor() {
  }
}
