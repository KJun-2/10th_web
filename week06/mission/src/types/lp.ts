import { type CursorBasedResponse } from './common';

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  contents: string;
  thumbnail: string;
  publicshed: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpDto = CursorBasedResponse<Lp[]>;
