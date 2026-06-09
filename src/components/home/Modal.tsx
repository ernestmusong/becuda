"use client"

import React, { useState } from 'react';
import Link from 'next/link';

function PopupModal() {
  const [show, setShow] = useState(true);
  const handleShow = () => {
    setShow(false);
  };
  return (
    <>
      <div className={`modal fade${show ? ' show d-block' : ' d-none'}`} id="exampleModalCenter" tabIndex={1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ backgroundColor: 'white' }}>
            <div className="modal-header">
              <h5 className="modal-title text-uppercase mx-auto">welcome to becuda!</h5>
              <button type="button" className="close" onClick={() => handleShow()}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body text-bold text-capitalize" style={{ color: '#000000' }}>
              <i>
                <strong>
                  <span>MOTTO:</span>
                  <br />
                  UNITY, SELF-RELIANCE, CULTURE AND DEVELOPMENT
                </strong>
              </i>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" onClick={() => handleShow()}>Close</button> */}
              <Link href="/news"><button className="btn btn-success" onClick={() => handleShow()}>News</button></Link>
              <Link href="/constitution"><button className="btn btn-primary" onClick={() => handleShow()}>Constitution</button></Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default PopupModal;
