import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

interface Number {
    number: string
}

export const WhatsAppNow: React.FC<Number> = ({ number } ) => {
  return (
    <>
       <Link className="whatsapp-link text-success" href={number}>
        <FaWhatsapp style={{ marginLeft: '10px' }} />
        Chat
      </Link>
    </>
  );
}
