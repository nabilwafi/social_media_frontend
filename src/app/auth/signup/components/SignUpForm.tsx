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
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email('field must be email').required(),
  bio: yup.string().required(),
  password: yup.string().required(),
});

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        email: '',
        bio: '',
        password: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (
        values: Pick<User, 'name' | 'username' | 'email' | 'bio' | 'password'>,
        action,
      ) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value as string);
        }

        formData.append('photo_profile', file!);

        try {
          await axiosInstance.post('/auth/register', formData);

          toast.success('Successfully Registered Account');
          action.resetForm();
          router.push('/auth/signin');
        } catch (error) {
          console.log(error);
          toast.error('Failed Registered Account, Please Check and Try Again');
        }
      }}
    >
      {(formik) => (
        <Form>
          <div className='mt-5'>
            <CustomInput
              type='text'
              name='name'
              label='Name'
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>

          <div className='mt-5'>
            <CustomInput
              type='text'
              name='username'
              label='Username'
              onChange={formik.handleChange}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </div>

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
              value={formik.values.bio}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
              type='text'
              name='bio'
              label='Bio'
              multiline
              rows={5}
            />
          </div>

          <div className='mt-5'>
            <CustomInput
              type='file'
              name='photo_profile'
              onChange={(e: any) => {
                setFile(e.target.files?.[0]);
              }}
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

export default SignUpForm;
