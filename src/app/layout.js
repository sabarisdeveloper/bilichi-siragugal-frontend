import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Siragugal Makkal Iyakkam",
  description: "Member Registration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}