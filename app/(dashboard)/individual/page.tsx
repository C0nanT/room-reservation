import { CarouselImages } from "@/components/CarouselImages";
import PageStructure from "@/components/PageStucture";
import { Button } from "@/components/ui/button";
import { limitRoom, priceRoom } from "@/utils/constants";
import Link from "next/link";

const IndividualRoom = () => {
  const images = [
    "/room-individual-1.webp",
    "/room-individual-2.webp",
    "/room-individual-3.webp",
  ];
  const title = "Individual Room";
  const description =
    "Discover the perfect haven for productivity and focus in our Individual Room. Designed for those seeking a quiet retreat, this space offers a tranquil environment where you can study or work undisturbed, ensuring maximum concentration and efficiency.";
  const features = [
    "High-speed Wi-Fi",
    "Desk and ergonomic chair",
    "Power outlets and USB ports",
    "Adjustable lighting",
    "Climate control",
    "Complimentary water and coffee",
  ];

  return (
    <PageStructure
      name={title}
      description={description}
      images={images}
      features={features}
      price={priceRoom.INDIVIDUAL}
      capacity={limitRoom.INDIVIDUAL}
    />
  );
};

export default IndividualRoom;
