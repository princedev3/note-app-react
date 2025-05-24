import { Mail, StickyNote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {format } from "date-fns";

const NoteCardContainer = ({body,category,created,id,slug,title,updated}:{id:string,title:string,body:string,slug:string,category:string,created:Date,updated:Date}) => {
  return (
    <div className='h-[260px] min-w-[300px] border shadow-lg rounded-2xl bg-white relative p-4'>
        <div className={`${category==="PERSONAL"?"bg-[#0388fc]":category==="BUSINESS"?"bg-[#32a838]" :"bg-[#3238a8]"} h-8  w-1 rounded-sm absolute left-0 top-8`}></div>
        <div className="flex justify-end">
            <StickyNote className={`${category==="PERSONAL"?"text-[#0388fc]":category==="BUSINESS"?"text-[#32a838]" :"text-[#3238a8]"} `} />
        </div>
        <div className="flex flex-col">
        <Link href={`/${slug}`} className="text-2xl font-bold">{title}</Link>
        <span className="text-gray-700">{created ? format(new Date(created), "dd MMM yyyy") : "N/A"}</span>
        </div>
        <h3 className="my-4 text-gray-600">
          {body.slice(0,40)}...
        </h3>
        <div className="flex gap-1">
        <Mail className={`${category==="PERSONAL"?"text-[#0388fc]":category==="BUSINESS"?"text-[#32a838]" :"text-[#3238a8]"} `} />
        <span className="font-normal text-gray-600">{category}</span>
        </div>
    </div>
  )
}

export default NoteCardContainer