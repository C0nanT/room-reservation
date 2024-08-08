"use client";

import { Separator } from "@/components/ui/separator";
import { getMeetings } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import MeetingCard from "./MeetingCard";

const UserMeetings = () => {
  const { data: meetings, isPending } = useQuery({
    queryKey: ["meetings"],
    queryFn: getMeetings,
  });

  if (isPending) {
    return <p>loading ..</p>;
  }

  const now = new Date();

  const currentMeetings = meetings?.filter((meeting) => {
    const startTime = new Date(meeting.startTime);
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 59);
    return now >= startTime && now <= endTime;
  });

  const futureMeetings = meetings?.filter(
    (meeting) => now < new Date(meeting.startTime),
  );

  const pastMeetings = meetings?.filter((meeting) => {
    const startTime = new Date(meeting.startTime);
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 59);
    return now > new Date(endTime);
  });

  return (
    <div className="w-full px-4">
      <h1 className="py-12 text-center text-4xl">My Reservations</h1>
      <div className="flex flex-col items-center lg:block mb-4 max-w-[1500px] mx-auto">
        <h2 className="mb-2 text-3xl">Reservations</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 ">
          {futureMeetings ? (
            futureMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          ) : (
            <p>No Reservations</p>
          )}
        </div>
      </div>
      <Separator />
      {currentMeetings && currentMeetings.length > 0 && (
        <>
          <div className="flex flex-col items-center lg:block mb-4 max-w-[1500px] mx-auto">
            <h2 className="mb-2 text-3xl">Rooms Being Used</h2>
            <div className="grid grid-cols-4 gap-2">
              {currentMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
          <Separator />
        </>
      )}
      {pastMeetings && pastMeetings.length > 0 && (
        <div className="flex flex-col items-center lg:block mb-4 max-w-[1500px] mx-auto">
          <h2>Reservations History</h2>
          <div className="grid grid-cols-4 gap-2">
            {pastMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMeetings;
