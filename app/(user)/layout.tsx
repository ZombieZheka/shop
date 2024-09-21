// (user)/layout.tsx

import NavPanel from "@/app/ui/nav-panel";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="p-5">
        <NavPanel/>
      </header>
      {children}
      <footer className="p-5">
        <p>
          ShopCompany 2024
        </p>
      </footer>
    </>
  );
}

// <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
// <div className="w-full flex-none md:w-64">
// <NavPanel/>
// </div>
// <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
// </div>
