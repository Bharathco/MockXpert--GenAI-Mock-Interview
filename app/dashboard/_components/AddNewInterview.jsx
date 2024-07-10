"use client"; 
import React, { useState } from 'react';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog,setOpenDialog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter
    const {user}=useUser();

    


    const onSubmit=async(e)=>{
      setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience)

        const InputPromt="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+", Depending on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answers in JSON format, Give question and answer as field in JSON and no need to provide any extra note"
        
        const result=await chatSession.sendMessage(InputPromt);

        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','');

        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp){
        const resp=await db.insert(MockInterview)
        .values({
          mockId:uuidv4(),
          jsonMockResp:MockJsonResp,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          jobExperience:jobExperience,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY')

        }).returning({mockId:MockInterview.mockId});

       console.log("Inserted ID:",resp) 
       if(resp)
       {
        setOpenDialog(false);
        router.push('/dashboard/interviews'+resp[0]?.mockId)
       }
      }

        setLoading(false);
    }


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary
     hover:scale-105 hover:shadow-md cursor-pointer 
     transition-all' 
     onClick={()=>setOpenDialog(true)}
     
     >
        <h2 className="text-lg text-center">+ Add New</h2>
     
      </div>
      <Dialog open={openDialog}>
  
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell us more about your Job interviewing</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
      <div className="">
        <h2 className="fonr-bold text-2xl"></h2>
        <h2 className="">Add details about your job position/role, Job description and years of experience</h2>

        <div className="mt-7 my-2">
        <label>Job Role/Job Position</label>
        <Input className="my-1" placeholder="Ex. Full Stack Developer" required
        onChange={(event)=>setJobPosition(event.target.value)}
        />
        

      </div>

      <div className="my-3">
        <label>Job Description/Tech stack (in Short)</label>
        <Textarea className="my-1" placeholder="Ex. React, AngularJs, NodeJs, MySQL elc" required
        onChange={(event)=>setJobDesc(event.target.value)}
        />
      </div>

      <div className="my-3">
        <label>years of Experience</label>
        <Input className="my-1" placeholder="Ex. 5" type="number" max="50" required 
        onChange={(event)=>setJobExperience(event.target.value)}
        />
      </div>

      </div>
        <div className='flex gap-5 justify-end'>
            <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading?
              <>
              <LoaderCircle className='animate-spin' />'Generating from AI'
              </>:'Start Interview'
              }
              </Button>
        </div>
        </form>
      </DialogDescription>

    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview