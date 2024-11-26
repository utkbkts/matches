import {
  differenceInDays,
  differenceInYears,
  format,
  parseISO,
} from "date-fns";

const calculateAge = (dateOfBirth: string): number => {
  return differenceInYears(new Date(), new Date(dateOfBirth));
};

export default calculateAge;

export const getAgeDate = (age: any) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);
  return date.toISOString();
};

export const calculateDate = (dateString: any) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return "Invalid date";
  }

  return format(date, "yyyy-MM-dd");
};

export const calculateProgress = (startDate: any, endDate: any) => {
  const now = new Date();

  // Tarihler ISO formatında gelmeli. Bu yüzden parseISO kullanıyoruz
  const parsedStartDate = parseISO(startDate);
  const parsedEndDate = parseISO(endDate);

  const totalDays = differenceInDays(parsedEndDate, parsedStartDate); // Toplam süre
  const elapsedDays = differenceInDays(now, parsedStartDate); // Geçen gün sayısı

  // Eğer abonelik süresi dolmuşsa, ilerleme %100 olur
  if (elapsedDays >= totalDays) return 100;

  // Eğer abonelik henüz başlamamışsa, ilerleme 0 olur
  if (elapsedDays < 0) return 0;

  // Normal ilerleme yüzdesini hesapla
  const progress = (elapsedDays / totalDays) * 100;
  return Math.round(progress); // Yüzdeyi yuvarlayarak döndür
};
