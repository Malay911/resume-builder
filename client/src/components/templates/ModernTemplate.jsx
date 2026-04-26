import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
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
		<div className="max-w-4xl mx-auto bg-white text-gray-800 text-sm leading-normal">
			{/* Header */}
			<header className="px-8 py-5 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-2xl font-light mb-2">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				{/* Contact — two rows */}
				<div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px]">
					{data.personal_info?.email && (
						<div className="flex items-center gap-1.5">
							<Mail className="size-3.5" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-1.5">
							<Phone className="size-3.5" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-1.5">
							<MapPin className="size-3.5" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-1.5">
							<Linkedin className="size-3.5" />
							<span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-1.5">
							<Globe className="size-3.5" />
							<span className="break-all text-xs">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span>
						</a>
					)}
				</div>
			</header>

			<div className="px-8 py-5">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-4">
						<h2 className="text-lg font-light mb-1.5 pb-1 border-b border-gray-200">
							Professional Summary
						</h2>
						<p className="text-gray-700 text-[13px] leading-normal">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-4">
						<h2 className="text-lg font-light mb-2.5 pb-1 border-b border-gray-200">
							Experience
						</h2>

						<div className="space-y-3">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative pl-4 border-l border-gray-200">
									<div className="flex justify-between items-start mb-0.5">
										<div>
											<h3 className="text-[15px] font-medium text-gray-900">{exp.position}</h3>
											<p className="font-medium text-[13px]" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-[12.5px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap ml-3">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-normal mt-1 whitespace-pre-line text-[13px]">
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
						<h2 className="text-lg font-light mb-2 pb-1 border-b border-gray-200">
							Projects
						</h2>

						<div className="space-y-2.5">
							{data.project.map((p, index) => (
								<div key={index} className="relative pl-4 border-l-2 border-gray-200" style={{borderLeftColor: accentColor}}>
									<h3 className="text-[15px] font-medium text-gray-900">{p.name}</h3>
									{p.description && (
										<div className="text-gray-700 leading-normal text-[13px] mt-0.5">
											{p.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-5">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-lg font-light mb-2 pb-1 border-b border-gray-200">
								Education
							</h2>

							<div className="space-y-2.5">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900 text-sm">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p className="text-[13px]" style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-[12.5px] text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h2 className="text-lg font-light mb-2 pb-1 border-b border-gray-200">
								Skills
							</h2>

							<div className="flex flex-wrap gap-1.5">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-2.5 py-0.5 text-[12.5px] text-white rounded-full"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModernTemplate;