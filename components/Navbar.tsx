'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/theme-provider'
import { Moon, Sun, Menu, X } from 'lucide-react'

const navigation = [
  { name: '首页', href: '#home' },
  { name: '关于', href: '#about' },
  { name: '团队', href: '#team' },
  { name: '产品', href: '#products' },
  { name: '博客', href: '#blog' },
  { name: '联系', href: '#contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🦞</span>
            <span className="text-xl font-bold gradient-text">
              风沙一人创业公司
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900 pt-20 px-6">
          <div className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-xl text-gray-300 hover:text-white"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-lg"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>切换主题</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
