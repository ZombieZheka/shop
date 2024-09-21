// (admin)/dashboard/products/page.tsx

import { Suspense } from "react";

import Search from '@/app/ui/search';
// import Pagination from '@/app/ui/pagination';
import { CreateProduct } from "@/app/ui/dashboard/products/buttons";

import Table from '@/app/ui/dashboard/products/table';

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchInvoicesPages(query);

  return (
    <main className="w-full">
      <div>
        <h1 className={`text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct/>
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Table query={query} currentPage={currentPage}/>
      {/* </Suspense> */}
    </main>
  );
}
