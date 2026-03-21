import React from 'react'
import { FAQCard } from "@/components/ui/FAQCard"

const faq = [
    {
        question: "How does AI optimize my resume?",
        ans: "Our AI analyzes your resume against thousands of job listings to identify gaps, keyword mismatches, and formatting issues that could filter you out before a human ever reads it. It rewrites bullet points to emphasize measurable impact, aligns your language with what applicant tracking systems (ATS) look for, and tailors the content to match your target role — all in seconds."
    },
    {
        question: "Is my data secure?",
        ans: "Yes. Your resume and personal information are encrypted in transit and at rest using AES-256 encryption. We never sell your data to third parties, and you can permanently delete your account and all associated data at any time from your settings. "
    },
    {
        question: "Can I cancel my subscription at any time?",
        ans: "Absolutely. There are no contracts or cancellation fees. You can cancel your subscription directly from your account dashboard in just a few clicks. Your access will continue until the end of your current billing period, and you won't be charged again after that."
    },
    {
        question: "Can I apply for jobs from Lakshe directly?",
        ans: "Not directly — but we make it easy. The app currently displays job listings sourced from platforms like LinkedIn, Indeed, and Glassdoor. When you find a role you like, you'll be taken to the original posting to complete your application there. We're working on direct apply functionality and it's coming in a future update."
    },

]

function FAQ() {
  return (
    <div className='mt-40 font-sans text-white flex flex-col items-center px-40'>
        <p className='text-4xl text-center font-extrabold'>Frequently Asked Questions</p>
        <div className='flex flex-col gap-5 mt-10 w-2/3'>
            {faq.map((item, index) => (
                <FAQCard question={item.question} ans={item.ans} key={index}/>)
            )}
        </div>
    </div>
  )
}

export default FAQ
