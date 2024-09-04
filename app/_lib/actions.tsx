"use server";

import { auth, signIn, signOut } from "@/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalId = formData.get("nationalId") as string;
  const nationalityRaw = formData.get("nationality") as string;
  let nationality, flag;
  const updatedFields: {
    nationalID?: string;
    nationality?: string;
    countryFlag?: string;
  } = {};

  if (!nationalId && !nationalityRaw) {
    return;
  }

  if (nationalId) {
    const regex = /^(?:\d{6,12}|[A-Za-z0-9]{6,12})$/;

    if (!regex.test(nationalId))
      throw new Error("The national ID provided is invalid");

    updatedFields.nationalID = nationalId;
  }

  if (nationalityRaw) {
    const x = nationalityRaw.split("%");
    nationality = x[0];
    flag = x[1];

    updatedFields.nationality = nationality;
    updatedFields.countryFlag = flag;
  }

  const { error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  if (!session.user.guestId) throw new Error("User has no guestId");
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("Booking does not belong to current user!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  if (!session.user.guestId) throw new Error("User has no guestId");

  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => String(booking.id));

  const bookingId = formData.get("bookingId") as string;

  if (!bookingIds.includes(bookingId))
    throw new Error("Booking does not belong to current user!");

  const numGuests = formData.get("numGuests") as string;
  const observations = formData.get("observations") as string;
  let updatedFields: {
    numGuests?: string;
    observations?: string;
  } = {};

  if (numGuests) updatedFields.numGuests = numGuests;

  updatedFields.observations = observations;

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
