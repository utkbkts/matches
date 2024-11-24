import { differenceInYears } from "date-fns";

const calculateAge = (dateOfBirth: string): number => {
  return differenceInYears(new Date(), new Date(dateOfBirth));
};

export default calculateAge;

export const getAgeDate = (age: any) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);
  return date.toISOString();
};
