export class Reimbursement {
  type: string;
  amount: number;
  submitted = new Date().toUTCString();
  approved: string;
  approver: string;
}