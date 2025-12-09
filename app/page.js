"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Home Page</h1>

      <Link href="/secondPage">
        <button style={{
          padding: "10px 20px",
          background: "#4F7477",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginTop: "20px"
        }}>
          Go to Second Page
        </button>
      </Link>
    </main>
  );
}
