export interface User {
  id: string;
  email: string;
  meetings: Meeting[];
}

export interface Guest {
  id: string;
  email: string;
  meetingId: string;
  meeting: Meeting;
}

export interface Meeting {
  id: string;
  room: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  userId: string;
  guests: {
    create: Omit<Guest, "id" | "meetingId" | "meeting">[];
  }
  summary?: string;
}

export interface MeetingForm {
  title: string;
  room: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  guests: {
    create: Omit<Guest, "id" | "meetingId" | "meeting">[];
  };
}
