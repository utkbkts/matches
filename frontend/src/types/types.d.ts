import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type SignupType = {
  _id: any;
  name: string;
  password: string;
  email: string;
  picture: {
    url: string;
  };
  status: string;
  country: string;
  city: string;
  gender: string;
  birthday: string;
  currentSubscription?: any;
  myFavorite?: any;
};

export type MembersType = {
  birthday: string;
  city: string;
  country: string;
  createdAt: string;
  currentSubscription: string | null;
  email: string;
  gender: string;
  liked: any[];
  likedCount: number;
  myFavorite: any[];
  name: string;
  picture: {
    public_id: string;
    url: string;
  };
  status: string;
  updatedAt: string;
  _id: string;
};

export type ListType = {
  user: {
    user: {
      birthday: string;
      city: string;
      country: string;
      createdAt: string;
      currentSubscription: string | null;
      email: string;
      gender: string;
      liked: any[];
      likedCount: number;
      myFavorite: any[];
      name: string;
      picture: {
        public_id: string;
        url: string;
      };
      status: string;
      updatedAt: string;
      _id: string;
    };
  };
};
