import type { commonRespons } from './common';

export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = commonRespons<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = commonRespons<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

export type ResponseMyInfoDto = commonRespons<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
