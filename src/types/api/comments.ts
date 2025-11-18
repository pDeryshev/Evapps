export interface IComments {
  author_name: string,
  comment: string,
  created_at: string
}

export interface ICreateCommentData {
  full_name: string;
  comment: string;
}