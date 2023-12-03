'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import axiosInstance from '@/services/axiosInstance';
import * as yup from 'yup';
import getUser from '@/actions/user.action';
import { Post } from '@/interfaces/Post.interface';
import CustomInput from '@/components/elements/CustomInput';
import CustomButton from '@/components/elements/CustomButton';
import CardForm from '@/components/layouts/CardForm';

const postValidationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

const PostForm = () => {
  const user = getUser();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      validationSchema={postValidationSchema}
      onSubmit={async (values: Pick<Post, 'title' | 'description'>, action) => {
        try {
          await axiosInstance.post('/v1/posts', {
            ...values,
            userId: user?.id,
          });

          toast.success('Successfully Created Post');
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
          <div className='flex justify-center'>
            <CardForm>
              <div className='mt-5'>
                <CustomInput
                  type='text'
                  name='title'
                  label='Title'
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </div>

              <div className='mt-5'>
                <div className='mt-5'>
                  <CustomInput
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    type='text'
                    name='description'
                    label='Content'
                    multiline
                    rows={5}
                  />
                </div>
              </div>

              <div className='mt-5'>
                <CustomButton type='submit' label='Submit' className='w-full' />
              </div>
            </CardForm>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
