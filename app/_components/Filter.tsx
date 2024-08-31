"use client";

import Link from "next/link";
import { capacityParams } from "../cabins/page";

function Filter({ filter }: { filter: capacityParams }) {
  return (
    <div className="flex border border-primary-800">
      <FilterButton filter="all" activeFilter={filter}>
        All cabins
      </FilterButton>
      <FilterButton filter="small" activeFilter={filter}>
        1&mdash;3 guests
      </FilterButton>
      <FilterButton filter="medium" activeFilter={filter}>
        4&mdash;8 guests
      </FilterButton>
      <FilterButton filter="large" activeFilter={filter}>
        8&mdash;12 guests
      </FilterButton>
    </div>
  );
}

function FilterButton({
  filter,
  activeFilter,
  children,
}: {
  filter: capacityParams;
  activeFilter: capacityParams;
  children: string;
}) {
  return (
    <Link
      href={`/cabins?capacity=${filter}`}
      className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
    >
      {children}
    </Link>
  );
}

export default Filter;
