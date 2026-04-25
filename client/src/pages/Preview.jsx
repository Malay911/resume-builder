import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, DownloadIcon, FileText } from 'lucide-react'
import api from '../configs/api'
import SuccessAnimation from '../components/SuccessAnimation'
import logo from '../assets/logo.svg'

const Preview = () => {
  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadResume() }, [])

  return resumeData ? (
    <div className="min-h-screen" style={{ background: 'var(--bg-body)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="ResumeAI logo" className="h-7 w-auto" />
            </a>
          </div>
          <button onClick={() => { window.print(); setShowSuccess(true) }} className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5">
            <DownloadIcon className="size-3.5" /> Download PDF
          </button>
        </div>
      </div>

      <div className='max-w-3xl mx-auto py-8 px-4'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white shadow-sm' />
      </div>

      <SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="size-2.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="size-2.5 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-slate-400">Loading resume...</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center text-center px-4'>
          <div className="flex items-center justify-center size-20 rounded-2xl bg-slate-100 mb-5">
            <FileText className="size-9 text-slate-300" />
          </div>
          <h2 className='text-2xl font-bold text-slate-800'>Resume not found</h2>
          <p className='text-sm text-slate-500 mt-2 max-w-sm'>This resume may be private or the link might be incorrect.</p>
          <a href="/" className='btn-primary px-6 py-2.5 text-sm mt-6 inline-flex items-center gap-2'>
            <ArrowLeftIcon className='size-4' /> Go Home
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview