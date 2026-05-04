
const MinimalTemplate = ({ data, accentColor }) => {
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
        <div className="max-w-4xl mx-auto px-8 py-4 bg-white text-gray-900 font-light text-[12.5px] leading-snug">
            <header className="mb-4">
                <h1 className="text-2xl font-thin mb-1.5 tracking-wide">{data.personal_info?.full_name || "Your Name"}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11.5px] text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && <span className="break-all">{data.personal_info.linkedin}</span>}
                    {data.personal_info?.github && <span>{data.personal_info.github}</span>}
                    {data.personal_info?.website && <span className="break-all">{data.personal_info.website}</span>}
                </div>
            </header>

            {data.professional_summary && (
                <section className="mb-4">
                    <p className="text-gray-700 leading-snug">{data.professional_summary}</p>
                </section>
            )}

            {data.experience?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-[11px] uppercase tracking-widest mb-2 font-medium" style={{ color: accentColor }}>Experience</h2>
                    <div className="space-y-3">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[13px] font-medium">{exp.position}</h3>
                                    <span className="text-[11.5px] text-gray-500 whitespace-nowrap ml-4">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                </div>
                                <p className="text-gray-600 text-[12px] mb-0.5">{exp.company}</p>
                                {exp.description && <div className="text-gray-700 leading-snug whitespace-pre-line text-[12px]">{exp.description}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.project?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-[11px] uppercase tracking-widest mb-2 font-medium" style={{ color: accentColor }}>Projects</h2>
                    <div className="space-y-2.5">
                        {data.project.map((proj, i) => (
                            <div key={i}>
                                <h3 className="text-[13px] font-medium">{proj.name}</h3>
                                <p className="text-gray-600 text-[12px] leading-snug">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education?.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-[11px] uppercase tracking-widest mb-2 font-medium" style={{ color: accentColor }}>Education</h2>
                    <div className="space-y-2">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium text-[12.5px]">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <p className="text-gray-600 text-[12px]">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[11.5px] text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-[11.5px] text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.graduation_date)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.skills?.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11px] uppercase tracking-widest mb-2 font-medium" style={{ color: accentColor }}>Skills</h2>
                    <div className="text-gray-700 text-[12px]">{data.skills.join(" • ")}</div>
                </section>
            )}

            {data.certifications?.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11px] uppercase tracking-widest mb-1.5 font-medium" style={{ color: accentColor }}>Certifications</h2>
                    <div className="space-y-0.5 text-[12px] text-gray-700">
                        {data.certifications.map((cert, i) => <div key={i}>• {cert}</div>)}
                    </div>
                </section>
            )}

            {data.achievements?.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11px] uppercase tracking-widest mb-1.5 font-medium" style={{ color: accentColor }}>Achievements & Activities</h2>
                    <div className="space-y-0.5 text-[12px] text-gray-700">
                        {data.achievements.map((a, i) => <div key={i}>• {a}</div>)}
                    </div>
                </section>
            )}

            {data.languages?.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11px] uppercase tracking-widest mb-1.5 font-medium" style={{ color: accentColor }}>Languages Known</h2>
                    <div className="text-[12px] text-gray-700">
                        {data.languages.map((lang, i) => (
                            <span key={i}>{lang.title}{lang.proficiency ? ` (${lang.proficiency})` : ''}{i < data.languages.length - 1 ? ' • ' : ''}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;