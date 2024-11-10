import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
const images = [
  "/slider/slider-1.jpg",
  "/slider/slider-2.jpg",
  "/slider/slider-3.jpg",
  "/slider/slider-4.jpg",
  "/slider/slider-5.jpg",
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);

  const nextSlider = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlider = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlider();
    }, 3000);

    return () => clearInterval(interval);
  }, [current]);
  return (
    <div className="w-full relative select-none">
      <div className=" relative">
        <div
          className="absolute top-1/2 left-0 w-10 bg-black/80 text-white cursor-pointer hover:w-12 transition-all duration-300 flex items-center justify-center"
          onClick={prevSlider}
        >
          <ChevronLeft size={40} />
        </div>
        <img
          src={images[current]}
          alt="image-couple"
          title="couple"
          className="object-cover h-[600px] w-full"
        />
        <div
          className="absolute top-1/2 right-0 w-10 bg-black/80 text-white cursor-pointer hover:w-12 transition-all duration-300 flex items-center justify-center"
          onClick={nextSlider}
        >
          <ChevronRight size={40} />
        </div>
      </div>
      <div className="container mx-auto">
        {" "}
        <div className="min-h-screen">
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>

            <div>
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <img
                      src="/slider/slider-3.jpg"
                      alt="product preview"
                      width={1364}
                      height={866}
                      className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>
        {/* FEATURES */}
        <div className="mt-24 min-h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-4xl font-bold bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] bg-clip-text text-transparent h-12">
              You can get more message rights by becoming Premium.
            </h1>
            <span className="text-muted-foreground">
              This way you increase your chances
            </span>
            <Separator />
          </div>
          <div className="grid grid-cols-3 mt-12 gap-4">
            <div className="border border-gray-200 h-[400px] p-6">
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">Basic</h1>
                <span className="text-6xl font-bold">
                  $29{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Unlimited messages</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Access to basic features</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>1 GB cloud storage</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Basic customer support</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Weekly updates</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-full pt-4">
                <Button>Buy Now</Button>
              </div>
            </div>
            <div className="border border-gray-200 h-[400px] ring-4 scale-110 ring-inset ring-gray-900/10 p-6">
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">Standard</h1>
                <span className="text-6xl font-bold">
                  $49{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Unlimited messages</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Access to standard features</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>5 GB cloud storage</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Daily updates</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-full pt-4">
                <Button>Buy Now</Button>
              </div>
            </div>
            <div className="border border-gray-200 h-[400px] p-6">
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">Premium</h1>
                <span className="text-6xl font-bold">
                  $79{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Unlimited messages</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Access to all features</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Unlimited cloud storage</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>24/7 premium support</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <span>Real-time updates</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-full pt-4">
                <Button>Buy Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
