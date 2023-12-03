import React from 'react';

const CardForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='py-10 px-14 border rounded-lg bg-slate-100 text-blue-500 shadow-lg max-w-2xl w-full'>
      {children}
    </div>
  );
};

export default CardForm;
