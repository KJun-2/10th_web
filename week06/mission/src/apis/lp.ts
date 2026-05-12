import { type PaginationDto } from '../types/common';
import { axiosInstance } from './axios';
import { type ResponseLpDto } from '../types/lp';

export const getLpList = async (paginnationDto: PaginationDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginnationDto,
  });
  return data;
};
