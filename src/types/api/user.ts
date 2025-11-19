export interface User {
  id: number;
  full_name: string;
  city: string;
  county: string;
  bio: string
  photo?: string
}

export interface UpdateUserData {
  full_name?: string;
  city?: string;
  county?: string;
  bio?: string;
  photo?: string; 
}

export interface ChangePasswordData {
  password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

