"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { FiPause, FiPlay } from "react-icons/fi"

// three.js only loads on pages that use this backdrop (New Article).
const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false })

const STORAGE_KEY = "cms-hyperspeed"

/**
 * Animated light-trail background in the brand palette, fixed behind the
 * page content (to the right of the sidebar). It plays by default (the
 * owner asked for it even with reduced motion on); the corner button pauses
 * it, and the choice is remembered in this browser.
 */
export default function HyperspeedBackdrop() {
  // Remembered choice, read once (the component never renders on the server).
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "off"
    } catch {
      return true
    }
  })

  const toggle = () => {
    setOn((v) => {
      try {
        localStorage.setItem(STORAGE_KEY, v ? "off" : "on")
      } catch {}
      return !v
    })
  }

  return (
    <>
      <div className="fixed inset-0 lg:left-64 top-16 z-0 bg-[#0F1F16]" aria-hidden="true">
        {on && (
          <Hyperspeed
            curve="gentle"
            speed={1}
            density={60}
            trailLength={1.5}
            lightSize={1.4}
            roadWidth={14}
            glow={1}
            background="#0F1F16"
            roadColor="#0B1710"
            lineColor="#3B8F7B"
            tailColors={["#3B8F7B", "#2C6E5E", "#EAF3E7"]}
            headColors={["#A7F432", "#D9FF8F", "#EAF3E7"]}
            poleColors={["#3B8F7B"]}
            interactive={false}
            className="absolute inset-0"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,31,22,0),rgba(15,31,22,0.35))]" />
      </div>
      <button
        type="button"
        onClick={toggle}
        className="cms-raw fixed bottom-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
        aria-label={on ? "Pause background animation" : "Play background animation"}
        title={on ? "Pause background" : "Play background"}
      >
        {on ? <FiPause size={15} /> : <FiPlay size={15} />}
      </button>
    </>
  )
}
