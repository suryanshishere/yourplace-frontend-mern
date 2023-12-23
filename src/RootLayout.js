import React from 'react'
import { Outlet } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main><Outlet /></main>
    </>
  )
}

export default RootLayout