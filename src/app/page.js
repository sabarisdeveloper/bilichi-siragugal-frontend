import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto mt-10">

        <div className="bg-white rounded-lg shadow-lg p-10 text-center">

          <h2 className="text-3xl font-bold text-green-700">
            Welcome
          </h2>

          <p className="mt-4 text-gray-600">
            Siragugal Makkal Iyakkam Membership Portal
          </p>

          <Link
            href="/register"
            className="inline-block mt-8 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800"
          >
            Register Now
          </Link>

        </div>

      </div>

    </>
  );
}