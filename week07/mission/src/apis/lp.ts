import { type PaginationDto } from '../types/common';
import { axiosInstance } from './axios';
import type{ RequestLpDto, ResponseLpDto,ResponseLikeLpDto } from '../types/lp';

export const getLpList = async (paginnationDto: PaginationDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginnationDto,
  });
  return data;
};

export const getLpDetail = async ({ lpId }: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};
export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};