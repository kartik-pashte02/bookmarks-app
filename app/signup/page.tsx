"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");

async function handleSignup() {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // 🔥 SEND EMAIL HERE
  await fetch("/api/send-welcome-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  alert("Signup successful + email sent!");
  router.push("/login");
}

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">
        Sign Up
      </h1>

      <input
        type="text"
        placeholder="Handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleSignup}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Sign Up
      </button>
    </div>
  );
}