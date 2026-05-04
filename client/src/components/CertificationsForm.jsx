import { Plus, Award, X } from 'lucide-react'
import React, { useState } from 'react'

const CertificationsForm = ({ data, onChange }) => {
    const [newCert, setNewCert] = useState('')

    const addCert = () => {
        if (newCert.trim() && !data.includes(newCert.trim())) {
            onChange([...data, newCert.trim()])
            setNewCert('')
        }
    }

    const removeCert = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addCert() }
    }

    return (
        <div className='space-y-4'>
            <p className='text-sm text-slate-500'>Add your certifications (e.g. "AWS Solutions Architect – Amazon")</p>

            {/* Input */}
            <div className='flex gap-2'>
                <input
                    type="text"
                    placeholder='Type a certification and press Enter...'
                    className='flex-1 px-3.5 py-2.5 text-sm'
                    onChange={(e) => setNewCert(e.target.value)}
                    value={newCert}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className='btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5 disabled:opacity-40'
                    onClick={addCert}
                    disabled={!newCert.trim()}
                >
                    <Plus className='size-3.5' /> Add
                </button>
            </div>

            {/* Certifications List */}
            {data.length > 0 ? (
                <div className='space-y-2'>
                    {data.map((cert, index) => (
                        <div key={index} className='flex items-center justify-between gap-2 pl-3.5 pr-1.5 py-2 bg-amber-50 text-amber-800 rounded-lg text-sm font-medium border border-amber-100 transition-all duration-200 hover:bg-amber-100'>
                            <span className='flex items-center gap-2'>
                                <Award className='size-3.5 shrink-0' />
                                {cert}
                            </span>
                            <button className='p-0.5 hover:bg-amber-200 rounded transition-colors shrink-0' onClick={() => removeCert(index)}>
                                <X className='size-3' />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <Award className='size-9 mx-auto mb-3 text-slate-300' />
                    <p className='text-sm font-medium text-slate-500'>No certifications added yet</p>
                    <p className='text-xs text-slate-400 mt-1'>Type a certification above and press Enter</p>
                </div>
            )}

            {/* Tip */}
            <div className='flex items-start gap-2.5 p-3.5 bg-amber-50 rounded-xl border border-amber-100'>
                <span className="text-sm">📜</span>
                <p className='text-xs text-amber-700 leading-relaxed'>
                    <strong>Tip:</strong> Include the certification name, issuing organization, and platform. E.g. "Machine Learning Specialization – Coursera (Stanford University)"
                </p>
            </div>
        </div>
    )
}

export default CertificationsForm
