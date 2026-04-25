import { Briefcase, Loader2, Plus, Sparkles, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({ data, onChange }) => {
    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)
    const [expandedIndex, setExpandedIndex] = useState(data.length > 0 ? 0 : -1)

    const addExperience = () => {
        const newExperience = {
            company: '', position: '', start_date: '', end_date: '', description: '', is_current: false
        }
        onChange([...data, newExperience])
        setExpandedIndex(data.length)
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
        if (expandedIndex === index) setExpandedIndex(-1)
        else if (expandedIndex > index) setExpandedIndex(expandedIndex - 1)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`
        try {
            const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
            updateExperience(index, "description", data.enhancedContent)
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to enhance description')
        } finally {
            setGeneratingIndex(-1)
        }
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm text-slate-500'>Add your relevant work experience</p>
                </div>
                <button onClick={addExperience} className='flex items-center gap-1.5 text-xs font-semibold text-indigo-600 px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors'>
                    <Plus className='size-3.5' /> Add
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <Briefcase className='size-10 mx-auto mb-3 text-slate-300' />
                    <p className='text-sm font-medium text-slate-500'>No work experience added</p>
                    <p className='text-xs text-slate-400 mt-1'>Click "Add" to get started</p>
                </div>
            ) : (
                <div className='space-y-3'>
                    {data.map((experience, index) => (
                        <div key={index} className='border border-slate-100 rounded-xl overflow-hidden bg-white shadow-xs'>
                            {/* Collapse header */}
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setExpandedIndex(expandedIndex === index ? -1 : index);
                                    }
                                }}
                                className='w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-700'>{experience.position || experience.company || `Experience #${index + 1}`}</p>
                                        <p className='text-xs text-slate-400'>{experience.company && experience.position ? experience.company : 'Click to expand'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={(e) => { e.stopPropagation(); removeExperience(index) }} className='p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition'>
                                        <Trash2 className='size-3.5' />
                                    </button>
                                    {expandedIndex === index ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                                </div>
                            </div>

                            {/* Expanded content */}
                            {expandedIndex === index && (
                                <div className='px-4 pb-4 space-y-3 border-t border-slate-50 animate-fadeIn'>
                                    <div className='grid sm:grid-cols-2 gap-3 mt-3'>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Company</label>
                                            <input type="text" placeholder='Company name' className='w-full px-3 py-2.5 text-sm' value={experience.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Job Title</label>
                                            <input type="text" placeholder='Position title' className='w-full px-3 py-2.5 text-sm' value={experience.position || ""} onChange={(e) => updateExperience(index, "position", e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Start Date</label>
                                            <input type="month" className='w-full px-3 py-2.5 text-sm' value={experience.start_date || ""} onChange={(e) => updateExperience(index, "start_date", e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-600 mb-1 block">End Date</label>
                                            <input type="month" className='w-full px-3 py-2.5 text-sm disabled:bg-slate-50 disabled:text-slate-400' disabled={experience.is_current} value={experience.end_date || ""} onChange={(e) => updateExperience(index, "end_date", e.target.value)} />
                                        </div>
                                    </div>

                                    <label className='flex items-center gap-2 cursor-pointer'>
                                        <input type="checkbox" checked={experience.is_current || false} onChange={(e) => updateExperience(index, "is_current", e.target.checked)} className='rounded border-slate-300 text-indigo-600 focus:ring-indigo-500' />
                                        <span className='text-xs text-slate-600 font-medium'>Currently working here</span>
                                    </label>

                                    <div>
                                        <div className='flex items-center justify-between mb-1'>
                                            <label className='text-xs font-semibold text-slate-600'>Description</label>
                                            <button
                                                onClick={() => generateDescription(index)}
                                                disabled={generatingIndex === index || !experience.position || !experience.company}
                                                className='flex items-center gap-1 text-[11px] font-semibold text-purple-600 px-2.5 py-1 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-40'
                                            >
                                                {generatingIndex === index ? <Loader2 className='size-3 animate-spin' /> : <Sparkles className='size-3' />}
                                                Enhance with AI
                                            </button>
                                        </div>
                                        <textarea rows={4} value={experience.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} className='w-full text-sm px-3.5 py-2.5' placeholder='Describe your responsibilities and achievements...' />
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

export default ExperienceForm