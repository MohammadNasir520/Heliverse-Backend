export type IUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
  password?: string;
};

export type IUserFilterableOptions = {
  searchTerm?: string | undefined;
  domain?: string;
  available?: string;
};
