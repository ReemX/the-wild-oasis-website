"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./AuthContext";

function Guestnav() {
  const session = useAuth();

  return (
    <>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="flex items-center justify-center gap-4 transition-colors hover:text-accent-400"
        >
          <Image
            src={session.user.image}
            alt={session?.user?.name ?? "Profile Picture of User"}
            referrerPolicy="no-referrer"
            width={0}
            height={0}
            sizes="100vw"
            className="h-8 w-auto rounded-full"
          />
          <span>Guest area</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="transition-colors hover:text-accent-400"
        >
          Guest area
        </Link>
      )}
    </>
  );
}

export default Guestnav;
