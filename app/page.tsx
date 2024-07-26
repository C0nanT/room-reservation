import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

interface RoomProps {
  title: string;
  description: string;
  src: string;
  href: string;
  alt: string;
}

export default function Home() {
  const rooms: RoomProps[] = [
    {
      title: "Individual Room",
      description: "A perfect place for work or study in silence",
      src: "/room-individual-1.webp",
      alt: "Individual Office",
      href: "/individual"
    },
    {
      title: "Meeting Room",
      description: "Make meetings with your team or clients in a comfortable space",
      src: "/room-meeting-1.jpg",
      alt: "Meeting Room",
      href: "/meeting"
    },
    {
      title: "Events Room",
      description: "Celebrate your events in a spacious and comfortable room",
      src: "/room-events-1.webp",
      alt: "Events Room",
      href: "/events"
    },
  ]

  return (
    <main className="p-2 flex flex-col items-center">
        <h1 className="text-4xl my-8 font-bold">Dream Room</h1>
        <h2 className="text-lg text-center">Find your dream room that meets all your needs or those of your company. Make your reservation and notify all meeting members.</h2>
        <div className="grid md:grid-cols-3 gap-4 my-8 mx-auto">
          {rooms.map(({ title, description, alt, href, src }) => (
          <div className="flex flex-col gap-2 text-center items-center px-1 py-8 border rounded-xl" key={title}>
            <h3 className="text-2xl underline">{title}</h3>
            <p>{description}</p>
            <Image src={src} alt={alt} width={300} height={200} className="rounded-xl md:h-80 md:w-[420px]" />
            <Button className="mt-4" asChild>
              <Link href={href}>Reserve</Link>
            </Button>
          </div>
          ))}
        </div>
    </main>
  );
}
