import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type SignupType = {
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
};
