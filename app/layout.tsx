import type { Metadata } from "next";
import { AuthProvider } from "../auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "authentication and authorization for next by typescript",
  description: "authentication and authorization for next by typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider redirectPath="/login" noAccessRedirectPath="/no-access">
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
