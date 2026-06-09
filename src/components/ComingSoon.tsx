"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { PiKeyReturnFill } from 'react-icons/pi';

const CommingSoon: React.FC = () => {
  const router = useRouter();
  return(
    <div className="container h-100" style={{ height: '100vh' }}>
    <div className="row mx-auto h-100 w-100" style={{ height: '100vh' }}>
      <div className="col-12 d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
        <h1 className="text-align-center text-capitalize text-bold" style={{ color: 'Var(--heroWhite)' }}>coming soon</h1>
        <button
              className="btn btn btn-small mt-2 text-white"
              onClick={() => {
                router.back();
              }}
            >
              <span className="text-capitalize">go back</span>
            </button>
      </div>
    </div>
  </div>
  )
  
};

export default CommingSoon;