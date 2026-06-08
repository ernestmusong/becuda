"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getGreeting } from '@/app/utils/greetings';
import { formatTime } from '@/app/utils/time';
import Image from 'next/image';
import Link from 'next/link';
import { FaAlignJustify, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const about = [
  { id: 1, path: '/about-befang', text: 'history' },
  { id: 2, path: '/comming-soon', text: 'geography' },
  { id: 3, path: '/comming-soon', text: 'politics' },
];

const Header: React.FC = () => {
  return (
    <>
    <GlobalHeader />
    </>
  )
};

const GlobalHeader: React.FC = () => {
  const pathname = usePathname();
  const [greeting, setGreeting] = useState<string>('');
  const [height, setHeight] = useState<number | string>(0);
  const [overFlow, setOverFlow] = useState<string>('hidden');
  const [currentTime, setCurrentTime] = useState<string>('');
  const router = useRouter();

  const clearHeight = () => {
    if (height !== 0) {
      setHeight(0);
      setOverFlow('hidden');
    }
  };

  const handleClickMenu = () => {
    if (height === 0) {
      setHeight('auto');
      setOverFlow('visible');
    }
  };
  useEffect(() => {
      setGreeting(getGreeting());
      // Update time every second
    const interval = setInterval(() => {
      const now = new Date();
      now.setUTCHours(now.getUTCHours()); // Convert to UTC+1
      setCurrentTime(formatTime(now));
    }, 1000);
     
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <>
      <div className="top-nav">
        {/* Logo */}
        <Link href="/">
          <div style={{ width: '250px' }}>
            <Image
              src="/becuda-logo.PNG"
              alt="logo"
              width={120}
              height={120}
              style={{ maxWidth: '100%' }}
            />
          </div>
        </Link>
        {/* Welcome */}
        <div className="support">
         <p>{greeting} from Befang!</p>
         <p>{currentTime}</p>
        </div>
        {/* Location */}
        <div className="d-flex flex-column">
          <a href="/" style={{ color: 'var(--mainOrange)' }}>
            <FaMapMarkerAlt style={{ marginRight: '1rem' }} />
            <span className="text-capitalize">Cameroon, North West Region, Menchum Valley Sub Division.</span>
          </a>
        </div>
      </div>
      {/* Navigation */}
      <nav id="nav">
        <div className="nav-center">
          <div className="nav-header">
            {/* Mobile logo */}
            <div className="mobile-logo-container">
              <Link href="/" onClick={() => clearHeight()}>
                <div style={{ width: '100px', height: '100%' }} className="logo-div">
                  <Image
                    src="/becuda-logo.PNG"
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </Link>
            </div>
            {/* Mobile Welcome */}
            <div className="moble-support">
             <p className="support">{greeting} from Befang!</p>
              <p className="support">{currentTime}</p>
              </div>
            {/* Mobile menu open and close */}
            {height === 0 ? (
              <button type="button" className="nav-toggle target" onClick={() => handleClickMenu()}>
                <FaAlignJustify className="target" style={{ color: 'var(--mainOrange)' }} />
              </button>
            ) : (
              <button type="button" className="nav-toggle" onClick={() => clearHeight()}>
                <FaTimes style={{ color: 'var(--mainOrange)' }} />
              </button>
            )}
          </div>
          {/* Menu */}
          <div id="links-container" className="links-container target" style={{ height, overflow: overFlow }}>
            <div className="links target">
              <Link href="/users" className={pathname === '/users' ? "active-link clear" : "clear"} onClick={() => clearHeight()}>
                Home
              </Link>
              <Link href="/news" className={pathname === '/news' ? "active-link clear" : "clear"} onClick={() => clearHeight()}>
                news
              </Link>
              <Link href="/constitution" className={pathname === "/constitution" ? "active-link clear" : "clear"} onClick={() => clearHeight()}>
                Constitution
              </Link>
              <div className="dropdown">
                <Link href="#" style={{ zIndex: '-1' }}>about befang</Link>
                <div className="dropdown-content">
                  {about.map((c) => (
                    <Link
                      href={c.path}
                      key={c.id}
                      className="clear dropdown-link"
                      onClick={() => clearHeight()}
                    >
                      {c.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="info-wrapper">
        <p className="info text-uppercase">
          Welcome to Befang Cultural and Development Association...
          <span className="text-uppercase">BECUDA</span>
        </p>
      </div>
    </>
  );
};

export default Header;

