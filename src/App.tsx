/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventSection } from './components/EventSection';
import { WinnerSection } from './components/WinnerSection';
import { FinalistRail } from './components/FinalistRail';
import { BehindMileHighPitch } from './components/BehindMileHighPitch';
import { JudgesPanel } from './components/JudgesPanel';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-archive-paper flex flex-col">
      <Header />
      <main id="main-content" className="flex-grow">
        <Hero />
        <EventSection />
        <WinnerSection />
        <FinalistRail />
        <BehindMileHighPitch />
        <JudgesPanel />
      </main>
      <Footer />
    </div>
  );
}
