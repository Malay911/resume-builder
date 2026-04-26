import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

const ResumePreviewCard = ({ resume, accent = 'from-neutral-800 to-neutral-600' }) => {
  const { personal_info, professional_summary, experience, accent_color } = resume || {};
  
  const fullName = personal_info?.full_name || 'Untitled Resume';
  const profession = personal_info?.profession || 'Professional Title';
  const themeColor = accent_color || '#3b82f6'; // fallback to a blue

  return (
    <div className="mt-6 relative w-full h-48 perspective-1000">
      {/* Back flap of the folder */}
      <div className={`absolute bottom-0 left-0 w-full h-[75%] rounded-xl bg-gradient-to-br ${accent} opacity-[0.85] shadow-inner`} />
      
      {/* Document 1 (Background sheet - purely visual) */}
      <div className="absolute left-[8%] bottom-[12%] w-[80%] h-[90%] bg-neutral-100 rounded-md border border-neutral-200 shadow-sm rotate-[-4deg] origin-bottom-left transition-transform duration-500 ease-out group-hover:rotate-[-8deg] group-hover:-translate-y-3 group-hover:-translate-x-1" />
      
      {/* Document 2 (Foreground sheet - the actual resume preview) */}
      <div className="absolute left-[12%] bottom-[12%] w-[80%] h-[92%] bg-white rounded-md border border-neutral-200 shadow-md rotate-[2deg] origin-bottom-right transition-transform duration-500 ease-out group-hover:rotate-[5deg] group-hover:-translate-y-4 group-hover:translate-x-1 flex flex-col p-3 overflow-hidden z-10">
        
        {/* Header Block (Real Data) */}
        <div className="flex flex-col items-center mb-2.5">
          <div className="text-[9px] font-bold uppercase tracking-wider truncate w-full text-center" style={{ color: themeColor }}>
            {fullName}
          </div>
          <div className="text-[5px] font-medium text-neutral-500 uppercase tracking-widest truncate w-full text-center mt-0.5">
            {profession}
          </div>
          <div className="flex gap-1 mt-1.5">
            <div className="w-5 h-[1.5px] rounded-full bg-neutral-200" />
            <div className="w-7 h-[1.5px] rounded-full bg-neutral-200" />
            <div className="w-5 h-[1.5px] rounded-full bg-neutral-200" />
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-neutral-100 mb-2" />
        
        {/* Section 1: Summary */}
        <div className="mb-2.5">
          <div className="text-[4px] font-bold uppercase mb-1" style={{ color: themeColor }}>Summary</div>
          {professional_summary ? (
             <div className="text-[3.5px] leading-[5px] text-neutral-400 line-clamp-3 overflow-hidden text-justify">
               {professional_summary}
             </div>
          ) : (
            <div className="space-y-0.5">
              <div className="w-full h-[1.5px] rounded-full bg-neutral-100" />
              <div className="w-11/12 h-[1.5px] rounded-full bg-neutral-100" />
              <div className="w-4/5 h-[1.5px] rounded-full bg-neutral-100" />
            </div>
          )}
        </div>
        
        {/* Section 2: Experience */}
        <div className="mb-1 flex-1">
          <div className="text-[4px] font-bold uppercase mb-1" style={{ color: themeColor }}>Experience</div>
          {experience && experience.length > 0 ? (
             <div className="space-y-1.5">
               {experience.slice(0, 2).map((exp, i) => (
                 <div key={i} className="pl-1">
                   <div className="flex justify-between items-start mb-0.5">
                     <div className="text-[4.5px] font-bold text-neutral-700 truncate w-2/3">{exp.position || 'Position'}</div>
                     <div className="text-[3.5px] text-neutral-400 flex-shrink-0">{exp.start_date ? (exp.start_date.split(' ')[1] || exp.start_date) : 'Year'}</div>
                   </div>
                   <div className="text-[3.5px] font-medium text-neutral-500 mb-0.5 truncate">{exp.company || 'Company'}</div>
                   <div className="space-y-[2px]">
                     <div className="flex items-center gap-1"><div className="w-[1.5px] h-[1.5px] rounded-full bg-neutral-300" /><div className="w-full h-[1.5px] rounded-full bg-neutral-100" /></div>
                     <div className="flex items-center gap-1"><div className="w-[1.5px] h-[1.5px] rounded-full bg-neutral-300" /><div className="w-5/6 h-[1.5px] rounded-full bg-neutral-100" /></div>
                   </div>
                 </div>
               ))}
             </div>
          ) : (
             <div className="pl-1 space-y-1">
                <div className="flex justify-between items-start mb-0.5">
                  <div className="w-1/3 h-1 rounded-full bg-neutral-200" />
                  <div className="w-1/5 h-1 rounded-full bg-neutral-100" />
                </div>
                <div className="space-y-[2px] mt-1">
                  <div className="flex items-center gap-1"><div className="w-[1.5px] h-[1.5px] rounded-full bg-neutral-300" /><div className="w-full h-[1.5px] rounded-full bg-neutral-100" /></div>
                  <div className="flex items-center gap-1"><div className="w-[1.5px] h-[1.5px] rounded-full bg-neutral-300" /><div className="w-5/6 h-[1.5px] rounded-full bg-neutral-100" /></div>
                </div>
             </div>
          )}
        </div>

        {/* Shimmer Effect for the document */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
          initial={{ x: "-150%" }}
          animate={{ x: "200%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Front flap of the folder */}
      <div className={`absolute bottom-0 left-0 w-full h-[60%] rounded-xl bg-gradient-to-br ${accent} shadow-[0_-4px_15px_rgba(0,0,0,0.1)] border-t border-white/10 transition-transform duration-500 ease-out group-hover:translate-y-1 z-20`}>
         {/* Folder Tab (Top Left) */}
         <div className={`absolute -top-3 left-0 w-2/5 h-4 rounded-t-lg bg-gradient-to-br ${accent} opacity-100 border-t border-l border-white/10`} style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }} />
         
         {/* Folder content overlay for depth */}
         <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
         
         {/* Center icon on the folder */}
         <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <FileText className="size-10 text-white" />
         </div>
      </div>

      {/* Hover Overlay (Click to Edit) */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center z-30 rounded-xl pointer-events-none">
         <span className="bg-white/95 text-black px-4 py-2 rounded-lg text-xs font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 pointer-events-auto">
            Click to Edit <ArrowRight className="size-3" />
         </span>
      </div>
    </div>
  );
};

export default ResumePreviewCard;
