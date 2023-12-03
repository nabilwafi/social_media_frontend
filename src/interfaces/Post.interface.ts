import { Comment } from './Comment.interface';
import { User } from './User.interface';

export interface Post {
  id?: number;
  uuid: string;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User | null;
  comments: Comment[];
}
