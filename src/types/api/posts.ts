import { User } from "./auth"
import type { IComments } from "./comments"

export interface IPosts {
  id: number,
  title: string,
  excerpt: string,
  county: string,
  city: string,
  photo: string
}

export interface IPostDetail extends Omit<IPosts, "excerpt"> {
  description: string,
  comments: IComments[],
  userInfo: User[]
}

export interface ICreatePostData {
  title: string;
  description: string;
  county: string;
  city: string;
  photo?: File | string;
}

export interface IGetPostsParams {
  page?: number;
  limit?: number;
  county?: string;
  city?: string;
}

export interface IApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface IErrorResponse {
  message: string;
  status: number;
}