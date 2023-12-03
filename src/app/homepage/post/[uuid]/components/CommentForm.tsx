import React from 'react';
import { Formik, Form } from 'formik';
import axiosInstance from '@/services/axiosInstance';
import * as yup from 'yup';
import CustomInput from '@/components/elements/CustomInput';
import CustomButton from '@/components/elements/CustomButton';
import { toast } from 'react-toastify';
import { Comment } from '@/interfaces/Comment.interface';
import CardForm from '@/components/layouts/CardForm';

const commentValidationSchema = yup.object({
  description: yup.string().required(),
});

const CommentForm = ({
  postId,
  userId,
}: {
  postId: number;
  userId: number;
}) => {
  return (
    <Formik
      initialValues={{
        description: '',
      }}
      validationSchema={commentValidationSchema}
      onSubmit={async (values: Pick<Comment, 'description'>, action) => {
        try {
          await axiosInstance.post(`/v1/posts/${postId}/comments`, {
            ...values,
            userId,
          });

          toast.success('Successfully Created Comment');
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

export default CommentForm;
