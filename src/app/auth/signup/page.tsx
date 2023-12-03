import CardForm from '../../../components/layouts/CardForm';
import FooterForm from '../components/FooterForm';
import HeaderCardForm from '../components/HeaderCardForm';
import SignUpForm from './components/SignUpForm';

const Page = () => {
  return (
    <CardForm>
      <HeaderCardForm title='Sign Up' />

      <SignUpForm />

      <FooterForm
        text='Do You Have Account?'
        hrefLink='/auth/signin'
        linkText='Login'
      />
    </CardForm>
  );
};

export default Page;
