import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/authSlice'
import { LogOut, ChevronDown, FileText } from 'lucide-react'
import logo from '../assets/logo.svg'

const Navbar = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const logoutUser = () => {
        navigate('/')
        dispatch(logout())
    }

    const getInitials = (name) => {
        if (!name) return '?'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <header className="sticky top-0 z-50 glass" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-5 py-3">
                <Link to="/app" className="flex items-center gap-2.5 group">
                    <img src={logo} alt="ResumeForge logo" className="h-7 w-auto" />
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-full transition-all duration-200 hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
                    >
                        <div className="flex items-center justify-center size-8 rounded-full text-xs font-bold text-white"
                            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
                            {getInitials(user?.name)}
                        </div>
                        <span className="text-sm font-medium text-neutral-700 max-sm:hidden">{user?.name}</span>
                        <ChevronDown className={`size-3.5 text-neutral-400 transition-transform duration-200 max-sm:hidden ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-xl p-1.5 bg-white border border-neutral-200 shadow-xl animate-slideDown">
                            <div className="px-3 py-2.5 mb-1 border-b border-neutral-100">
                                <p className="text-sm font-semibold text-black">{user?.name}</p>
                                <p className="text-xs text-neutral-400 truncate mt-0.5">{user?.email}</p>
                            </div>
                            <button
                                onClick={logoutUser}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors duration-150 hover:bg-neutral-50 text-neutral-600 hover:text-black font-medium"
                            >
                                <LogOut className="size-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar