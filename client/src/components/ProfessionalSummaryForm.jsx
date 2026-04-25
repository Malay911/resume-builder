import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
    const { token } = useSelector(state => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)
    const charCount = data?.length || 0

    const generateSummary = async () => {
        try {
            setIsGenerating(true)
            const prompt = `Enhance my professional summary "${data}"`
            const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt }, { headers: { Authorization: token } })
            onChange(response.data.enhancedContent)
            toast.success('Summary enhanced!')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to enhance summary')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-slate-500'>A compelling summary of your professional background</p>
                <button
                    disabled={isGenerating || !data}
                    onClick={generateSummary}
                    className='flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 px-3 py-1.5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-40'
                >
                    {isGenerating ? <Loader2 className='size-3.5 animate-spin' /> : <Sparkles className='size-3.5' />}
                    {isGenerating ? "Enhancing..." : "Enhance with AI"}
                </button>
            </div>

            <div className="relative">
                <textarea
                    rows={6}
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className='w-full px-4 py-3 text-sm'
                    placeholder='Write a professional summary highlighting your key strengths, experience, and career goals...'
                />
                <div className="flex items-center justify-between mt-1.5">
                    <p className='text-[11px] text-slate-400'>
                        💡 Keep it concise — 3-4 sentences covering your strongest qualifications.
                    </p>
                    <span className={`text-[11px] font-medium ${charCount > 500 ? 'text-amber-500' : 'text-slate-400'}`}>
                        {charCount}/500
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm