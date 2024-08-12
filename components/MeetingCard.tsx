"use client";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Meeting } from "@/utils/interfaces";
import { toZonedTime, format } from "date-fns-tz";
import { useRouter } from "next/router";
import Link from "next/link";

const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
  const startTimeInUTC = toZonedTime(meeting.startTime, "UTC");

  const now = new Date();
  const timeDifferenceInMinutes =
    (now.getTime() - startTimeInUTC.getTime()) / (1000 * 60);

  const isEditDisabled = timeDifferenceInMinutes >= 59;

  return (
    <Card key={meeting.id} className="max-w-xs">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-2xl">{meeting.title}</CardTitle>
            <CardDescription>{meeting.description}</CardDescription>
          </div>
          {!isEditDisabled && (
            <Link href={`/form/${meeting.id}`} passHref>
              <Button size="sm">
                Edit
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{meeting.room}</p>
        <p>
          <b>Start Time: </b>
          {format(startTimeInUTC, "MM/dd/yyyy HH:mm", { timeZone: "UTC" })}
        </p>
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 font-bold">
            Participants <ChevronsUpDown size={16} />
          </CollapsibleTrigger>
          {meeting.participants.map((participant) => (
            <CollapsibleContent key={participant.email}>
              {participant.email}
            </CollapsibleContent>
          ))}
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
