import { Mail, Phone, MapPin, Github } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        if (/^\d{4}-\d{2}$/.test(dateStr)) {
            const [year, month] = dateStr.split("-");
            return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        return dateStr;
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 text-[12px] leading-snug">
            <div className="grid grid-cols-3">

                <div className="col-span-1 py-5">
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-3">
                            <img src={data.personal_info.image} alt="Profile" className="w-24 h-24 object-cover rounded-full mx-auto" style={{ background: accentColor + '70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-3">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-24 h-24 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                <div className="col-span-2 flex flex-col justify-center py-5 px-6">
                    <h1 className="text-xl font-bold text-zinc-700 tracking-widest">{data.personal_info?.full_name || "Your Name"}</h1>
                    <p className="uppercase text-zinc-600 font-medium text-[11px] tracking-widest">{data?.personal_info?.profession || "Profession"}</p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-400 px-4 py-3 pt-0">
                    <section className="mb-4">
                        <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-1.5">CONTACT</h2>
                        <div className="space-y-1 text-[11.5px]">
                            {data.personal_info?.phone && (<div className="flex items-center gap-1.5"><Phone size={11} style={{ color: accentColor }} /><span>{data.personal_info.phone}</span></div>)}
                            {data.personal_info?.email && (<div className="flex items-center gap-1.5"><Mail size={11} style={{ color: accentColor }} /><span>{data.personal_info.email}</span></div>)}
                            {data.personal_info?.location && (<div className="flex items-center gap-1.5"><MapPin size={11} style={{ color: accentColor }} /><span>{data.personal_info.location}</span></div>)}
                            {data.personal_info?.github && (<div className="flex items-center gap-1.5"><Github size={11} style={{ color: accentColor }} /><span>{data.personal_info.github}</span></div>)}
                        </div>
                    </section>

                    {data.education?.length > 0 && (
                        <section className="mb-4">
                            <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-1.5">EDUCATION</h2>
                            <div className="space-y-2 text-[11.5px]">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="font-semibold uppercase text-[11px]">{edu.degree}</p>
                                        <p className="text-zinc-600 text-[11px]">{edu.institution}</p>
                                        <p className="text-[10px] text-zinc-500">{formatDate(edu.graduation_date)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.skills?.length > 0 && (
                        <section className="mb-4">
                            <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-1.5">SKILLS</h2>
                            <ul className="space-y-0.5 text-[11.5px]">
                                {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                            </ul>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-semibold tracking-widest text-zinc-600 mb-1.5">LANGUAGES</h2>
                            <div className="space-y-0.5 text-[11.5px]">
                                {data.languages.map((lang, i) => (
                                    <div key={i}>
                                        <span className="font-medium">{lang.title}</span>
                                        {lang.proficiency && <span className="text-zinc-500 text-[10px]"> – {lang.proficiency}</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 px-6 py-3 pt-0">
                    {data.professional_summary && (
                        <section className="mb-3">
                            <h2 className="text-[10px] font-semibold tracking-widest mb-1" style={{ color: accentColor }}>SUMMARY</h2>
                            <p className="text-zinc-700 leading-snug text-[11.5px]">{data.professional_summary}</p>
                        </section>
                    )}

                    {data.experience?.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-semibold tracking-widest mb-1.5" style={{ color: accentColor }}>EXPERIENCE</h2>
                            <div className="space-y-3 mb-3">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-zinc-900 text-[12px]">{exp.position}</h3>
                                            <span className="text-[10px] text-zinc-500 whitespace-nowrap ml-3">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                        </div>
                                        <p className="text-[11.5px] mb-0.5" style={{ color: accentColor }}>{exp.company}</p>
                                        {exp.description && (
                                            <ul className="list-disc list-inside text-[11.5px] text-zinc-700 leading-snug space-y-0.5">
                                                {exp.description.split("\n").map((line, j) => <li key={j}>{line}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.project?.length > 0 && (
                        <section className="mb-3">
                            <h2 className="text-[10px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: accentColor }}>PROJECTS</h2>
                            <div className="space-y-2">
                                {data.project.map((project, i) => (
                                    <div key={i}>
                                        <h3 className="text-[12px] font-medium text-zinc-800">{project.name}</h3>
                                        <p className="text-[11.5px] mb-0.5" style={{ color: accentColor }}>{project.type}</p>
                                        {project.description && (
                                            <ul className="list-disc list-inside text-[11.5px] text-zinc-700 leading-snug space-y-0.5">
                                                {project.description.split("\n").map((line, j) => <li key={j}>{line}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section className="mb-3">
                            <h2 className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: accentColor }}>CERTIFICATIONS</h2>
                            <div className="space-y-0.5 text-[11.5px] text-zinc-700">
                                {data.certifications.map((cert, i) => <div key={i}>• {cert}</div>)}
                            </div>
                        </section>
                    )}

                    {data.achievements?.length > 0 && (
                        <section className="mb-3">
                            <h2 className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: accentColor }}>ACHIEVEMENTS & ACTIVITIES</h2>
                            <div className="space-y-0.5 text-[11.5px] text-zinc-700">
                                {data.achievements.map((a, i) => <div key={i}>• {a}</div>)}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default MinimalImageTemplate;