import React, { useEffect, useState, } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import { AnimPage, Layout } from './pages/layout'
import { Calendar, Calculator, Alarm, Contact, Camera, Gallery, Note, Phone, Chatgpt } from './pages/apps'
import { slide, scale } from './pages/layout/Anims'
import { FcAlarmClock, FcSettings, FcCamera, FcGallery, FcKindle, FcPhone, FcContacts, FcCalendar, FcCalculator } from "react-icons/fc"
import { OpenAI } from './pages/components/Icons'
import Home from './pages/Home'
import Lock from './pages/Lock'
import './assets/css/App.css'

export const Apps = [
  { Icon: FcCalendar, path: '/calendar', Component: Calendar, ComponentProps: { title: 'Calendar' }, variants: { scale } },
  { Icon: FcCalculator, path: '/calculator', Component: Calculator, ComponentProps: { title: 'Calculator' }, variants: { scale } },
  { Icon: FcAlarmClock, path: '/alarm', Component: Alarm, ComponentProps: { title: 'Alarm' }, variants: { scale } },
  { Icon: FcGallery, path: '/gallery', Component: Gallery, ComponentProps: { title: 'Gallery' }, variants: { scale } },
  { Icon: FcContacts, path: '/contact', Component: Contact, ComponentProps: { title: 'Contact' }, variants: { scale } },
  { Icon: FcCamera, path: '/camera', Component: Camera, ComponentProps: { title: 'Camera' }, variants: { scale } },
  { Icon: FcKindle, path: '/note', Component: Note, ComponentProps: { title: 'Note' }, variants: { scale } },
  { Icon: FcPhone, path: '/phone', Component: Phone, ComponentProps: { title: 'Phone' }, variants: { scale } },
  { Icon: OpenAI, path: '/chatgpt', Component: Chatgpt, ComponentProps: { title: 'ChatGPT' }, variants: { scale } },
  { Icon: FcSettings, path: '/edge', Component: Layout, ComponentProps: { title: 'Edge' }, variants: { scale } }
];

export const AuthContext = React.createContext({ isLoggedIn: false });

function App() {
  useEffect(() => {
    function getRandomGradient() {
      const startColor = Math.floor(Math.random() * 14) + 1;
      const endColor = Math.floor(Math.random() * 14) + 1;
      const startColorValue = getComputedStyle(document.documentElement).getPropertyValue(`--color-${startColor}`).trim();
      const endColorValue = getComputedStyle(document.documentElement).getPropertyValue(`--color-${endColor}`).trim();
      return { start: startColorValue, end: endColorValue };
    }
    const getRandomGradientPreset = (index) => {
      const gradients = [
        { start: '#00bcd466', end: '#ff6d6d66' },
        { start: '#8bc34a66', end: '#2196f366' },
        { start: '#03a9f466', end: '#ff6d6d66' },
        { start: '#ff6d6d66', end: '#00bcd466' },
        { start: '#8bc34a66', end: '#3f51b566' },
        { start: '#cddc3966', end: '#ff6d6d66' },
        { start: '#00968866', end: '#ff6d6d66' },
        { start: '#00bcd466', end: '#8bc34a66' },
        { start: '#3f51b566', end: '#88DFAB66' },
        { start: '#ff6d6d66', end: '#3f51b566' },
        { start: '#8bc34a66', end: '#ff6d6d66' },
      ];
      if (index) return gradients[index];
      return gradients[Math.floor(Math.random() * gradients.length)];
    };
    const setGradient = ({ start, end }) => {
      document.documentElement.style.setProperty('--color-start', start);
      document.documentElement.style.setProperty('--color-end', end);
      // document.documentElement.style.setProperty('--gradient-start', `${Math.random()*10+10}%`);
      // document.documentElement.style.setProperty('--gradient-end', `${Math.random()*10+80}%`);
      // document.documentElement.style.setProperty('--gradient-angle', `${Math.random() * 20 + 130}deg`);
    }
    setGradient(getRandomGradientPreset());
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <main className='main grid items-center justify-center h-full overflow-hidden tracking-wide'>
        <AnimatePresence initial={false} mode='wait'>
          <Routes location={location} key={location.key}>
            {/* <Route path="/home" element={isLoggedIn ? <Home /> : <Lock />} /> */}
            {/* <ProtectedRoute path="/home" element={Home} /> */}
            <Route key="home" path="/" element={<AnimPage page={Home} variants={scale} />} />
            <Route key="lock" path="/lock" element={<AnimPage page={Lock} variants={slide} />} />
            {Apps.map(
              app =>
                <Route
                  key={app.path}
                  path={app.path}
                  element={<AnimPage
                    page={app.Component}
                    pageProps={app.ComponentProps}
                    variants={app.variants}
                  />}
                />
            )}
          </Routes>
        </AnimatePresence>
      </main>
    </AuthContext.Provider >
  )
}
export default App
