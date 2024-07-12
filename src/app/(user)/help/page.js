'use client';

import Help from '@/components/user/help/Help';
import UserAuthGuard from '@/guards/UserAuthGuard';

export default function page() {
  return (
    <>
        <UserAuthGuard>
          <Help />
        </UserAuthGuard>
    </>
  )
}
