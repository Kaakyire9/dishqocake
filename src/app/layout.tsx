import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <body className="font-sans bg-semantic-bg-surface text-semantic-text-primary">
        <Navbar />
        {children}
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
