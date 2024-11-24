import CardPackage from "@/components/cardPackage/CardPackage";
import CircularProgressBar from "@/components/circleBar/CircleProgress";
import { Check } from "lucide-react";
import { useState } from "react";

export const cardPackageData = [
  {
    id: 1,
    title: "Silver",
    price: 40,
    duration: 30,
    description: "Silver package",
    features: [
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Sınırsız Mesajlaşma",
      },
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Gelişmiş Destek",
      },
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Özel Profil Özellikleri",
      },
    ],
  },
  {
    id: 2,
    title: "Platinum",
    price: 70,
    duration: 60,
    description: "Platinum package",
    features: [
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Sınırsız Mesajlaşma",
      },
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "VIP Destek",
      },
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Yüksek Kalitede Eşleşmeler",
      },
    ],
  },
  {
    id: 3,
    title: "Gold",
    price: 99,
    duration: 90,
    description: "Gold package",
    features: [
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Sınırsız Mesajlaşma",
      },
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Özel Danışmanlık",
      },
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Gelişmiş Arama Filtreleri",
      },
    ],
  },
];

const UpdatePackage = () => {
  const [progress, setProgress] = useState(80);

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <CircularProgressBar progress={progress} size={150} strokeWidth={20} />
      <div className="flex flex-col items-center">
        <h1 className=" text-xl">Şuan deneme süresi kullanıyorsunuz.</h1>
        <span className="text-muted-foreground">
          Deneme süresinin bitiş tarihi 04.04.2023.
        </span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-semibold text-xl">
          Şimdi paketlerini yükseltebilirsin.
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {cardPackageData.map((packageData) => (
            <CardPackage packageData={packageData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatePackage;
