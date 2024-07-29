import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "./ui/badge";

export function CarouselImages({ images }: { images: string[] }) {
  return (
    <Carousel
      className="w-full max-w-md"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="relative flex justify-center">
            <Badge className="absolute right-2 top-2 bg-black text-white">
              {index + 1}/{images.length}
            </Badge>
            <Image
              src={image}
              alt={`Image ${index}`}
              width={300}
              height={200}
              className="md:w-128 h-72 w-80 rounded-xl md:h-96"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
