import React from 'react';

interface ModalProps {
  titleColor: string,
  title: string,
  text1: string;
  text2: string;
  text3?:string,
  func: () => void;
  func2: () => void;
  loading: boolean;
  display: string;
  className: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  titleColor,
  title,
  text1,
  text2,
  text3,
  func,
  func2,
  loading,
  display,
  className,
}) => {
  return (
    <>
      <div
        className={className}
        id="exampleModalCenter"
        tabIndex={-1}
        aria-labelledby="exampleModalLiveLabel"
        role="dialog"
        aria-modal="true"
        style={{ display: display }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
          <div className="modal-header">
        <h5 className={`modal-title ${titleColor}`} id="exampleModalLabel">{title}</h5>
        <button 
        type="button" 
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          localStorage.removeItem('userID');
          func2();
        }}
        disabled={loading}
         ></button>
      </div>
            <div className="modal-body">
              {loading ? <p className="text-capitalize">{text1}</p> : <p className="text-capitalize">{text2} {text3 ? <span style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{text3}</span> : ''}</p>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  localStorage.removeItem('userID');
                  func2();
                }}
                disabled={loading}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
                onClick={() => {
                  func();
                  localStorage.removeItem('userID');
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
