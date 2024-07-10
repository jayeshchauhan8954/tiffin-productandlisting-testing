'use client';

import React from 'react'

// components
import UserLayout from '@/layouts/user/UserLayout';
import GuestUserGuard from '@/guards/GuestUserGard';

export default function layout({ children }) {
    return (
        <UserLayout>
            <GuestUserGuard>
                {children}
            </GuestUserGuard>
        </UserLayout>
    )
}
