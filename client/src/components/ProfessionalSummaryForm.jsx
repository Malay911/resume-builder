import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

    const{token} =useSelector(state=>state.auth)
    const [isGenerating,setIsGenerating]=useState(false)
    const generateSummary=async()=>{
        try {
            setIsGenerating(true)
            const prompt=`Enhance my professional summary "${data}"`
            const response=await api.post('/api/ai/enhance-pro-sum',{userContent:prompt},{headers:{Authorization:token}})
            onChange(response.data.enhancedContent)
            toast.success('Summary enhanced successfully!')
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        finally{
            setIsGenerating(false)
        }
    }
  return (
    <div className='space y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex item-center gap-2 text-lg gont-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary for resume here</p>
            </div>
            <button disabled={isGenerating} onClick={ generateSummary} className='flex items-center gap-2 text-sm text-purple-700 px-3 py-1 bg-purple-100 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                {isGenerating?(<Loader2 className='size-4 animate-spin'/>):(<Sparkles className='size-4'/>)}
                {isGenerating?"Enhancing...":"AI Enhance"}
            </button>
        </div>

        <div className='mt-6'>
            <textarea rows={7} value={data||""} onChange={(e)=>onChange(e.target.value)} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'/>
            <p className='text-xs text-gray-500 max-w-4/5 max-auto text-center'>Tip: Keep it consise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm