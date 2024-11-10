export type SignupType = {
  name?: string;
  password?: string;
  email?: string;
};

export type MembersType = {
  id: any;
  email: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  name: string;
  created: string;
  lastActive: string;
  description: string;
  city: string;
  country: string;
  image: string;
  isActive?: boolean;
};
