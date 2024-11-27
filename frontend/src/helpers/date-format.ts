import {
  differenceInDays,
  differenceInYears,
  format,
  formatDistanceToNow,
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

export const dateHandler = (date: any) => {
  // Şu anki zamanı al
  const now = new Date();

  // Verilen tarihi parse et
  const parsedDate = parseISO(date);

  // Verilen tarihin şu ana göre ne kadar önce olduğunu hesapla (örneğin, "3 days", "2 hours")
  const time = formatDistanceToNow(parsedDate, { addSuffix: true });

  // Verilen tarihi saat ve dakika formatında al ("HH:mm")
  const dateByHourAndMin = format(parsedDate, "HH:mm");

  // Günü belirleyen yardımcı fonksiyon
  const getDay = () => {
    const days = parseInt(time.split(" ")[0]);

    // Eğer gün sayısı 8'den küçükse, haftanın gününü döndür
    if (days < 8) {
      return format(now.setDate(now.getDate() - days), "EEEE");
    } else {
      // 8 gün veya daha fazlaysa, tarihi "GG/AA/YYYY" formatında döndür
      return format(parsedDate, "dd/MM/yyyy");
    }
  };

  // Eğer tarih "birkaç saniye" öncesiyse "Şimdi" olarak döndür
  if (time === "less than a minute ago") {
    return "Now";
  }

  // Eğer tarih dakika içeriyorsa, uygun formatta döndür
  if (time.includes("minute")) {
    const mins = time.split(" ")[0];
    if (mins === "1") {
      return "1 min";
    } else {
      return `${mins} min`;
    }
  }

  // Eğer tarih saat içeriyorsa, saati ve dakikayı döndür
  if (time.includes("hour")) {
    return dateByHourAndMin;
  }

  // Eğer tarih "bir gün" öncesiyse, "Dün" olarak döndür
  if (time === "about 1 day ago") {
    return "Yesterday";
  }

  // Eğer tarih gün içeriyorsa, getDay fonksiyonunu çağır ve sonucu döndür
  if (time.includes("days")) {
    return getDay();
  }

  // Varsayılan olarak, time değişkenini döndür
  return time;
};
