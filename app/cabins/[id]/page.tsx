import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { name } = await getCabin(params.id);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const cabinsId = cabins.map((cabin) => ({ id: String(cabin.id) }));
  return cabinsId;
}

export default async function CabinIdPage({
  params,
}: {
  params: { id: string };
}) {
  const cabin = await getCabin(params.id);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
