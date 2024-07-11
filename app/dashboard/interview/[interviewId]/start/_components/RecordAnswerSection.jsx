"use client"
import Webcam from 'react-webcam';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnswerSection() {
  const[userAnswer,setUserAnswer]=useState('');
   const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  },[results])


  return (
      <div className='flex items-center justify-center flex-col'> 
    <div className='flex flex-col items-center justify-center mt-20 text-center bg-black rounded-lg p-5 relative'>
      {/* Image centered */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Image src='/webcam.png' width={200} height={200} />
      </div>
      
      {/* Webcam */}
      <Webcam
        mirrored={true}
        style={{
          height: 300,
          width: '100%',
          zIndex: 10,
        }}
      />
    </div>
    <Button variant="outline" className="my-10"
    onClick={isRecording?stopSpeechToText:startSpeechToText}>
      {isRecording?
    <h2 className='text-red-600 flex gap-2'>
        <Mic/> Stop Recording
    </h2>
    :
    'Record Answer'}
      </Button>
      <Button onClick={()=>console.log(userAnswer)}>Show Answer</Button>
   
    </div>
  );
}

export default RecordAnswerSection;
