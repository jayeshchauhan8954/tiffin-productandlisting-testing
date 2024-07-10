'use client';

import ProfileDetail from '@/components/user/profile/ProfileDetail';
import UserAuthGuard from '@/guards/UserAuthGuard';
import React from 'react'

export default function page() {
    return (
        <UserAuthGuard>
            <ProfileDetail />
        </UserAuthGuard>
    )
}
