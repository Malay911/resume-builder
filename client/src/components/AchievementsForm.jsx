import { Plus, Trophy, X } from 'lucide-react'
import React, { useState } from 'react'

const AchievementsForm = ({ data, onChange }) => {
    const [newAchievement, setNewAchievement] = useState('')

    const addAchievement = () => {
        if (newAchievement.trim() && !data.includes(newAchievement.trim())) {
            onChange([...data, newAchievement.trim()])
            setNewAchievement('')
        }
    }

    const removeAchievement = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addAchievement() }
    }

    return (
        <div className='space-y-4'>
            <p className='text-sm text-slate-500'>Add your achievements & activities</p>

            {/* Input */}
            <div className='flex gap-2'>
                <input
                    type="text"
                    placeholder='Type an achievement and press Enter...'
                    className='flex-1 px-3.5 py-2.5 text-sm'
                    onChange={(e) => setNewAchievement(e.target.value)}
                    value={newAchievement}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className='btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5 disabled:opacity-40'
                    onClick={addAchievement}
                    disabled={!newAchievement.trim()}
                >
                    <Plus className='size-3.5' /> Add
                </button>
            </div>

            {/* Achievements List */}
            {data.length > 0 ? (
                <div className='space-y-2'>
                    {data.map((achievement, index) => (
                        <div key={index} className='flex items-center justify-between gap-2 pl-3.5 pr-1.5 py-2 bg-emerald-50 text-emerald-800 rounded-lg text-sm font-medium border border-emerald-100 transition-all duration-200 hover:bg-emerald-100'>
                            <span className='flex items-center gap-2'>
                                <Trophy className='size-3.5 shrink-0' />
                                {achievement}
                            </span>
                            <button className='p-0.5 hover:bg-emerald-200 rounded transition-colors shrink-0' onClick={() => removeAchievement(index)}>
                                <X className='size-3' />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <Trophy className='size-9 mx-auto mb-3 text-slate-300' />
                    <p className='text-sm font-medium text-slate-500'>No achievements added yet</p>
                    <p className='text-xs text-slate-400 mt-1'>Type an achievement above and press Enter</p>
                </div>
            )}

            {/* Tip */}
            <div className='flex items-start gap-2.5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100'>
                <span className="text-sm">🏆</span>
                <p className='text-xs text-emerald-700 leading-relaxed'>
                    <strong>Tip:</strong> Include hackathons, competitions, awards, and extracurricular activities with dates and organizers.
                </p>
            </div>
        </div>
    )
}

export default AchievementsForm
