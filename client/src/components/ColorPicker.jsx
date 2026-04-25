import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Orange", value: "#F97316" },
        { name: "Green", value: "#10B981" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Red", value: "#EF4444" },
        { name: "Gray", value: "#6B7280" },
        { name: "Dark", value: "#1F2937" },
    ]

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1.5 text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 transition-all px-3 py-2 rounded-lg border border-purple-100'>
                <div className="size-3 rounded-full shadow-sm border border-white" style={{ backgroundColor: selectedColor }} />
                <span className='max-sm:hidden'>Color</span>
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className='absolute top-full right-0 w-56 p-3 mt-2 z-50 bg-white rounded-xl border border-slate-200 shadow-xl animate-slideDown'>
                        <p className="text-xs font-semibold text-slate-500 mb-2.5 px-0.5">Accent Color</p>
                        <div className="grid grid-cols-5 gap-2.5">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    className='relative group flex flex-col items-center'
                                    onClick={() => { onChange(color.value); setIsOpen(false) }}
                                    title={color.name}
                                >
                                    <div className={`size-8 rounded-full transition-all duration-200 group-hover:scale-110 ${selectedColor === color.value ? 'ring-2 ring-offset-2' : ''}`} style={{ backgroundColor: color.value, ringColor: color.value }}>
                                        {selectedColor === color.value && (
                                            <div className="flex items-center justify-center h-full">
                                                <Check className='size-3.5 text-white' />
                                            </div>
                                        )}
                                    </div>
                                    <p className='text-[9px] text-slate-400 mt-1 font-medium'>{color.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ColorPicker