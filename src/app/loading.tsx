import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <CircularProgress />
    </div>
  );
}
