import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import Background from "@/components/Background";
import MenuProvider from "@/context/MenuProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-semantic-bg-surface text-semantic-text-primary min-h-screen flex flex-col">
        <Background />
        <MenuProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastProvider />
        </MenuProvider>
      </body>
    </html>
  );
}
