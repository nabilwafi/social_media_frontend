'use client';

import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/elements/CustomButton';
import CustomInput from '@/components/elements/CustomInput';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axiosInstance from '@/services/axiosInstance';
import { User } from '@/interfaces/User.interface';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Comment } from '@/interfaces/Comment.interface';

const commentValidationSchema = yup.object({
  description: yup.string().required(),
});

type EditCommentFormProps = {
  comment: Pick<Comment, 'id' | 'uuid'>;
  postId: number;
  user: User;
  setIsOpenOverlay: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const EditCommentForm = (props: EditCommentFormProps) => {
  const { comment, postId, user, setIsOpenOverlay } = props;

  const [commentVal, setCommentVal] = useState<Pick<Comment, 'description'>>({
    description: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(
          `/v1/posts/${postId}/comments/${comment.uuid}`,
        );

        setCommentVal(res.data.data);
      } catch (error) {
        toast.error('Error');
      }
    };

    getData();
  }, [comment.uuid, postId, commentVal]);

  return commentVal.description ? (
    <Formik
      initialValues={{
        description: commentVal.description,
      }}
      validationSchema={commentValidationSchema}
      onSubmit={async (values: Pick<Comment, 'description'>, action) => {
        try {
          await axiosInstance.put(
            `/v1/posts/${postId}/comments/${comment.uuid}`,
            {
              ...values,
              userId: user.id,
            },
          );

          setIsOpenOverlay(false);

          toast.success('Successfully Updated Comment');
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

export default EditCommentForm;
