"use client"

import { Code, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl">MyProject</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-600 hover:text-slate-900 transition-colors">
                {item.label}
              </Link>
            ))}
            <button className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors font-medium">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu} />

          {/* Mobile Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors font-medium mt-4"
                onClick={closeMenu}
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
