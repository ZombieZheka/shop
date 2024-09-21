// (admin)/layout.tsx

import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    return forbiddenPage;
  }

  return (
    <>
      {children}
    </>
  );
}

const forbiddenPage = (
  <div>
    You do not have sufficient rights to access this page
  </div>
)
