import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './templates/MinimalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
    const renderTemplate = () => {
        switch (template) {
            case "modern": return <ModernTemplate data={data} accentColor={accentColor} />
            case "minimal-image": return <MinimalImageTemplate data={data} accentColor={accentColor} />
            case "minimal": return <MinimalTemplate data={data} accentColor={accentColor} />
            default: return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className='w-full'>
            <div id='resume-preview' className={"bg-white border border-slate-200 rounded-lg print:shadow-none print:border-none print:rounded-none " + classes}>
                {renderTemplate()}
            </div>

            <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { width: 210mm; height: 297mm; overflow: hidden; }
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * {
            visibility: visible;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          #resume-preview {
            position: absolute; left: 0; top: 0; width: 210mm; max-height: 297mm;
            margin: 0; padding: 0; box-shadow: none !important; border: none !important; border-radius: 0 !important;
            overflow: hidden;
          }
        }
      `}</style>
        </div>
    )
}

export default ResumePreview