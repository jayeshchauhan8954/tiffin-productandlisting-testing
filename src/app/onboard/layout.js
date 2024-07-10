'use client';
import React from 'react'

import Navbar from '@/layouts/sellerOnBoard/Navbar';
import OnboardLayout from '@/layouts/sellerOnBoard/OnboardLayout'

export default function layout({ children }) {

  return (
    <OnboardLayout>
      <Navbar navConfig={[]} />
      {children}
    </OnboardLayout>
  )
}
