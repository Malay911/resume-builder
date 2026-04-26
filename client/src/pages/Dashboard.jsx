import { FilePenLineIcon, Loader, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, Clock, FileText, Sparkles, ArrowRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import SuccessAnimation from '../components/SuccessAnimation'
import ResumePreviewCard from '../components/ResumePreviewCard'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [emptyLottie, setEmptyLottie] = useState(null)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const navigate = useNavigate()

  // Subtle greyscale patterns for resume card accents
  const cardAccents = [
    'from-neutral-800 to-neutral-600',
    'from-neutral-700 to-neutral-500',
    'from-neutral-900 to-neutral-700',
    'from-neutral-600 to-neutral-400',
    'from-black to-neutral-600',
  ]

  useEffect(() => {
    // Fetch premium Lottie JSON for Empty State directly
    fetch('https://fonts.gstatic.com/s/e/notoemoji/latest/1f4dd/lottie.json')
      .then(res => res.json())
      .then(data => setEmptyLottie(data))
      .catch(err => console.error("Failed to load generic empty lottie", err))
  }, [])

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setPageLoading(false)
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      setShowSuccess(true)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
      setShowSuccess(true)
      setDeleteConfirmId(null)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  const getTimeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 7) return `${days}d ago`
    return new Date(dateStr).toLocaleDateString()
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-[calc(100vh-57px)] relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
      {/* Subtle neutral floating orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute top-20 -left-20 w-96 h-96 bg-neutral-200/30 blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute bottom-20 -right-20 w-[40rem] h-[40rem] bg-neutral-200/20 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-5 py-8 relative z-10">

        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-bold text-black">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Create, manage, and download your professional resumes.</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 mt-8"
        >
          {/* Create New */}
          <motion.button
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateResume(true)}
            className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 shadow-sm hover:shadow-lg border border-dashed border-neutral-200 bg-white hover:border-black/30"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 bg-black blur-2xl group-hover:opacity-10 transition" />
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="flex items-center justify-center size-11 rounded-xl shadow-md mb-4"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
              >
                <PlusIcon className="size-5 text-white" />
              </motion.div>
              <h3 className="font-semibold text-black text-base">Create New Resume</h3>
              <p className="text-sm text-neutral-400 mt-1">Start from scratch with a blank template</p>
            </div>
          </motion.button>

          {/* Upload Existing */}
          <motion.button
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowUploadResume(true)}
            className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 shadow-sm hover:shadow-lg border border-dashed border-neutral-200 bg-white hover:border-black/30"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 bg-black blur-2xl group-hover:opacity-10 transition" />
            <div className="relative">
              <div className="flex items-center justify-center size-11 rounded-xl shadow-md mb-4"
                style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}>
                <UploadCloudIcon className="size-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-black text-base">Upload Existing Resume</h3>
              <p className="text-sm text-neutral-400 mt-1">Import a PDF and enhance with AI</p>
            </div>
          </motion.button>
        </motion.div>

        {/* Resumes Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FileText className="size-5 text-black" />
              Your Resumes
              {allResumes.length > 0 && (
                <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full shadow-inner">{allResumes.length}</span>
              )}
            </h2>
          </div>

          {pageLoading ? (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <motion.div variants={itemVariants} key={i} className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-neutral-100 shadow-sm">
                  <div className="skeleton h-4 w-3/4 mb-3 opacity-70" />
                  <div className="skeleton h-3 w-1/2 mb-6 opacity-60" />
                  <div className="skeleton h-24 w-full rounded-xl opacity-50" />
                </motion.div>
              ))}
            </motion.div>
          ) : allResumes.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-center mx-auto mb-2">
                {emptyLottie ? (
                  <div className="size-28 opacity-80 mix-blend-multiply drop-shadow-sm">
                    <Lottie animationData={emptyLottie} loop={true} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center size-20 rounded-3xl bg-neutral-50 text-neutral-400 mt-2 mb-4">
                    <FileText className="size-10" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-black text-lg">Start building your first resume</h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto">Stand out to recruiters by creating a beautifully structured, AI-enhanced resume.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreateResume(true)} className="btn-primary px-7 py-3 text-sm mt-6 inline-flex items-center gap-2" style={{ boxShadow: '0 4px 20px rgba(99,102,241,0.25)' }}>
                <PlusIcon className="size-4" /> Create Resume
              </motion.button>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allResumes.map((resume, index) => {
                const accent = cardAccents[index % cardAccents.length]
                return (
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    key={resume._id}
                    className="card-interactive bg-white/90 backdrop-blur-md group rounded-2xl overflow-hidden cursor-pointer shadow-sm relative"
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                  >
                    {/* Monochrome accent top bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${accent}`} />

                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-black text-[15px] truncate group-hover:text-neutral-600 transition-colors drop-shadow-sm">{resume.title}</h3>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-400 font-medium">
                            <Clock className="size-3.5 opacity-70" />
                            <span>{getTimeAgo(resume.updatedAt)}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 backdrop-blur-sm rounded-lg p-0.5 shadow-sm border border-neutral-100">
                          <button
                            onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                            className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                            title="Rename"
                          >
                            <PencilIcon className="size-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(resume._id) }}
                            className="p-1.5 rounded-md hover:bg-red-50 text-neutral-500 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <TrashIcon className="size-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Document Preview */}
                      <ResumePreviewCard accent={accent} resume={resume} />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </motion.div>
      </div>

      <SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} />

      {/* ===== MODALS ===== */}

      {/* Create Resume Modal */}
      {showCreateResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'var(--bg-overlay)' }} onClick={() => setShowCreateResume(false)}>
          <motion.form initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onSubmit={createResume} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-xl font-bold text-black">Create a Resume</h2>
                <p className="text-sm text-neutral-500 mt-1">Give your resume a name to get started</p>
              </div>
              <button type="button" onClick={() => { setShowCreateResume(false); setTitle('') }} className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-400 hover:text-black transition bg-neutral-50">
                <XIcon className="size-5" />
              </button>
            </div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder='e.g. Senior Software Engineer'
              className='w-full px-5 py-3.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 transition-all font-medium text-black'
              required
              autoFocus
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='btn-primary w-full py-3.5 mt-5 text-[15px] flex items-center justify-center gap-2'>
              <Sparkles className="size-4" />
              Create Document
            </motion.button>
          </motion.form>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'var(--bg-overlay)' }} onClick={() => setShowUploadResume(false)}>
          <motion.form initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onSubmit={uploadResume} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-xl font-bold text-black">Upload Data</h2>
                <p className="text-sm text-neutral-500 mt-1">Import a PDF and let AI parse it</p>
              </div>
              <button type="button" onClick={() => { setShowUploadResume(false); setTitle('') }} className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-400 hover:text-black transition bg-neutral-50">
                <XIcon className="size-5" />
              </button>
            </div>

            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Resume title' className='w-full px-5 py-3.5 text-sm mb-5 rounded-xl border border-neutral-200 bg-neutral-50 transition-all font-medium text-black' required />

            <label htmlFor="resume-input" className="block cursor-pointer">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${resume ? 'border-black bg-neutral-50 shadow-inner' : 'border-neutral-200 hover:border-black/30 hover:bg-neutral-50'}`}>
                {resume ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="size-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-3">
                      <FileText className="size-6 text-black" />
                    </div>
                    <p className="text-sm font-semibold text-black">{resume.name}</p>
                    <p className="text-xs text-neutral-400 mt-1 font-medium">Click to change PDF</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="size-14 rounded-full bg-neutral-100 flex items-center justify-center mb-1">
                      <UploadCloud className="size-7 text-neutral-400 stroke-[1.5]" />
                    </div>
                    <p className="text-sm text-neutral-600 font-medium mt-1">Drop your PDF here or <span className="text-black font-semibold">browse</span></p>
                    <p className="text-xs text-neutral-400 mt-0.5">Maximum file size 5MB</p>
                  </>
                )}
              </motion.div>
            </label>
            <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />

            <motion.button whileHover={!isLoading ? { scale: 1.02 } : {}} whileTap={!isLoading ? { scale: 0.98 } : {}} disabled={isLoading} className='btn-primary w-full py-3.5 mt-5 text-[15px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'>
              {isLoading && <LoaderCircleIcon className='animate-spin size-5' />}
              {isLoading ? 'Processing with AI...' : 'Upload & Parse'}
            </motion.button>
          </motion.form>
        </div>
      )}

      {/* Edit Title Modal */}
      {editResumeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'var(--bg-overlay)' }} onClick={() => setEditResumeId('')}>
          <motion.form initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onSubmit={editTitle} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-xl font-bold text-black">Rename File</h2>
              </div>
              <button type="button" onClick={() => { setEditResumeId(''); setTitle('') }} className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-400 hover:text-black transition bg-neutral-50">
                <XIcon className="size-5" />
              </button>
            </div>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter new title' className='w-full px-5 py-3.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 transition-all font-medium text-black' required autoFocus />
          </motion.form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'var(--bg-overlay)' }} onClick={() => setDeleteConfirmId(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl text-center">
            <div className="size-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <TrashIcon className="size-7 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Delete Resume?</h2>
            <p className="text-sm text-neutral-500 mb-8">Are you sure you want to delete this resume? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3.5 px-4 text-[15px] font-semibold text-neutral-700 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => deleteResume(deleteConfirmId)} className="flex-1 py-3.5 px-4 text-[15px] font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-md shadow-red-500/20 transition-all">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Dashboard