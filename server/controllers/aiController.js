import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

//controller forenhancing a resume's professional summary
//POST: /api/ai/enhance-pro-sum
export const enhanceSummary=async(req,res)=>{
    try {
        const {userContent}=req.body;
        if(!userContent){
            return res.status(400).json({message:"Missing required fields"});
        }

        const response = await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages:[
                {
                    role:"system",
                    content:"You are an expert in resume writing.Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else."
                },
                {
                    role:"user",
                    content:userContent,
                }
            ]
        })

        const enhancedContent=response.choices[0].message.content;
        return res.status(200).json({enhancedContent});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//controller for enhancing a resume's job description
//POST: /api/ai/enhance-job-description
export const enhanceJobDescription=async(req,res)=>{
    try {
        const {userContent}=req.body;
        if(!userContent){
            return res.status(400).json({message:"Missing required fields"});
        }

        const response = await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages:[
                {
                    role:"system",
                    content:"You are an expert in resume writing.Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."
                },
                {
                    role:"user",
                    content:userContent,
                }
            ]
        })

        const enhancedContent=response.choices[0].message.content;
        return res.status(200).json({enhancedContent});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//controller for uploading resume to the database
//POST: /api/ai/upload-resume
export const uploadResume=async(req,res)=>{
    try {
        const {resumeText, title}=req.body;
        const userId=req.userId;

        if(!resumeText || !title){
            return res.status(400).json({message:"Missing required fields"});
        }

        const systemPrompt="You are an expert AI Agent to extract data from resume."

        const userPrompt=`extract data from this resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:

        {
        professional_summary: {type: String, default: ""},
        skills: [{type: String}],
        personal_info: {
            image: {type: String, default: ""},
            full_name: {type: String, default: ""},
            profession: {type: String, default: ""},
            email: {type: String, default: ""},
            phone: {type: String, default: ""},
            location: {type: String, default: ""},
            linkedin: {type: String, default: ""},
            website: {type: String, default: ""}
        },
        experience:[
            {
                company:{type: String},
                position:{type: String},
                start_date:{type: String, format: "YYYY-MM", example: "2023-12"},
                end_date:{type: String, format: "YYYY-MM", example: "2024-11"},
                description:{type: String},
                is_current:{type: Boolean}
            }
        ],
        project: [
            {
                name: {type: String},
                type: {type: String},
                description: {type: String}
            }
        ],
        education:[
            {
                institution:{type: String},
                degree:{type: String},
                field:{type: String},
                graduation_date:{type: String, format: "YYYY-MM", example: "2026-05"},
                gpa:{type: String}
            }
        ],

        IMPORTANT: All date fields (start_date, end_date, graduation_date) MUST be in "YYYY-MM" format (e.g. "2023-12", "2024-08"). Convert any date like "Dec 2023" to "2023-12", "Aug 2024" to "2024-08", "2020" to "2020-01". If is_current is true, end_date should be empty string "".
        }

        `

        const response = await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages:[
                {
                    role:"system",
                    content:systemPrompt,
                },
                {
                    role:"user",
                    content:userPrompt,
                }
            ],
            response_format:{type: 'json_object'}
        })

        const extractedData=response.choices[0].message.content;
        const parsedData=JSON.parse(extractedData);
        const newResume=await Resume.create({userId,title,...parsedData});
        return res.status(201).json({message:"Resume uploaded successfully",resume:newResume});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}