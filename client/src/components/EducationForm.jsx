import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

const EducationForm = ({ data, onChange }) => {
    const [expandedIndex, setExpandedIndex] = useState(data.length > 0 ? 0 : -1)

    const addEducation = () => {
        const newEducation = { institution: '', degree: '', field: '', graduation_date: '', gpa: '' }
        onChange([...data, newEducation])
        setExpandedIndex(data.length)
    }

    const removeEducation = (index) => {
        onChange(data.filter((_, i) => i !== index))
        if (expandedIndex === index) setExpandedIndex(-1)
        else if (expandedIndex > index) setExpandedIndex(expandedIndex - 1)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-slate-500'>Add your educational background</p>
                <button onClick={addEducation} className='flex items-center gap-1.5 text-xs font-semibold text-indigo-600 px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors'>
                    <Plus className='size-3.5' /> Add
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <GraduationCap className='size-10 mx-auto mb-3 text-slate-300' />
                    <p className='text-sm font-medium text-slate-500'>No education added</p>
                    <p className='text-xs text-slate-400 mt-1'>Click "Add" to include your education</p>
                </div>
            ) : (
                <div className='space-y-3'>
                    {data.map((education, index) => (
                        <div key={index} className='border border-slate-100 rounded-xl overflow-hidden bg-white shadow-xs'>
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                                className='w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left'
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 text-xs font-bold">{index + 1}</div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-700'>{education.degree || education.institution || `Education #${index + 1}`}</p>
                                        <p className='text-xs text-slate-400'>{education.institution && education.degree ? education.institution : 'Click to expand'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={(e) => { e.stopPropagation(); removeEducation(index) }} className='p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition'>
                                        <Trash2 className='size-3.5' />
                                    </button>
                                    {expandedIndex === index ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                                </div>
                            </button>

                            {expandedIndex === index && (
                                <div className='px-4 pb-4 space-y-3 border-t border-slate-50 animate-fadeIn'>
                                    <div className='grid sm:grid-cols-2 gap-3 mt-3'>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Institution</label>
                                            <input type="text" placeholder='University name' className='w-full px-3 py-2.5 text-sm' value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Degree</label>
                                            <input type="text" placeholder="e.g., Bachelor's" className='w-full px-3 py-2.5 text-sm' value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Field of Study</label>
                                            <input type="text" placeholder='e.g., Computer Science' className='w-full px-3 py-2.5 text-sm' value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Graduation Date</label>
                                            <input type="month" className='w-full px-3 py-2.5 text-sm' value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-600 mb-1 block">GPA (optional)</label>
                                        <input type="text" placeholder='e.g., 3.8/4.0' className='w-full sm:w-1/2 px-3 py-2.5 text-sm' value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EducationForm