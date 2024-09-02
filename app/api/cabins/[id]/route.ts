import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(params.id),
      getBookedDatesByCabinId(params.id),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found!" });
  }
}
