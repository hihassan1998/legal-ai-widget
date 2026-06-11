import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Legal AI Widget MVP</h1>

      <p>Demo widget:</p>

      <Link href="/widget">
        Open Chat Widget
      </Link>
    </main>
  );
}