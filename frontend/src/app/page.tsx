import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold">Welcome to My Next.js App 🚀</h1>
      <p className="text-lg mt-4">This is your custom homepage.</p>
      <a
        href="https://nextjs.org/docs"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Read Next.js Docs
      </a>
    </main>
  );
}
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App 🚀</h1>
      <p className="text-lg mb-6">This is your custom homepage.</p>
      <a
        href="https://nextjs.org/docs"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Next.js Docs
      </a>
    </main>
  );
}