'use client';

import React from 'react'
import { Button } from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";


const logout = () => {
  return (
    <Button onClick={()=> authClient.signOut()}>
        Logout
    </Button>
  )
}

export default logout