import React from 'react'
import {requireAuth} from '@/lib/auth-utils'


const page = async () => {
  await requireAuth();

  return  <p>Workflow page</p>
}

export default page