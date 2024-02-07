import React, { useEffect, useState } from 'react';

function ToastUnsucess({ message }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setVisible(false);
        }, 3000); 
    
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div
            id="toast-danger"
            className={`fixed top-10 right-10 w-full max-w-xs p-4 text-black bg-white rounded-lg shadow-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            role="alert"
            style={{ zIndex: 9999 }}
        >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-base font-medium">{message}</div>
        </div>
    );
}

export default ToastUnsucess;
