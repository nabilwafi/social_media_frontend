'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import axiosInstance from '@/services/axiosInstance';
import * as yup from 'yup';
import CustomInput from '@/components/elements/CustomInput';
import CustomButton from '@/components/elements/CustomButton';
import { User } from '@/interfaces/User.interface';
import Image from 'next/image';
import getUser from '@/actions/user.action';

const profileValidationSchema = yup.object({
  username: yup.string().required(),
  name: yup.string().required(),
  bio: yup.string().required(),
  email: yup.string().required(),
});

const ProfileForm = () => {
  const auth = getUser();
  const [profile, setProfile] =
    useState<Pick<User, 'username' | 'name' | 'bio' | 'email'>>();
  const [newFile, setNewFile] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get('/auth/profile');

        setProfile(res.data.data);
      } catch (error: any) {
        toast.error(error);
      }
    };

    getData();
  });

  return (
    profile && (
      <Formik
        initialValues={{
          username: profile.username,
          name: profile.name,
          bio: profile.bio,
          email: profile.email,
        }}
        validationSchema={profileValidationSchema}
        onSubmit={async (
          values: Pick<User, 'username' | 'name' | 'bio' | 'email'>,
          action,
        ) => {
          try {
            const formData = new FormData();

            for (const [key, value] of Object.entries(values)) {
              formData.append(key, value as string);
            }

            if (newFile) {
              formData.append('photo_profile', newFile);
            }

            await axiosInstance.put('/auth/profile', formData);

            toast.success('Successfully Updated Profile');
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
                  fullWidth
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
                  fullWidth
                  type='text'
                  name='username'
                  label='Username'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </div>

              <div className='mt-5'>
                <CustomInput
                  fullWidth
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
                  fullWidth
                  type='file'
                  name='photo_profile'
                  label='Photo'
                  onChange={(e: any) => {
                    setNewFile(e.target.files?.[0]);
                  }}
                />
              </div>

              <div className='mt-5'>
                <CustomInput
                  fullWidth
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
                <CustomButton type='submit' label='Submit' className='w-full' />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
  );
};

export default ProfileForm;
