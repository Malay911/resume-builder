import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
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
        <div className="max-w-4xl mx-auto px-8 py-5 bg-white text-gray-800 text-sm leading-normal">
            {/* Header */}
            <header className="text-center mb-4 pb-3 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-[22px] font-bold mb-2 uppercase tracking-wide" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                {/* Contact — two rows */}
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12.5px] text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3.5" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-3.5" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-3.5" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-3.5" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-4">
                    <h2 className="text-[15px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: accentColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-normal">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-[15px] font-semibold mb-2.5 uppercase tracking-wide" style={{ color: accentColor }}>
                        Professional Experience
                    </h2>

                    <div className="space-y-3">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 pl-3.5" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-0.5">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium text-[13px]">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-[13px] text-gray-600 whitespace-nowrap ml-4">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-normal whitespace-pre-line text-[13px] mt-1">
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
                <section className="mb-4">
                    <h2 className="text-[15px] font-semibold mb-2.5 uppercase tracking-wide" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-2.5">
                        {data.project.map((proj, index) => (
                            <div key={index} className="border-l-2 border-gray-300 pl-3.5">
                                <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                                <p className="text-gray-600 text-[13px] leading-normal">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-[15px] font-semibold mb-2.5 uppercase tracking-wide" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-2">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700 text-[13px]">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[13px] text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-[13px] text-gray-600 whitespace-nowrap ml-4">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-[15px] font-semibold mb-2 uppercase tracking-wide" style={{ color: accentColor }}>
                        Core Skills
                    </h2>

                    <div className="flex gap-x-4 gap-y-1 flex-wrap text-[13px] text-gray-700">
                        {data.skills.map((skill, index) => (
                            <div key={index}>
                                • {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;