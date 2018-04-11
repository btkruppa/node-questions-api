import { Reimbursement } from './Reimbursement';

export class ReimbursementDoc {
  username: string;
  month = new Date().getMonth();
  year = new Date().getFullYear();
  reimbursements: Array<Reimbursement> = [];
  additionalItems = 0;
}
