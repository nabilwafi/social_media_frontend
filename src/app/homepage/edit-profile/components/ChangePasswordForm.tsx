'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import axiosInstance from '@/services/axiosInstance';
import * as yup from 'yup';
import CustomInput from '@/components/elements/CustomInput';
import CustomButton from '@/components/elements/CustomButton';
import { User } from '@/interfaces/User.interface';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const profileValidationSchema = yup.object({
  password: yup.string().required(),
});

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={profileValidationSchema}
      onSubmit={async (values: Pick<User, 'password'>, action) => {
        try {
          await axiosInstance.patch('/auth/change-password', values);

          toast.success('Successfully Change Password');
          action.resetForm();
        } catch (error) {
          console.log(error);
          toast.error('Internal Server Error, please try again');
          action.resetForm();
        }
      }}
    >
      {(formik) => (
        <Form>
          <div className='flex justify-center flex-col gap-5 bg-slate-200 p-8 rounded-lg mt-5'>
            <div className='mt-5'>
              <CustomInput
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type={showPassword ? 'text' : 'password'}
                name='password'
                label='Password'
                onEndClickIcon={() =>
                  setShowPassword((prevState) => !prevState)
                }
                suffixIcon={
                  showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                }
              />
            </div>

            <div className='mt-5'>
              <CustomButton type='submit' label='Submit' className='w-full' />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
