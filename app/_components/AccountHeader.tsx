"use client";

import { useAuth } from "./AuthContext";

function AccountHeader() {
  const session = useAuth();
  const firstName = session?.user?.name?.split(" ").at(0) ?? null;

  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome,{" "}
      {!firstName ? "" : firstName[0].toUpperCase() + firstName.slice(1)}
    </h2>
  );
}

export default AccountHeader;
