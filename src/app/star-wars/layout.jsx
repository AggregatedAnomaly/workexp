"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/button";

export function StarWarsLayout({ children }) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full m-auto h-full">
      <nav>
        <Button className="p-3" type="primary" onClick={() => router.push("/")}>
          Home
        </Button>
      </nav>
      <div className="mx-auto">
        <h1 className="p-6 text-5xl font-bold">Star Wars</h1>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default StarWarsLayout;
