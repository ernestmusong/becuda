"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";
import {
   FaWhatsapp,
   FaFacebookF,
   FaInstagram,
   FaTiktok,
   FaYoutube,
   FaPhone,
   FaEnvelope
 } from 'react-icons/fa';
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
      <div className={styles.upperFooter}>
      {/* Column 1 */}
      <div className={styles.column}>
        <h2 className={styles.logo}>BECUDA</h2>
        <p className={styles.tagline}>
          Befang Cultural and Development Association.
        </p>
      </div>
      {/* Column 2 */}
      <div className={styles.column}>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/news">news</a></li>
          <li><a href="/constitution">constitution</a></li>
        </ul>
      </div>

      {/* Column 4 */}
      <div className={styles.column}>
        <h3>Follow Us</h3>

        <div className={styles.socials}>
          <a href="https://www.facebook.com/profile.php?id=61590591097258&mibextid=ZbWKwL" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.tiktok.com/@befang.becuda?_r=1&_t=ZS-978MG2Vx4oC" aria-label="TikTok">
            <FaTiktok />
          </a>

          <a href="https://www.instagram.com/becudabefang?igsh=ZGUzMzM3NWJiOQ==" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://youtube.com/@befangculturalanddevelopmentas?si=uV_9e3rZOdfY7-6P" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
      {/* Col 4 */}
      <div className={styles.column}>
  <h3>Get in Touch</h3>

  <div className={styles.contactInfo}>
    <div className={styles.contactItem}>
      <FaEnvelope className={styles.contactIcon} />
      <a href="mailto:info@becudaprojects.org ">
         info@becudaprojects.org 
      </a>
    </div>
    <div className={styles.contactItem}>
      <FaEnvelope className={styles.contactIcon} />
      <a href="mailto:becudaprojects@gmail.com ">
         becudaprojects@gmail.com 
      </a>
    </div>

    <div className={styles.contactItem}>
      <FaPhone className={styles.contactIcon} />
      <a href="tel:+237678506966">
        +237 678 506 966
      </a>
    </div>
  </div>
</div>
    </div>
        <div className="d-flex flex-column justify-content-around align-items-center">
          <div className="w-100 d-flex flex-column flex-md-row justify-content-around align-items-center">
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
          </div>
          <div>
            <p className="footer-p text-center text-b text-white" style={{opacity: 0.7}}>Powered By BUCUDA </p>
          </div>
        </div>
      </footer>
      {/* Whatsapp chat */}
      <a href="https://wa.me/237678506966"  className={styles.whatsappbutton}>
        <FaWhatsapp className="chat" style={{ fontSize: '2rem' }} />
        <span>Chat with Us</span>
      </a>
    </>
  );
};
export default Footer;
