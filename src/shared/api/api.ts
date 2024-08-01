export type Error = {
  message: string;
  code: number;
  customData: any;
};

export type TRequestStatuses = 'init' | 'pending' | 'fulfilled' | 'rejected';

export interface IResponse<D = any> {
  status: 'success' | 'error';
  data: D;
  errors: Error[];
}

const backend_url = 'http://localhost:3001';

export const API = {
  registerUser: `${backend_url}/register`,
  login: `${backend_url}/login`,
  getArticles: `${backend_url}/articles`,
};
