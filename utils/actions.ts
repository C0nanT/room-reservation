"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MeetingForm } from "./interfaces";

function authenticateAndRedirect(): string {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return userId;
}

export async function createMeeting(values: MeetingForm) {
  const userId = authenticateAndRedirect();
  try {
    const overlappingMeeting = await prisma.meeting.findFirst({
      where: {
        room: values.room,
        NOT: [
          {
            startTime: values.startTime,
          },
        ],
      },
    });

    if (overlappingMeeting) {
      console.log("A meeting already exists within the provided time range.");
      return null; // Or throw an error or return a specific message
    }

    const meeting = await prisma.meeting.create({
      data: {
        ...values,
        userId,
      },
    });
    return meeting;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeetings() {
  const userId = authenticateAndRedirect();
  try {
    const meetings = await prisma.meeting.findMany({
      where: {
        userId,
      },
    });
    return meetings;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeeting(id: string) {
  const userId = authenticateAndRedirect();
  try {
    const meeting = await prisma.meeting.findUnique({
      where: {
        id,
        userId,
      },
    });
    return meeting;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateMeeting(id: string, values: MeetingForm) {
  const userId = authenticateAndRedirect();
  try {
    const overlappingMeeting = await prisma.meeting.findFirst({
      where: {
        id: {
          not: id,
        },
        room: values.room,
        NOT: [
          {
            startTime: values.startTime,
          },
        ],
      },
    });

    if (overlappingMeeting) {
      console.log("A meeting already exists within the provided time range.");
      return null;
    }

    const meeting = await prisma.meeting.update({
      where: {
        id,
        userId,
      },
      data: values,
    });
    return meeting;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeetingsReservations() {
  try {
    const meetings = await prisma.meeting.findMany({
      select: {
        startTime: true,
        room: true,
      },
    });
    return meetings;
  } catch (error) {
    console.log(error);
    return null;
  }
}
