'use client';
import React from 'react'
import dynamic from 'next/dynamic'

const Listing = dynamic(() => import('@/components/seller/orders/Listing'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

export default function page() {
    return (
        <Listing />
    )
}
