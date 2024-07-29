import PageStructure from "@/components/PageStucture";
import { limitRoom, priceRoom } from "@/utils/constants";

const MeetingRoom = () => {
  const images = ["/room-meeting-1.jpg", "/room-meeting-2.jpg", "/room-meeting-3.jpg"];
  const title = "Meeting Room";
  const description = "Elevate your team's collaboration and strategic planning in our state-of-the-art Meeting Room. Designed to foster teamwork and innovation, this space is equipped with the latest technology and amenities to facilitate productive meetings, workshops, and brainstorming sessions.";
  const features = [
  "Large conference table with comfortable seating",
  "Multimedia projector and screen",
  "Whiteboard and markers",
  "Teleconferencing equipment",
  "Adjustable lighting and climate control",
  "Soundproof walls for privacy",
  ];

  return (
    <PageStructure name={title} description={description} images={images} features={features} price={priceRoom.MEETING} capacity={limitRoom.MEETING} />
  );
};

export default MeetingRoom