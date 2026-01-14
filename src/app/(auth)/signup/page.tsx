import React from "react";
import RegisterForm from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  await requireUnauth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logos/logo.svg" alt="n8n" width={100} height={50} />
          <i>
            <span className="text-lg font-bold italic">N8N</span>
          </i>
        </Link>

        {/* FORM */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
