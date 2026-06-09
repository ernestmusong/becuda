"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const Footer: React.FC = () => {
  const pathname = usePathname();
  return (
    <>
      <GlobalFooter />
    </>
  );
};

const GlobalFooter: React.FC = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <footer className="container-fluid footer-bg py-4">
        <div className="row d-flex flex-column justify-content-around align-items-center">
          <div>
            <p className="text-white footer-p">
              Copyright &copy;
              {' '}
              <span id="date">{date}</span>
              {' '}
              <span className=" ml-2 mr-2" style={{ color: 'Var(--mainOrange)' }}>BECUDA</span>
              {' '}
              All rights reserved.

            </p>
          </div>
          <div>
            <p className="footer-p text-center text-capitalize text-white">
              Created by
              {' '}
              <span className=" text-uppercase"><a href="https://engineeringec.com/" className=" text-uppercase" style={{ color: 'Var(--mainOrange)' }} target="_blank" rel="noreferrer">green engineering and consultancy ltd</a></span>
            </p>
          </div>
          <div>
            <p className="footer-p text-center text-b text-white" style={{opacity: 0.7}}>Powered By BUCUDA </p>
          </div>
        </div>
      </footer>
      {/* Whatsapp chat */}
      <Link href="https://wa.me/237678506966"  className="whatsappbutton">
        <FaWhatsapp className="chat" style={{ fontSize: '2rem' }} />
        <span>Chat with Us</span>
      </Link>
    </>
  );
};
export default Footer;
