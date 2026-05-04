import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
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
		<div className="max-w-4xl mx-auto bg-white text-gray-800 text-[12.5px] leading-snug">
			{/* Header */}
			<header className="px-8 py-4 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-2xl font-light mb-1.5">{data.personal_info?.full_name || "Your Name"}</h1>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11.5px]">
					{data.personal_info?.email && (<div className="flex items-center gap-1.5"><Mail className="size-3" /><span>{data.personal_info.email}</span></div>)}
					{data.personal_info?.phone && (<div className="flex items-center gap-1.5"><Phone className="size-3" /><span>{data.personal_info.phone}</span></div>)}
					{data.personal_info?.location && (<div className="flex items-center gap-1.5"><MapPin className="size-3" /><span>{data.personal_info.location}</span></div>)}
					{data.personal_info?.linkedin && (<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-1.5"><Linkedin className="size-3" /><span className="break-all text-[11px]">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span></a>)}
					{data.personal_info?.github && (<a target="_blank" href={`https://github.com/${data.personal_info.github}`} className="flex items-center gap-1.5"><Github className="size-3" /><span className="text-[11px]">{data.personal_info.github}</span></a>)}
					{data.personal_info?.website && (<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-1.5"><Globe className="size-3" /><span className="break-all text-[11px]">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span></a>)}
				</div>
			</header>

			<div className="px-8 py-4">
				{data.professional_summary && (
					<section className="mb-3">
						<h2 className="text-base font-light mb-1 pb-0.5 border-b border-gray-200">Professional Summary</h2>
						<p className="text-gray-700 text-[12px] leading-snug">{data.professional_summary}</p>
					</section>
				)}

				{data.experience?.length > 0 && (
					<section className="mb-3">
						<h2 className="text-base font-light mb-2 pb-0.5 border-b border-gray-200">Experience</h2>
						<div className="space-y-2.5">
							{data.experience.map((exp, i) => (
								<div key={i} className="relative pl-3.5 border-l border-gray-200">
									<div className="flex justify-between items-start mb-0.5">
										<div>
											<h3 className="text-[13px] font-medium text-gray-900">{exp.position}</h3>
											<p className="font-medium text-[12px]" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-[11.5px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap ml-3">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (<div className="text-gray-700 leading-snug mt-0.5 whitespace-pre-line text-[12px]">{exp.description}</div>)}
								</div>
							))}
						</div>
					</section>
				)}

				{data.project?.length > 0 && (
					<section className="mb-3">
						<h2 className="text-base font-light mb-1.5 pb-0.5 border-b border-gray-200">Projects</h2>
						<div className="space-y-2">
							{data.project.map((p, i) => (
								<div key={i} className="relative pl-3.5 border-l-2 border-gray-200" style={{ borderLeftColor: accentColor }}>
									<h3 className="text-[13px] font-medium text-gray-900">{p.name}</h3>
									{p.description && (<div className="text-gray-700 leading-snug text-[12px] mt-0.5">{p.description}</div>)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-4">
					{data.education?.length > 0 && (
						<section>
							<h2 className="text-base font-light mb-1.5 pb-0.5 border-b border-gray-200">Education</h2>
							<div className="space-y-2">
								{data.education.map((edu, i) => (
									<div key={i}>
										<h3 className="font-semibold text-gray-900 text-[12.5px]">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
										<p className="text-[12px]" style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-[11.5px] text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{data.skills?.length > 0 && (
						<section>
							<h2 className="text-base font-light mb-1.5 pb-0.5 border-b border-gray-200">Skills</h2>
							<div className="flex flex-wrap gap-1">
								{data.skills.map((skill, i) => (
									<span key={i} className="px-2 py-0.5 text-[11.5px] text-white rounded-full" style={{ backgroundColor: accentColor }}>{skill}</span>
								))}
							</div>
						</section>
					)}
				</div>

				{data.certifications?.length > 0 && (
					<section className="mt-3">
						<h2 className="text-base font-light mb-1 pb-0.5 border-b border-gray-200">Certifications</h2>
						<div className="space-y-0.5 text-[12px] text-gray-700">
							{data.certifications.map((cert, i) => <div key={i}>• {cert}</div>)}
						</div>
					</section>
				)}

				{data.achievements?.length > 0 && (
					<section className="mt-3">
						<h2 className="text-base font-light mb-1 pb-0.5 border-b border-gray-200">Achievements & Activities</h2>
						<div className="space-y-0.5 text-[12px] text-gray-700">
							{data.achievements.map((a, i) => <div key={i}>• {a}</div>)}
						</div>
					</section>
				)}

				{data.languages?.length > 0 && (
					<section className="mt-3">
						<h2 className="text-base font-light mb-1 pb-0.5 border-b border-gray-200">Languages Known</h2>
						<div className="text-[12px] text-gray-700">
							{data.languages.map((lang, i) => (
								<span key={i}>{lang.title}{lang.proficiency ? ` – ${lang.proficiency}` : ''}{i < data.languages.length - 1 ? ' • ' : ''}</span>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default ModernTemplate;