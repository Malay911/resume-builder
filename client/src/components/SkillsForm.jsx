import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {
    const [newskill, setNewSkill] = useState('')

    const addSkill = () => {
        if (newskill.trim() && !data.includes(newskill.trim())) {
            onChange([...data, newskill.trim()])
            setNewSkill('')
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addSkill() }
    }

    return (
        <div className='space-y-4'>
            <p className='text-sm text-slate-500'>Add your technical and soft skills</p>

            {/* Input */}
            <div className='flex gap-2'>
                <input
                    type="text"
                    placeholder='Type a skill and press Enter...'
                    className='flex-1 px-3.5 py-2.5 text-sm'
                    onChange={(e) => setNewSkill(e.target.value)}
                    value={newskill}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className='btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5 disabled:opacity-40'
                    onClick={addSkill}
                    disabled={!newskill.trim()}
                >
                    <Plus className='size-3.5' /> Add
                </button>
            </div>

            {/* Skills Tags */}
            {data.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {data.map((skill, index) => (
                        <span key={index} className='inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100 transition-all duration-200 hover:bg-indigo-100'>
                            {skill}
                            <button className='p-0.5 hover:bg-indigo-200 rounded transition-colors' onClick={() => removeSkill(index)}>
                                <X className='size-3' />
                            </button>
                        </span>
                    ))}
                </div>
            ) : (
                <div className='text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <Sparkles className='size-9 mx-auto mb-3 text-slate-300' />
                    <p className='text-sm font-medium text-slate-500'>No skills added yet</p>
                    <p className='text-xs text-slate-400 mt-1'>Type a skill above and press Enter</p>
                </div>
            )}

            {/* Tip */}
            <div className='flex items-start gap-2.5 p-3.5 bg-indigo-50 rounded-xl border border-indigo-100'>
                <span className="text-sm">💡</span>
                <p className='text-xs text-indigo-600 leading-relaxed'>
                    <strong>Tip:</strong> Add 8–12 relevant skills. Include both technical skills (JavaScript, React, Python) and soft skills (leadership, communication).
                </p>
            </div>
        </div>
    )
}

export default SkillsForm