import { differenceInYears } from "date-fns";

const calculateAge = (dateOfBirth: string): number => {
  return differenceInYears(new Date(), new Date(dateOfBirth));
};

export default calculateAge;
