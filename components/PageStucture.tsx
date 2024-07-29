"use client";
import { CarouselImages } from "@/components/CarouselImages";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface PageStructureProps {
  name: string;
  description: string;
  images: string[];
  features: string[];
  price: number;
  capacity: number;
}

const PageStructure = ({
  name,
  description,
  images,
  features,
  price,
  capacity,
}: PageStructureProps) => {
  const { isSignedIn } = useUser();

  return (
    <div className="mx-auto p-2">
      <h1 className="my-8 text-center text-4xl font-bold">{name}</h1>
      <h2 className="max-w-5xl text-center md:text-lg">{description}</h2>
      <div className="my-12 flex flex-col items-center gap-20 2xl:flex-row 2xl:items-start">
        <CarouselImages images={images} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl underline">Features</h3>
            <ul className="list-inside list-disc">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl underline">Pricing</h3>
            <p>${price}/hour</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl underline">Maximum Capacity</h3>
            <p>{capacity} people</p>
          </div>
          <Button size="lg" asChild>
            <Link href={isSignedIn ? `/form?name=${name}&price=${price}&capacity=${capacity}` : "/sign-in"}>Reserve</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageStructure;
