import {
  cabin,
  getBookedDatesByCabinId,
  getSettings,
} from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }: { cabin: cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(String(cabin.id)),
  ]);

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
