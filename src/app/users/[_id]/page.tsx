 "use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Suspense } from "react";
import toast, { Toaster } from 'react-hot-toast';
import NotFound from '@/components/error-page/Error';
import { MemberProps, User, BalanceProps } from "../../../../types/types";
import { Title3 } from "@/components/common/Headings";
import ModalComponent from '@/components/common/Modal';
import Spinner1 from '@/components/spinners/Spinnee1';
import Loading from '../../../components/common/loading';
import "./user.css";
import Link from "next/link";

export default function  Page({ params }: { params: { _id: string } }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [className, setClassName] = useState('modal fade');
  const [display, setDisplay] = useState('none');
  const [notFound, setNotFound] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      setIsAdmin(true);
    }
  }, [session, status]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      setIsAdmin(true);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${params._id}`);
        if (!response.ok) {
          setNotFound(true);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setNotFound(true);
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [params._id]);
  if (user === null) return <div className="spinner-wrapper text-center vh-100"><Loading /></div>
  
  const getTransaction = () => {
    const transaction = localStorage.getItem('transaction');
    return transaction ? JSON.parse(transaction) : null;
  }

  const closeModal = () => {
    setClassName('modal')
    setDisplay('none');
  };

  const deleteTransaction = async () => {
    setLoading(true);
    try {
      const transaction = await getTransaction();
      const {userId, id} = transaction
      const response = await fetch(`/api/transactions/delete-transaction?userId=${userId}&transactionId=${id}`, {
        method: 'DELETE',
        body:JSON.stringify({
          'userId': userId,
          'id': id
      })
  });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, {
          position: 'top-center',
          duration: 2500
        })
        throw new Error(errorData.message || 'Failed to delete transaction');
      }
      // Handle success
      const result = await response.json();
      toast.success(result.message, {
        position: 'top-center',
        duration: 2500
      })
      location.reload()
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    } finally {
      setLoading(false);
  }
};
  const { firstName, lastName, registeredOn, transactions } = user;
  // Calculate savings
  const savings = transactions?.map((t) => t.savings);
  const totalSavings = savings?.reduce((a, b) => a + b, 0);
  // Calculate loans
  const loanGreaterthanZero = transactions?.find((item) => item.loans > 0 )
  const fineGreaterthanZero = transactions?.find((item) => item?.fines?.amt > 0 )
  const loans = transactions?.map((t) => t.loans);
  const totalLoans = loans?.reduce((a, b) => a + b, 0);
  const interestOnLoans = loans?.map((l) => Math.ceil(((5/100) * l))).reduce((a, b) => a + b, 0);
  const totalLoansPlusInterest = totalLoans + interestOnLoans;
  const paidIn = transactions?.map((t) => t.paidIn);
  const filteredLoansPaid = paidIn?.filter((p) => p?.motive === 'loan');
  const loansPaid = filteredLoansPaid?.map((l) => l.amt).reduce((a, b) => a + b, 0);
  const netLoansBalance = totalLoansPlusInterest - loansPaid;
  // Calculate fines
  const fines = transactions?.map((t) => t.fines);
  const totalFines = fines?.map((f) => f?.amt).reduce((a, b) => a + b, 0);
  const filteredfinesPaid = paidIn?.filter((p) => p?.motive === 'fine');
  const finesPaid = filteredfinesPaid?.map((f) => f.amt).reduce((a, b) => a + b, 0);
  const netFineBalace = totalFines - finesPaid;
  const debt = netFineBalace + netLoansBalance;
  const netBalance = totalSavings - debt;
  const obj: BalanceProps['balances'] = {
    totalFines,
    totalLoans,
     netFineBalace, 
     netLoansBalance,
     finesPaid,
     loansPaid,
     interestOnLoans, 
     debt, 
  }
    if(notFound) return <NotFound text={`User with ID ${params._id} could not be found`}/>
  return (
    <main style={{ width: '100%', padding: 0 }}>
      <h1 className="page-hero-text text-capitalize">{firstName} {lastName}</h1>
      <br />
      <div>
        <center className="detail-page-hero">
          <p className="user-para">Registered: {registeredOn}</p>
          <p className="user-para">Net Balance: {netBalance} cfa</p>
        </center>
        <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ background: '#DCDCDC' }}>
            <tr>
              <th scope="col">Date</th>
          <th scope="col">Trouble. F</th>
          <th scope="col">Dev. Levy</th>
          <th scope="col">Savings</th>
          <th scope="col">Loans + <span className="text-uppercase text-success">int</span></th>
          <th scope="col">Fines</th>
          <th scope="col">Paid in</th>
          <th scope="col">Shares</th>
          {isAdmin && (<th scope="col">actions</th>)}
            </tr>
          </thead>
          <Suspense fallback="Loading...">
          <tbody>
            <Tranzaction 
              member={user}
              isAdmin={isAdmin}
              setClassName={setClassName}
              setDisplay={setDisplay}
              setLoading={setLoading}
              setMessage={setMessage}
              />
          </tbody>
          </Suspense>
        </table>
        </div>
        {(loanGreaterthanZero || fineGreaterthanZero) && (
          <div className="container">
             <Title3 title="balances"/>
             <Suspense fallback="Loading...">
               <Balances balances={obj} />
             </Suspense>
          </div>
        )}
        
        <Link href="/users" style={{ textDecoration: 'underline', color: 'yellow' }}>
          Go Back
        </Link>
      </div>
      <Toaster />
      <ModalComponent
        title='Warning!'
        titleColor='text-danger'
        loading={loading} 
        text1='Deleting...Please wait!'
        text2='Are you sure to delete this transaction ?'
        func={() => deleteTransaction()}
        func2={() => closeModal()}
        className={className}
        display={display}
     />
    </main>
  );
}

const Tranzaction: React.FC<MemberProps> = ({ 
  member,
  isAdmin,
  setClassName,
   setMessage,
   setDisplay
}) => {
  const { transactions } = member;
  const amounts = transactions?.map((t) => t.savings);
  const sumSavings = amounts?.reduce((a, b) => a + b, 0);
  const shares = sumSavings / 50000;
  return (
    <>
      {transactions?.map((t) => {
        const interestOnLoan = Math.ceil(((5/100) * t.loans));
       return(
         <tr className="bg-light" key={t.id}>
          <td className="text-uppercase">{t.date}</td>
          <td className="text-uppercase">{t.troubleFund} cfa</td>
          <td className="text-uppercase">{t.devLevy} cfa</td>
          <td className="text-uppercase">{t.savings} cfa</td>
          <td className="text-uppercase">
            {t.loans}

            {' '}
             cfa
             <br />
             <span className="small-text text-success text-uppercase">{interestOnLoan} cfa</span>
             </td>
          <td className="text-uppercase">{t.fines?.amt} cfa</td>
          <td className="text-uppercase">
            {t.paidIn?.amt}
              
            {' '}
             cfa
             <br />
             <span className="small-text text-danger text-capitalize">{t.paidIn?.motive}</span>
            </td>
          <td>{shares}</td>
          {isAdmin && (
               <td className="text-capitalize d-flex justify-content-center-between align-items-center gap-1">
               <button 
               type="button" 
               className="btn btn-danger btn-sm"
               onClick={() => {
                setClassName('modal fade show');
                setDisplay('block');
                setMessage('Are you sure to delete this transaction?')
                localStorage.setItem('transaction', JSON.stringify({id: t.id, userId: t.userId}));
               }}
               >
                Delete
               </button>
              <Link 
              type="button"
              href={'/transactions/update-transaction'}
              className="btn btn-dark btn-sm"
              onClick={() => {
                localStorage.setItem('transaction', JSON.stringify({
                    id: t.id,
                    userId: t.userId,
                    date: t.date,
                    savings: t.savings,
                    loans: t.loans,
                    devLevy: t.devLevy,
                    troubleFund: t.troubleFund,
                    paidIn: t.paidIn,
                    fines: t.fines,
                }));
              }}
              >
                update
              </Link>
              </td>
               )}
        </tr>
       )
})}
    </>
  );
};
const Balances: React.FC<BalanceProps> = ({ balances }) => {
  const { 
    totalFines,
     totalLoans,
      netFineBalace, 
      netLoansBalance,
      finesPaid,
      loansPaid,
      interestOnLoans, 
      debt, 
    } = balances;
  return (
    <div className="table-responsive">
    <table className="table table-bordered">
          <thead  style={{ background: '#DCDCDC' }}>
            <tr className="text-capitalize">
              <th scope="col">total loans</th>
          <th scope="col">Total interest on loans</th>
          <th scope="col">Total loans paid</th>
          <th scope="col">loans grand total</th>
          <th scope="col">Total fines</th>
          <th scope="col">total fines paid</th>
          <th scope="col">fines grand total</th>
          <th scope="col">Debt</th>
            </tr>
          </thead>
          <tbody>
          <tr className="bg-light">
        <td className="text-uppercase">{totalLoans} cfa</td>
        <td className="text-uppercase">{interestOnLoans} cfa</td>
        <td className="text-uppercase">{loansPaid} cfa</td>
        <td className="text-uppercase">{netLoansBalance} cfa</td>
        <td className="text-uppercase">{totalFines} cfa</td>
        <td className="text-uppercase">{finesPaid} cfa</td>
        <td className="text-uppercase">{netFineBalace} cfa</td>
        <td className="text-uppercase">{debt > 0 ? debt : 0} cfa</td>
        </tr>
          </tbody>
        </table>
    </div>
  );
};