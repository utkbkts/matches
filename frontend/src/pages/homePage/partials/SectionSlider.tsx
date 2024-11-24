import { sliderDataImage } from "../data/index-data";

const SectionSlider = () => {
  const shuffledImages = sliderDataImage.sort(() => Math.random() - 0.5);

  return (
    <div className="relative">
      <div className="bg-black/40 w-full h-full absolute"></div>
      {/* Image slider with smooth scrolling effect */}
      <div className="flex absolute -z-20 animate-scrollUp">
        <div className="flex flex-col">
          {shuffledImages.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt="image"
              className="w-full h-[400px] object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionSlider;
