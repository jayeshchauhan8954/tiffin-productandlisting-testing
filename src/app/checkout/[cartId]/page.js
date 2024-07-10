'use client';
import React from 'react'
import Checkout from '@/components/user/cart/Checkout'
import UserAuthGuard from '@/guards/UserAuthGuard';

export default function page() {
    return (
        <UserAuthGuard>
            <Checkout />
        </UserAuthGuard>
    )
}
