import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-pink-50 text-gray-800">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
