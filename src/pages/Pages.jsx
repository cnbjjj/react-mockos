import React from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

function Pages() {
    const location = useLocation();
    return (
        <AnimatePresence initial={false} mode='wait'>
            <Routes>
                <Route key={location.path} path="/" element={<Home />} />
                <Route key={location.path} path="/lock" element={<Lock />} />
                <Route key={location.path} path='/user' element={<User />} />
            </Routes>
        </AnimatePresence>
    )
}
export default Pages