export interface User {
  id: string;
  email: string;
  meetings: Meeting[];
}

export interface Participant {
  id: string;
  email: string;
  meetindgId: string;
  meeting: Meeting;
}

export interface Meeting {
  id: string;
  room: string;
  title: string;
  description?: string;
  startTime: Date;
  userId: string;
  participants: Participant[];
  summary?: string;
}

export interface MeetingForm {
  title: string;
  room: string;
  description?: string;
  startTime: Date;
  participants: {email: string}[];
}

export interface CreateParticipantInput {
  email: string;
}
