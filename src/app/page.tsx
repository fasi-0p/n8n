import React from 'react'
import {Button} from "@/components/ui/button"
import prisma from "@/lib/db"

const page = async() => {
  const user = await prisma.user.findMany();

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {JSON.stringify(user)}
    </div>
  )
}

export default page