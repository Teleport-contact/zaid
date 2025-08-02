"use client"

import { Button } from "./ui/button"
// import { useSidebar } from "./ui/sidebar"

export function HamburgerButton() {

  return (
    <Button variant="ghost" className="w-8 h-8 p-0" aria-label="Toggle menu">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 9H27M5 16H27M16 23H27"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  )
}
