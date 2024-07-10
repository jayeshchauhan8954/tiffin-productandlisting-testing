'use client';

import React from 'react'
import FavoriteListing from '@/components/user/favorite/FavoriteListing';
import UserAuthGuard from '@/guards/UserAuthGuard';

export default function page() {
  return (
    <UserAuthGuard>
      <FavoriteListing />
    </UserAuthGuard>
  )
}
