import React from 'react';
import CardForm from '../../../components/layouts/CardForm';
import HeaderCardForm from '../components/HeaderCardForm';
import SignInForm from './components/SignInForm';
import FooterForm from '../components/FooterForm';

const Page = () => {
  return (
    <CardForm>
      <HeaderCardForm title='Sign In' />

      <SignInForm />

      <FooterForm
        text='Dont Have Account?'
        linkText='Register'
        hrefLink='/auth/signup'
      />
    </CardForm>
  );
};

export default Page;
