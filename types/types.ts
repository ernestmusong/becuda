import { ObjectId } from 'mongodb';

 export interface TotalObjectProps {
    totalObject:  {
  savings: number,
  loans: number,
  devLevy: number,
  troubleFund: number,
  fines: number,
  reg: number,
  withdrawals: number,
  interestOnLoans: number,
  totalPaidLoans: number
  totalPaidFines: number
    },
 }
 export interface BalanceProps {
    balances:  {
      totalFines: number,
      totalLoans: number,
       netFineBalace: number, 
       netLoansBalance: number,
       finesPaid: number,
       loansPaid: number,
       interestOnLoans: number, 
       debt: number, 
    },
 }

export interface Withdrawal {
  _id: ObjectId | string;
  date: string,
  motive: string,
  amt: string
 }
export interface WithdrawalsProps {
   withdrawals: Withdrawal[],
 }
export interface WithdrawalProps {
   withdrawal: Withdrawal,
  isAdmin: boolean;
  setMessage: Function;
  setDisplay: Function;
  setClassName: Function;
  setLoading: Function;
 }
export interface PaidIn {
  id: string,
  date: string,
  motive: string,
  amt: number
 }
 export interface Fines {
  id: string,
  date: string,
  motive: string,
  amt: number
 }
 
 export interface Transaction {
  id: string;
  date: string, 
  savings: number,
  loans: number,
  devLevy: number,
  troubleFund: number,
  paidIn: PaidIn,
  fines: Fines,
  userId: string,
 }
 
export interface User {
  _id: ObjectId | string;
  firstName: string;
  lastName: string;
  position: string;
  role: string;
  phone: string;
  reg: number;
  registeredOn: string;
  transactions: Transaction[],
  password: string;
  confirmPassword?: string;
}

export interface TableProps {
  users: User[];
}

export interface MemberProps {
  member: User;
  isAdmin: boolean;
  setMessage: Function;
  setDisplay: Function;
  setClassName: Function;
  setLoading: Function;
}
