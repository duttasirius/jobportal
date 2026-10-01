import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CategoryCarousel = () => {
  const categories = [
    { name: "Software Development", icon: "💻" },
    { name: "Design", icon: "🎨" },
    { name: "Marketing", icon: "📈" },
    { name: "Finance", icon: "💰" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Human Resources", icon: "👥" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Explore Job Categories</h2>
          <p className="text-gray-500 mt-2">
            Choose your preferred career path.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="p-2">
                  <div className="group cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
                    <div className="flex aspect-square flex-col items-center justify-center gap-4">
                      <span className="text-5xl group-hover:scale-110 transition-transform">
                        {category.icon}
                      </span>

                      <h3 className="text-center font-semibold text-gray-800 group-hover:text-blue-600">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
