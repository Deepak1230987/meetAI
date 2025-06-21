"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
export default function Home() {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
const {data: session} = authClient.useSession();
  const onSubmit =  () => {
    authClient.signUp.email({
      email,
      name,
      password
    },{
      onSuccess: () => {
        console.log("User created successfully");
        window.alert("User created successfully");

      },
      onError: (error) => {
        console.error("Error creating user:", error);
        window.alert("Error creating user: " + error);
      }
    })
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
        <p className="mb-4">You are already logged in.</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create user</Button>
    </div>
  );
}
