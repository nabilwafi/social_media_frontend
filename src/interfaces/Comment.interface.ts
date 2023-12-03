import { Post } from './Post.interface';
import { User } from './User.interface';

export interface Comment {
  id?: number;
  uuid: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  userId: number | null;
  postId: number | null;
  user: User | null;
  post: Post | null;
}
