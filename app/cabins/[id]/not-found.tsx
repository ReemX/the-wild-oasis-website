import Link from "next/link";

function CabinIdNotfound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        No cabin was found with that ID
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Look for another cabin?
      </Link>
    </main>
  );
}

export default CabinIdNotfound;
