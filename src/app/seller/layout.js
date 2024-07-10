'use client';
import React from 'react'

import { _routes } from '@/utils/endPoints/routes';
import SellerLayout from '@/layouts/seller/SellerLayout';
import Navbar from '@/layouts/sellerOnBoard/Navbar';
import SellerGuard from '@/guards/SellerGuard';

export default function Layout({ children }) {

    // Nav config
    let navConfig = [
        { title: "Dahsboard", path: _routes.seller.dashboard },
        { title: "Item", path: _routes.seller.item },
        { title: "Products", path: _routes.seller.products.list },
        { title: "Orders", path: _routes.seller.orders }
    ]

    return (

        <SellerLayout>
            <SellerGuard>
                <Navbar navConfig={navConfig} />
                {children}
            </SellerGuard>
        </SellerLayout>
    )
}
