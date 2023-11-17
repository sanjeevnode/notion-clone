"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center sapce-y-4">
      <Image
        src="/error.png"
        alt="error"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        alt="error"
        width={300}
        height={300}
        className="hidden dark:block"
      />

      <h2>Somethig went wrong :(</h2>
      <Button asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
