import { Plus, Languages, X, ChevronDown, Check } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

const proficiencyLevels = [
    { value: "Native", color: "#10b981" },
    { value: "Bilingual Proficiency", color: "#06b6d4" },
    { value: "Full Professional Proficiency", color: "#3b82f6" },
    { value: "Professional Working Proficiency", color: "#8b5cf6" },
    { value: "Limited Working Proficiency", color: "#f59e0b" },
    { value: "Elementary Proficiency", color: "#ef4444" },
]

const LanguagesForm = ({ data, onChange }) => {
    const [title, setTitle] = useState('')
    const [proficiency, setProficiency] = useState(proficiencyLevels[0].value)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const addLanguage = () => {
        if (title.trim()) {
            const exists = data.some(l => l.title.toLowerCase() === title.trim().toLowerCase())
            if (!exists) {
                onChange([...data, { title: title.trim(), proficiency }])
                setTitle('')
                setProficiency(proficiencyLevels[0].value)
            }
        }
    }

    const removeLanguage = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addLanguage() }
    }

    const selectedLevel = proficiencyLevels.find(l => l.value === proficiency) || proficiencyLevels[0]

    return (
        <div className='space-y-4'>
            <p className='text-sm text-slate-500'>Add languages you know and your proficiency level</p>

            {/* Input */}
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        placeholder='Language name...'
                        className='flex-1 min-w-0 px-3.5 py-2.5 text-sm'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className='btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5 disabled:opacity-40 shrink-0'
                        onClick={addLanguage}
                        disabled={!title.trim()}
                    >
                        <Plus className='size-3.5' /> Add
                    </button>
                </div>

                {/* Custom Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-200 text-left"
                        style={{
                            borderColor: isOpen ? 'var(--accent-blue)' : 'var(--border-light)',
                            background: 'var(--bg-card)',
                            boxShadow: isOpen ? '0 0 0 3px rgba(59, 130, 246, 0.12)' : 'none',
                        }}
                    >
                        <span className="flex items-center gap-2">
                            <span className="size-2 rounded-full shrink-0" style={{ background: selectedLevel.color }} />
                            <span className="font-medium text-neutral-800">{selectedLevel.value}</span>
                        </span>
                        <ChevronDown className={`size-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border shadow-lg overflow-hidden animate-slideDown"
                            style={{ borderColor: 'var(--border-light)', boxShadow: 'var(--shadow-lg)' }}>
                            {proficiencyLevels.map((level) => (
                                <button
                                    key={level.value}
                                    type="button"
                                    onClick={() => { setProficiency(level.value); setIsOpen(false) }}
                                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left transition-colors duration-150 ${
                                        proficiency === level.value
                                            ? 'bg-neutral-50 font-semibold text-black'
                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                                    }`}
                                >
                                    <span className="size-2 rounded-full shrink-0" style={{ background: level.color }} />
                                    <span className="flex-1">{level.value}</span>
                                    {proficiency === level.value && (
                                        <Check className="size-3.5 text-blue-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Languages List */}
            {data.length > 0 ? (
                <div className='space-y-2'>
                    {data.map((lang, index) => {
                        const langLevel = proficiencyLevels.find(l => l.value === lang.proficiency)
                        return (
                            <div key={index} className='flex items-center justify-between gap-2 pl-3.5 pr-1.5 py-2 bg-sky-50 text-sky-800 rounded-lg text-sm font-medium border border-sky-100 transition-all duration-200 hover:bg-sky-100'>
                                <span className='flex items-center gap-2'>
                                    <Languages className='size-3.5 shrink-0' />
                                    <span className='font-semibold'>{lang.title}</span>
                                    <span className='flex items-center gap-1 text-xs'>
                                        {langLevel && <span className="size-1.5 rounded-full" style={{ background: langLevel.color }} />}
                                        <span className='text-sky-500'>{lang.proficiency}</span>
                                    </span>
                                </span>
                                <button className='p-0.5 hover:bg-sky-200 rounded transition-colors shrink-0' onClick={() => removeLanguage(index)}>
                                    <X className='size-3' />
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <Languages className='size-9 mx-auto mb-3 text-slate-300' />
                    <p className='text-sm font-medium text-slate-500'>No languages added yet</p>
                    <p className='text-xs text-slate-400 mt-1'>Add a language with its proficiency level</p>
                </div>
            )}

            {/* Tip */}
            <div className='flex items-start gap-2.5 p-3.5 bg-sky-50 rounded-xl border border-sky-100'>
                <span className="text-sm">🌍</span>
                <p className='text-xs text-sky-700 leading-relaxed'>
                    <strong>Tip:</strong> List languages with accurate proficiency. Use "Native" for your mother tongue and appropriate levels for others.
                </p>
            </div>
        </div>
    )
}

export default LanguagesForm
