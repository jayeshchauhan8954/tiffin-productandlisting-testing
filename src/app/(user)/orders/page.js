'use client';

import React from 'react'
import Listing from '@/components/user/orders/Listing'
import UserAuthGuard from '@/guards/UserAuthGuard';

export default function page() {
  return (
    <UserAuthGuard>
      <Listing />
    </UserAuthGuard>
  )
}
