import UserMeetings from "@/components/UserMeetings";
import { getMeetings } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Reservation = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["meetings"],
    queryFn: getMeetings,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserMeetings />
    </HydrationBoundary>
  );
};

export default Reservation;
