import { User } from '@/interfaces/User.interface';

const getUser = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')!) as User;
    }

    return null;
  }
};

export default getUser;
