import "./globals.css";

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

// import "./globals.css";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

// import type { AppProps } from "next/app"
// import { SessionProvider } from "next-auth/react"
 
// export default function MyApp({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />;
//     </SessionProvider>
//   )
// }
