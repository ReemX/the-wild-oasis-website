import UpdateReservationButton from "@/app/_components/UpdateReservationButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { isPast } from "date-fns";

async function ReservationEditPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id);
  const cabin = await getCabin(booking.cabinId);
  const session = await auth();

  if (session?.user.guestId !== booking.guestId)
    throw new Error("No reservation with that ID was found");

  if (isPast(booking.startDate))
    throw new Error("Can't edit a reservation that's in the past!");

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{params.id}
      </h2>

      <form
        action={updateBooking}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <input type="hidden" name="bookingId" defaultValue={params.id} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={booking.numGuests}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={booking.observations}
            className="w-full resize-none rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <UpdateReservationButton />
        </div>
      </form>
    </div>
  );
}

export default ReservationEditPage;
