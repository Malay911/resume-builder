
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        
        // Check if it's in YYYY-MM format
        if (/^\d{4}-\d{2}$/.test(dateStr)) {
            const [year, month] = dateStr.split("-");
            return new Date(year, month - 1).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            });
        }
        
        // Try parsing other formats
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            });
        }
        
        // Fallback: return the original string
        return dateStr;
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-5 bg-white text-gray-900 font-light text-sm leading-normal">
            {/* Header */}
            <header className="mb-5">
                <h1 className="text-3xl font-thin mb-2 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                {/* Contact — two rows */}
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.github && (
                        <span>{data.personal_info.github}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-5">
                    <p className="text-gray-700 leading-normal">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[15px] font-medium">{exp.position}</h3>
                                    <span className="text-[12.5px] text-gray-500 whitespace-nowrap ml-4">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-[13px] mb-1">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-normal whitespace-pre-line text-[13px]">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="text-[15px] font-medium">{proj.name}</h3>
                                <p className="text-gray-600 text-[13px] leading-normal">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-2.5">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600 text-[13px]">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[12.5px] text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-[12.5px] text-gray-500 whitespace-nowrap ml-4">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-xs uppercase tracking-widest mb-2.5 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700 text-[13px]">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;