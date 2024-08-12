"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MeetingForm } from "./interfaces";
import { addMinutes, subMinutes } from "date-fns";

function authenticateAndRedirect(): string {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return userId;
}

export async function createMeeting(values: MeetingForm) {
  const userId = authenticateAndRedirect();
  const oneHourBefore = subMinutes(new Date(values.startTime), 59);
  const oneHourAfter = addMinutes(new Date(values.startTime), 59);
  try {
    const overlappingMeeting = await prisma.meeting.findFirst({
      where: {
        room: values.room,
        startTime: {
          gte: oneHourBefore,
          lte: oneHourAfter,
        },
      },
    });

    if (overlappingMeeting) {
      console.log(
        "A meeting already exists in this room at the same start time.",
      );
      return null;
    }

    const meeting = await prisma.meeting.create({
      data: {
        title: values.title,
        room: values.room,
        description: values.description,
        startTime: values.startTime,
        userId,
        participants: {
          create: values.participants,
        },
      },
      include: {
        participants: true,
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
      include: {
        participants: true,
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
      include: {
        participants: true,
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
      data: {
        ...values,
        participants: {
          create: values.participants.map((guest) => ({ email: guest.email })),
        },
      },
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
