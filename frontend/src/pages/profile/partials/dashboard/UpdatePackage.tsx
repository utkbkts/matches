import CardPackage from "@/components/cardPackage/CardPackage";
import CircularProgressBar from "@/components/circleBar/CircleProgress";
import { calculateDate, calculateProgress } from "@/helpers/date-format";
import { useGetByIdQuery } from "@/store/api/subscription-api";
import { useAppSelector } from "@/store/hooks";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
export const cardPackageData = [
  {
    id: 1,
    planId: "Trial Free",
    planAmount: 0,
    planInterval: "month",
    planCurrency: "USD",
    trialDays: 7,
    description: "Trial 7 days",
    features: [
      {
        icon: <Check className="w-7 h-7 text-green-400" />,
        message: "Sınırsız Mesajlaşma",
      },
    ],
  },
  {
    id: 2,
    planId: "Silver",
    planAmount: 19,
    planInterval: "month",
    planCurrency: "USD",
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
    id: 3,
    planId: "Platinum",
    planAmount: 70,
    planCurrency: "USD",
    planInterval: "month",
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
    id: 4,
    planId: "Gold",
    planAmount: 99,
    planCurrency: "USD",
    planInterval: "year",
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
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetByIdQuery("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (
      data?.subscription?.subscription_start_date &&
      data?.subscription?.subscription_end_date
    ) {
      const startDate = data.subscription.subscription_start_date;
      const endDate = data.subscription.subscription_end_date;
      const calculatedProgress = calculateProgress(startDate, endDate);
      setProgress(calculatedProgress);
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4">
      {user?.currentSubscription === null ? (
        <h1>Buy now to find your dream partner</h1>
      ) : (
        <>
          <CircularProgressBar
            progress={progress}
            size={150}
            strokeWidth={20}
          />
          {data?.subscription?.subscription_status === "past_due" ? (
            <div className="flex flex-col items-center">
              <h1>You are currently using a trial period.</h1>
              <span className="text-muted-foreground">
                Trial period end date{" "}
                {calculateDate(data?.subscription?.trial_end_date)}.
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground">
                Your package will expire{" "}
                {calculateDate(data?.subscription?.subscription_end_date)}.
              </span>
            </div>
          )}
        </>
      )}
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-semibold text-xl">
          You can upgrade your packages now.
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
