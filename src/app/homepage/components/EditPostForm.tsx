'use client';

import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/elements/CustomButton';
import CustomInput from '@/components/elements/CustomInput';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Post } from '@/interfaces/Post.interface';
import axiosInstance from '@/services/axiosInstance';
import { User } from '@/interfaces/User.interface';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const postValidationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

type EditPostFormProps = {
  postID: string;
  user: User;
  setIsOpenOverlay: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const EditPostForm = (props: EditPostFormProps) => {
  const { postID, user, setIsOpenOverlay } = props;

  const [post, setPost] = useState<Pick<Post, 'title' | 'description'>>({
    title: '',
    description: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/v1/posts/${postID}`);

        setPost(res.data.data);
      } catch (error) {
        toast.error('Error');
      }
    };

    getData();
  }, [postID, post]);

  return post.title ? (
    <Formik
      initialValues={{
        title: post.title,
        description: post.description,
      }}
      validationSchema={postValidationSchema}
      onSubmit={async (values: Pick<Post, 'title' | 'description'>, action) => {
        try {
          await axiosInstance.put(`/v1/posts/${postID}`, {
            ...values,
            userId: user.id,
          });

          setIsOpenOverlay(false);

          toast.success('Successfully Updated Post');
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
          <div className='p-5'>
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
              <CustomButton
                type='submit'
                label='Submit'
                className='w-full bg-blue-500 text-white hover:bg-blue-700'
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <div className='flex justify-center'>
      <CircularProgress />
    </div>
  );
};

export default EditPostForm;
