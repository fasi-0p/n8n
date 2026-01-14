// 'use client'

import React from 'react'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {requireAuth} from "@/lib/auth-utils";
import {caller} from "@/trpc/server";
import Logout from "@/app/logout"

const Page = async () => {
  await requireAuth();

  const data= await caller.getUsers()

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>
        {JSON.stringify(data)}
      </div>
      <Logout/>
    </div>
  );
};

export default Page;