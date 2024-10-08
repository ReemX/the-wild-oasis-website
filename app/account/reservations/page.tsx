import Reservationslist from "@/app/_components/ReservationsList";
import { getBookings } from "@/app/_lib/data-service";
import { auth } from "@/auth";

export const metadata = {
  title: "Reservations",
};

export default async function ReservationsPage() {
  const session = await auth();
  if (!session?.user.guestId) throw new Error("User has no guestId");
  const bookings = await getBookings(session?.user.guestId);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <Reservationslist bookings={bookings} />
      )}
    </div>
  );
}
