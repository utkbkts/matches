import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  packageData: {
    id: number;
    title: string;
    price: number;
    duration: number;
    description: string;
  };
}

const CardPackage = ({ packageData }: Props) => {
  const { title, price, duration, description } = packageData;

  return (
    <div>
      <Card className="w-[350px] shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 h-[400px] flex flex-col bg-gradient-to-b from-white to-gray-100 border border-gray-200">
        {/* Başlık ve Açıklama */}
        <CardHeader className="text-center p-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-200">
          <CardTitle className="text-2xl font-extrabold text-indigo-700 mb-2">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-500 italic font-medium">
            {description}
          </CardDescription>
        </CardHeader>

        {/* İçerik Kısmı */}
        <CardContent className="p-6 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-700">Fiyat:</span>
            <span className="text-2xl font-bold text-blue-600">${price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Süre:</span>
            <span className="text-md text-gray-600">{duration} gün</span>
          </div>
        </CardContent>

        {/* Alt Kısım - Buton */}
        <CardFooter className="p-6 bg-gray-50 flex justify-center items-center border-t border-gray-200">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-colors w-full">
            Satın Al
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardPackage;
