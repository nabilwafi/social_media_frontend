import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='bg-[#01162D]'>
      <div className='min-h-screen mx-auto max-w-screen-xl relative text-white'>
        {children}
      </div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  );
};

export default Template;
