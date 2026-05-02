import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User, Save, Check, Layers, PanelRightClose, PanelRight } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import SuccessAnimation from '../components/SuccessAnimation'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '', title: '', personal_info: {}, professional_summary: '',
    experience: [], education: [], project: [], skills: [],
    template: "classic", accent_color: "#3B82F6", public: false
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User, description: "Name, contact, photo" },
    { id: "summary", name: "Summary", icon: FileText, description: "Professional summary" },
    { id: "experience", name: "Experience", icon: Briefcase, description: "Work history" },
    { id: "education", name: "Education", icon: GraduationCap, description: "Degrees & certs" },
    { id: "projects", name: "Projects", icon: FolderIcon, description: "Key projects" },
    { id: "skills", name: "Skills", icon: Sparkles, description: "Technical & soft skills" },
  ]

  const activeSection = sections[activeSectionIndex]
  const progress = ((activeSectionIndex + 1) / sections.length) * 100

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        setRemoveBackground(data.resume.personal_info?.removeBackground || false)
        document.title = data.resume.title
        setIsLoaded(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { loadExistingResume() }, [resumeId])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) { console.error("Error saving resume:", error) }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app')[0]
    const resumeUrl = frontendUrl + "/view/" + resumeId
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    } else {
      navigator.clipboard.writeText(resumeUrl)
      toast.success('Link copied to clipboard!')
    }
  }

  const downloadResume = () => {
    window.print()
  }

  const saveResume = async () => {
    setIsSaving(true)
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }
      updatedResumeData.personal_info.removeBackground = removeBackground
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updatedResumeData))
      const hasNewImage = typeof resumeData.personal_info.image === 'object'
      const changedToggle = removeBackground && !resumeData.personal_info?.removeBackground
      if (removeBackground && (hasNewImage || changedToggle)) {
        formData.append("removeBackground", "yes")
      }
      hasNewImage && formData.append("image", resumeData.personal_info.image)
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      setShowSuccess(true)
    } catch (error) { console.error("Error saving resume:", error) }
    setIsSaving(false)
  }

  if (!isLoaded) return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-57px)] gap-3' style={{ background: 'var(--bg-body)' }}>
      <div className="flex items-center gap-1.5">
        <div className="size-2.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="size-2.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="size-2.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <p className="text-sm text-neutral-400">Loading your resume...</p>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-57px)]" style={{ background: 'var(--bg-body)' }}>
      {/* Top bar */}
      <div className="sticky top-[57px] z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to='/app' className="btn-ghost p-2 rounded-lg">
              <ArrowLeftIcon className="size-4" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-black truncate max-w-[200px]">{resumeData.title}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-neutral-400">Step {activeSectionIndex + 1} of {sections.length}</span>
                <div className="w-20 h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
            <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />

            <div className="hidden sm:block w-px h-6 bg-neutral-200 mx-1" />

            <button onClick={() => setShowPreview(!showPreview)} className="btn-ghost p-2 rounded-lg hidden lg:flex items-center gap-1 text-xs" title={showPreview ? 'Hide preview' : 'Show preview'}>
              {showPreview ? <PanelRightClose className="size-4" /> : <PanelRight className="size-4" />}
            </button>

            <button onClick={saveResume} disabled={isSaving} className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 disabled:opacity-60">
              {isSaving ? <div className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="size-3.5" />}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto flex">
        {/* Left Sidebar — Step Navigation */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 p-4 pt-6 sticky top-[113px] h-[calc(100vh-113px)]">
          <nav className="space-y-1">
            {sections.map((section, index) => {
              const Icon = section.icon
              const isActive = index === activeSectionIndex
              const isCompleted = index < activeSectionIndex
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionIndex(index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${isActive ? 'bg-black/5 border border-black/10' : 'hover:bg-neutral-50 border border-transparent'}`}
                >
                  <div className={`flex items-center justify-center size-8 rounded-lg transition-all duration-200 ${isActive ? 'text-white shadow-sm' : isCompleted ? 'bg-neutral-100 text-neutral-600' : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'}`}
                    style={isActive ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' } : {}}>
                    {isCompleted ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${isActive ? 'text-black' : 'text-neutral-700'}`}>{section.name}</p>
                    <p className="text-[10px] text-neutral-400">{section.description}</p>
                  </div>
                </button>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="mt-auto space-y-2 pt-4 border-t border-neutral-100">
            <button onClick={changeResumeVisibility} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-black transition">
              {resumeData.public ? <EyeIcon className="size-3.5" /> : <EyeOffIcon className="size-3.5" />}
              {resumeData.public ? 'Public' : 'Private'}
            </button>
            {resumeData.public && (
              <button onClick={handleShare} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-black transition">
                <Share2Icon className="size-3.5" /> Share
              </button>
            )}
            <button onClick={downloadResume} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-black hover:bg-neutral-100 transition">
              <DownloadIcon className="size-3.5" /> Download PDF
            </button>
          </div>
        </aside>

        {/* Main Content — Form */}
        <main className={`flex-1 min-w-0 p-4 md:p-6 transition-all duration-300 ${showPreview ? 'lg:max-w-[50%]' : ''}`}>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs p-6 md:p-8 animate-fadeIn" key={activeSection.id}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-10 rounded-xl shadow-sm"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
                {React.createElement(activeSection.icon, { className: "size-5 text-white" })}
              </div>
              <div>
                <h2 className="text-lg font-bold text-black">{activeSection.name}</h2>
                <p className="text-xs text-neutral-400">{activeSection.description}</p>
              </div>
            </div>

            {/* Form content */}
            {activeSection.id === "personal" && (
              <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
            )}
            {activeSection.id === "summary" && (
              <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
            )}
            {activeSection.id === "experience" && (
              <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
            )}
            {activeSection.id === "education" && (
              <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
            )}
            {activeSection.id === "projects" && (
              <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
            )}
            {activeSection.id === "skills" && (
              <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
            )}

            {/* Step Navigation (Bottom) */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
              <button
                onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                disabled={activeSectionIndex === 0}
                className="btn-secondary px-4 py-2.5 text-sm flex items-center gap-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="size-4" /> Previous
              </button>

              {/* Mobile: step dots */}
              <div className="flex items-center gap-1.5 md:hidden">
                {sections.map((_, i) => (
                  <div key={i} className={`rounded-full transition-all duration-300 ${i === activeSectionIndex ? 'w-5 h-1.5 bg-black' : i < activeSectionIndex ? 'size-1.5 bg-neutral-400' : 'size-1.5 bg-neutral-200'}`} />
                ))}
              </div>

              {activeSectionIndex < sections.length - 1 ? (
                <button
                  onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                  className="btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              ) : (
                <button onClick={async () => { await saveResume(); }} className="btn-primary px-4 py-2.5 text-sm flex items-center gap-1.5">
                  <Save className="size-4" /> Finish & Save
                </button>
              )}
            </div>
          </div>

          {/* Mobile Preview Toggle */}
          <div className="lg:hidden mt-4">
            <button onClick={() => setShowPreview(!showPreview)} className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
              {showPreview ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            {showPreview && (
              <div className="mt-4 animate-fadeIn">
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
              </div>
            )}
          </div>
        </main>

        {/* Right Panel — Live Preview (Desktop)
             Always rendered in the DOM so #resume-preview exists for window.print().
             Visually collapsed via CSS (w-0 / overflow-hidden) when toggled off. */}
        <aside
          className={`hidden lg:block shrink-0 p-4 pt-6 sticky top-[113px] h-[calc(100vh-113px)] overflow-y-auto transition-all duration-300 print:block print:w-auto print:p-0 print:static print:h-auto print:overflow-visible ${
            showPreview
              ? 'w-[50%] opacity-100'
              : 'w-0 p-0 opacity-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </aside>
      </div>

      <SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} />
    </div>
  )
}

export default ResumeBuilder