import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Hub API - Generic Open Data Backend",
  description: "A production-ready REST API for storing and serving ANY type of data using categories and flexible JSON structures. JWT authentication, role-based access control, and developer-friendly documentation.",
  keywords: ["Data Hub API", "REST API", "Next.js", "TypeScript", "Prisma", "JWT", "Open Data"],
  authors: [{ name: "Jabes Nelma" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Data Hub API",
    description: "Generic open data backend with flexible JSON structures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
