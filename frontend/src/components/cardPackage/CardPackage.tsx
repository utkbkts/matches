import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getErrorMessage } from "@/helpers/error-message";
import { useCreateSubscriptinMutation } from "@/store/api/subscription-api";
import { useEffect } from "react";
import { toast } from "sonner";

interface Feature {
  icon: JSX.Element;
  message: string;
}

interface Props {
  packageData: {
    id: number;
    planId: string;
    planAmount: number;
    planCurrency: string;
    planInterval: string;
    description: string;
    features: Feature[];
  };
}

const CardPackage = ({ packageData }: Props) => {
  const {
    description,
    features,
    planAmount,
    planCurrency,
    planId,
    planInterval,
  } = packageData;

  const [stripeMutation, { isError, error }] = useCreateSubscriptinMutation();

  useEffect(() => {
    if (isError) {
      const getError = getErrorMessage(error);
      toast.error(getError);
    }
  }, [isError, error]);

  const handleSubscribe = async () => {
    const data = {
      planId,
      planAmount,
      planCurrency,
      planInterval,
    };

    try {
      const response = await stripeMutation(data);
      const { url } = response?.data || {};

      if (url) {
        window.location.href = url;
      } else {
        toast.error("Subscription creation failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="md:w-[350px]  shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 h-[450px] flex flex-col">
        {/* Başlık ve Açıklama */}
        <CardHeader className="text-center p-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-200">
          <CardTitle className="text-2xl font-extrabold text-indigo-700 mb-2">
            {planId}
          </CardTitle>
          <CardDescription className="text-gray-500 italic font-medium">
            {description}
          </CardDescription>
        </CardHeader>

        {/* İçerik Kısmı */}
        <CardContent className="p-4 flex-grow h-full">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Price:</span>
            <span className="text-xl font-bold text-green-600">
              ${planAmount}({planCurrency})
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-semibold text-gray-700">Time:</span>
            <span className="text-md text-gray-600">{planInterval}</span>
          </div>
          {/* Özellikler Listesi */}
          <ul className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                {feature.icon}
                <span className="text-gray-700">{feature.message}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        {/* Alt Kısım - Buton */}
        <CardFooter
          onClick={handleSubscribe}
          className="flex mt-auto justify-center p-4 bg-gray-50"
        >
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-green-500 hover:to-blue-600 transition-colors">
            Buy
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardPackage;
