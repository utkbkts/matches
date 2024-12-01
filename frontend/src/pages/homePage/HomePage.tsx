import CardPackage from "@/components/cardPackage/CardPackage";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cardPackageData } from "../profile/partials/dashboard/UpdatePackage";
import SectionAbout from "./partials/SectionAbout";
import avatar from "/avatar/Explore-Image.png";
import SectionCustomer from "./partials/SectionCustomer";
import { customerData } from "./data/index-data";
import SectionSlider from "./partials/SectionSlider";
const images = [
  "/slider/slider-2.jpg",
  "/slider/slider-4.jpg",
  "/slider/slider-5.jpg",
  "/slider/slider-6.jpg",
  "/slider/slider-7.jpg",
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
    <div className="w-full relative  select-none">
      {/* HERO */}
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
          className="object-cover h-[600px] w-full bg-fixed bg-center"
        />
        <div
          className="absolute top-1/2 right-0 w-10 bg-black/80 text-white cursor-pointer hover:w-12 transition-all duration-300 flex items-center justify-center"
          onClick={nextSlider}
        >
          <ChevronRight size={40} />
        </div>
        <div className="bg-[#ED147D] w-full absolute bottom-0 h-[10vh] lg:block hidden">
          <div className="flex items-center justify-between h-full container mx-auto">
            <div>
              <img src={avatar} alt="avatar" className="animate-img" />
            </div>
            <div className="flex flex-col items-center pr-24">
              <h1 className="text-white font-bold text-[35px]">
                Start your love story
              </h1>
              <span className="font-semibold text-white">
                Find love with our dating site !
              </span>
            </div>
            <div>
              <button className="text-[#ED147D] font-semibold px-8 py-3 rounded-full bg-white hover:bg-gray-100">
                Find Love Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION ABOUT*/}
      <div className="container mx-auto">
        <section className="md:h-[70vh] min-h-screen">
          <SectionAbout />
        </section>

        {/* SECTION IMAGE*/}
        <section className="min-h-screen">
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
        </section>

        {/*SECTION FEATURES */}
        <section className="mt-24 min-h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-4xl font-bold bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] bg-clip-text text-transparent h-12">
              You can get more message rights by becoming Premium.
            </h1>
            <span className="text-muted-foreground">
              This way you increase your chances
            </span>
            <Separator />
          </div>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-12 gap-4 ">
            {cardPackageData.map((packageData) => (
              <CardPackage key={packageData.id} packageData={packageData} />
            ))}
          </div>
        </section>
        {/*SECTION CUSTOMER */}
        <section className="mt-24 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {customerData.map((item) => (
            <SectionCustomer key={item.id} customer={item} />
          ))}
        </section>

        {/*SECTION SLIDER */}
        <section className="mt-24 h-[50vh] grid-cols-4 grid overflow-hidden mb-12 relative">
          <SectionSlider />
          <SectionSlider />
          <SectionSlider />
          <SectionSlider />
          {/* Overlay with text centered */}
          <div className="absolute flex items-center justify-center z-50 inset-0 ">
            <div className="flex items-center flex-col gap-4 text-white text-center">
              <h2 className="text-4xl font-bold">
                They Met On <span className="quipit">Quipid !</span>
              </h2>
              <p className="mt-2 text-lg w-[600px]">
                We’re incredibly happy & proud to have sparked thousands of
                encounters & beautiful love stories. So please share your story
                with us! We need our a daily love fix.
              </p>
              <button className="bg-[#CB136C] py-2 px-4">Coming Soon</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
