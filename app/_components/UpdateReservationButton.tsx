"use client";

import { useFormStatus } from "react-dom";

function UpdateReservationButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Updating..." : "Update reservation"}
    </button>
  );
}

export default UpdateReservationButton;
