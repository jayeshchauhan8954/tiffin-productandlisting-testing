'use client';

import LandingPage from "@/components/landingPage/LandingPage";
import { LoginGuard } from "@/guards/LoginGuard";

export default function Home() {
  return (
    <LoginGuard>
       {/*  It will render only when user not logged in */}
      <LandingPage /> 
    </LoginGuard>
  )
}
