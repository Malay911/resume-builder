import { BriefcaseBusiness, Github, Globe, Linkedin, Mail, MapPin, Phone, User, Camera } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true, placeholder: "e.g. John Doe" },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true, placeholder: "john@example.com" },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: false, placeholder: "+1 (555) 123-4567" },
        { key: "location", label: "Location", icon: MapPin, type: "text", required: false, placeholder: "San Francisco, CA" },
        { key: "profession", label: "Job Title", icon: BriefcaseBusiness, type: "text", placeholder: "Software Engineer" },
        { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url", placeholder: "linkedin.com/in/johndoe" },
        { key: "github", label: "GitHub", icon: Github, type: "text", placeholder: "johndoe" },
        { key: "website", label: "Website", icon: Globe, type: "url", placeholder: "johndoe.dev" },
    ]

    return (
        <div className="space-y-5">
            {/* Photo Upload */}
            <div className="flex items-center gap-4">
                <label className="cursor-pointer group">
                    {data.image ? (
                        <div className="relative">
                            <img
                                src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
                                alt='Profile'
                                className='size-16 rounded-xl object-cover ring-2 ring-slate-200 group-hover:ring-indigo-300 transition-all'
                            />
                            <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="size-4 text-white" />
                            </div>
                        </div>
                    ) : (
                        <div className="size-16 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-indigo-300 group-hover:text-indigo-400 transition-all">
                            <Camera className="size-5" />
                        </div>
                    )}
                    <input type="file" accept="image/jpeg, image/png" className='hidden' onChange={(e) => handleChange('image', e.target.files[0])} />
                </label>

                <div>
                    <p className="text-sm font-medium text-slate-700">{data.image ? 'Change photo' : 'Add a photo'}</p>
                    <p className="text-xs text-slate-400 mt-0.5">JPG or PNG, max 2MB</p>
                    {data.image && (
                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <div className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 ${removeBackground ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                                <input type="checkbox" checked={removeBackground} onChange={() => setRemoveBackground(prev => !prev)} className="sr-only" />
                                <div className={`absolute top-0.5 size-3.5 bg-white rounded-full shadow transition-transform duration-200 ${removeBackground ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                            </div>
                            <span className="text-xs text-slate-500">Remove background</span>
                        </label>
                    )}
                </div>
            </div>

            {/* Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                    const Icon = field.icon
                    return (
                        <div key={field.key} className={field.key === 'full_name' ? 'sm:col-span-2' : ''}>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                                <Icon className="size-3.5" />
                                {field.label}
                                {field.required && <span className="text-red-400">*</span>}
                            </label>
                            <input
                                type={field.type}
                                value={data[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="w-full px-3.5 py-2.5 text-sm"
                                placeholder={field.placeholder}
                                required={field.required}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PersonalInfoForm