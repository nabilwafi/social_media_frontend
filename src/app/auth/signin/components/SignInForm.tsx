'use client';

import { Formik, Form } from 'formik';
import CustomButton from '@/components/elements/CustomButton';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import CustomInput from '@/components/elements/CustomInput';
import * as yup from 'yup';
import { User } from '@/interfaces/User.interface';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '@/services/axiosInstance';

const signUpSchema = yup.object({
  email: yup.string().email('field must be email').required(),
  password: yup.string().required(),
});

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values: Pick<User, 'email' | 'password'>, action) => {
        try {
          const res = await axiosInstance.post('/auth/login', values, {
            headers: {
              'Content-Type': 'Application/json',
            },
          });

          localStorage.setItem('user', JSON.stringify(res.data.data.user));
          localStorage.setItem('accessToken', res.data.data.accessToken);

          toast.success('Successfully Login!');
          action.resetForm();
          router.push('/homepage');
        } catch (error: any) {
          console.log(error);
          toast.error('Email or Password Wrong, Please Try Again!');
        }
      }}
    >
      {(formik) => (
        <Form>
          <div className='mt-5'>
            <CustomInput
              type='text'
              name='email'
              label='Email'
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          <div className='mt-5'>
            <CustomInput
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={showPassword ? 'text' : 'password'}
              name='password'
              label='Password'
              onEndClickIcon={() => setShowPassword((prevState) => !prevState)}
              suffixIcon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            />
          </div>

          <div className='mt-5'>
            <CustomButton
              type='submit'
              label='Submit'
              className='w-full'
              isLoading={formik.isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
