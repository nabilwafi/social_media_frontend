import { Post } from './Post.interface';

export interface User {
  id: number;
  uuid: string;
  username: string;
  email: string;
  name: string;
  bio: string;
  photo_profile: string;
  password?: string;
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
  posts: Post[];
}
