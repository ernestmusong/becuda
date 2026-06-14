import React from 'react';
import Link from 'next/link';

interface Number {
    number: string
}

const CallNow: React.FC<Number> = ({ number } ) => {
  return (
    <>
      <Link className="call-link" href={number}>call</Link>
    </>
  );
}


export default CallNow;