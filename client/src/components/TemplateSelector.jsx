import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        { id: "classic", name: "Classic", color: "from-blue-500 to-blue-600", description: "Traditional & professional" },
        { id: "modern", name: "Modern", color: "from-indigo-500 to-purple-600", description: "Sleek & contemporary" },
        { id: "minimal", name: "Minimal", color: "from-slate-500 to-slate-600", description: "Clean & focused" },
        { id: "minimal-image", name: "Photo", color: "from-emerald-500 to-teal-600", description: "With profile photo" },
    ]

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all px-3 py-2 rounded-lg border border-indigo-100'>
                <Layout size={13} /> <span className='max-sm:hidden'>Template</span>
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className='absolute top-full right-0 w-72 p-3 mt-2 z-50 bg-white rounded-xl border border-slate-200 shadow-xl animate-slideDown'>
                        <p className="text-xs font-semibold text-slate-500 mb-2 px-1">Choose Template</p>
                        <div className="grid grid-cols-2 gap-2">
                            {templates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => { onChange(template.id); setIsOpen(false) }}
                                    className={`relative p-3 rounded-xl text-left transition-all duration-200 border ${selectedTemplate === template.id ? 'border-indigo-300 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                                >
                                    {selectedTemplate === template.id && (
                                        <div className="absolute top-2 right-2 size-4 bg-indigo-500 rounded-full flex items-center justify-center">
                                            <Check className="size-2.5 text-white" />
                                        </div>
                                    )}
                                    <div className={`h-8 w-full rounded-lg bg-gradient-to-br ${template.color} opacity-75 mb-2`} />
                                    <p className="text-xs font-semibold text-slate-700">{template.name}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{template.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TemplateSelector