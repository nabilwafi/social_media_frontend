import React from 'react';

const TitleComponent = ({ title }: { title: string }) => {
  return <h1 className='font-semibold text-3xl'>{title}</h1>;
};

export default TitleComponent;
