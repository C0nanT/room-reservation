import PageStructure from "@/components/PageStucture";
import { limitRoom, priceRoom } from "@/utils/constants";

const EventsRoom = () => {
  const images = [
    "/room-events-1.webp",
    "/room-events-2.webp",
    "/room-events-3.webp",
  ];
  const title = "Events Room";
  const description =
    "Experience the ultimate venue for your events in our Events Room. Tailored for gatherings, celebrations, and conferences, this expansive space is designed to accommodate a variety of occasions with elegance and versatility. Equipped with state-of-the-art audiovisual technology and flexible seating arrangements, it's the ideal setting for creating memorable experiences and impactful presentations.";
  const features = [
    "Spacious area with flexible seating arrangements",
    "High-quality snooker table for entertainment",
    "Advanced audiovisual system for events",
    "Dedicated stage area for performances or presentations",
    "Professional lighting system with adjustable settings",
    "Acoustic panels for enhanced sound quality",
  ];

  return (
    <PageStructure
      name={title}
      description={description}
      images={images}
      features={features}
      price={priceRoom.EVENT}
      capacity={limitRoom.EVENT}
    />
  );
};

export default EventsRoom;
