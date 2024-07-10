'use client';
import Header from '@/components/Common/Header'
import Scrollbar from '@/components/Scrollbar';
import React from 'react'

export default function Layout({ children }) {
    return (
        <Scrollbar sx={{ height: '100vh' }}>
            <Header />
            {children}
        </Scrollbar>
    )
}
