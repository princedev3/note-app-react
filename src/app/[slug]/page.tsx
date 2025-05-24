"use client"
import {  Edit, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useParams, useRouter } from 'next/navigation'
import {format } from "date-fns";
import { useNoteStore } from '@/store/note-store'

const SinglePage = () => {
  const {deleteNote,updateNote}= useNoteStore()
 const categories = [
  { name: "BUSINESS" },
  { name: "PERSONAL" },
  { name: "IMPORTANT" }
];
  const {slug} = useParams()
  const [open, setOpen] = useState(false);
  const router = useRouter()
const[singleNote,setAllSingleNote]=useState<{id:string,title:string,body:string,slug:string,category:string,created:Date,updated:Date}>()
    useEffect(()=>{
      if(!slug){
        return
      }
      const fetchAllData = async ()=>{
        try {
          const res = await fetch(`https://django-note-app-naxf.onrender.com/notes/${slug}`,{
            method:"GET"
          })
          const data =await res.json()
          setAllSingleNote(data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchAllData()
    },[singleNote,setAllSingleNote,slug])

    const handleEditNote = async(e:React.FormEvent<HTMLFormElement>)=>{
      try {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const formData = new FormData(target)
        const title = formData.get("title")
        const bodyContent = formData.get("body")
        const category = formData.get("category")
            const res = await fetch(`https://django-note-app-naxf.onrender.com/notes/${slug}`,{
            method:"PUT",
            headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,body:bodyContent,category})
          })
          const data =await res.json()
        updateNote(slug as string,data)
           setOpen(false)
          setAllSingleNote(data)
          target.reset()
      } catch (error) {
        
      }

    }
    const handleDelete = async()=>{
      try {
            await fetch(`https://django-note-app-naxf.onrender.com/notes/${slug}`,{
            method:"DELETE",
            headers:{
        "Content-Type":"application/json"
      },
     }
    )
    deleteNote(slug as string)
    router.push("/")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='bg-gray-100 min-h-[calc(100vh-80px)]  items-center grid justify-center mx-auto '>
     <div className="bg-white grid auto-rows-max w-full max-w-2xl min-h-[calc(100vh-120px)] p-4  rounded-xl">
    <h1 className="text-2xl md:text-3xl font-semibold text-center">{singleNote?.title} </h1>
      <div className="flex items-center justify-around my-4 gap-4">
        <div className="md:text-xl text-gray-500">Created:  {singleNote?.created ? format(new Date(singleNote.created), "dd MMM yyyy") : "N/A"}</div>
        <div className="md:text-xl text-gray-500">last updated: {singleNote?.updated ? format(new Date(singleNote.updated), "dd MMM yyyy") : "N/A"}</div>
      </div>  
      <div className="flex items-center justify-center gap-3">
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
   <button className="rounded-lg flex cursor-pointer items-center  py-2 bg-[#0388fc] px-3">
  <Edit className="bg-[#0388fc text-white rounded w-6 h-6" />
  <span className=" text-white text-lg capitalize ml-[2px] ">Edit</span>
</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center text-xl capitalize'>Edit note</DialogTitle>
      <div>
        <form onSubmit={handleEditNote} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label htmlFor="" className='text-black/70 text-xl capitalize'>Title</label>
                <input type="title" name='title' defaultValue={singleNote?.title} placeholder={`Enter note's title`} className='p-2 outline-0 border border-gray-200 rounded-lg' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className='text-black/70 text-xl capitalize'>content</label>
                <textarea name="body" defaultValue={singleNote?.body}  placeholder={`Enter note's title`} className='p-2 outline-0 border border-gray-200 rounded-lg' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className='text-black/70 text-xl capitalize'>Note's category</label>
                 <Select name='category' defaultValue={singleNote?.category} >
  <SelectTrigger className="w-full !p-3">
    <SelectValue placeholder="All Notes" className="" />
  </SelectTrigger>
  <SelectContent>
    {
      categories.map(item=>(
        <SelectItem key={item.name} value={item.name as string} >{item.name as string}</SelectItem>
      ))
    }
  </SelectContent>
</Select>
            </div>
            <button className='text-lg bg-[#0388fc] text-white rounded-lg py-2 capitalize'>edit note</button>
        </form>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
  
     <Dialog>
  <DialogTrigger asChild>  
  <button className="rounded-lg cursor-pointer flex items-center  py-2 bg-red-600 px-3">
  <Trash className="text-white rounded w-6 h-6" />
  <span className=" text-white text-lg capitalize ml-[2px]">delete</span>
</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center text-xl capitalize'>are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
       <DialogFooter>
      <button onClick={handleDelete}  className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer'>Confirm</button>
    </DialogFooter>
    </DialogHeader>
  </DialogContent>
</Dialog>

 
      </div> 
<div className="mt-5 text-lg text-gray-600">
 {singleNote?.body}
</div>
     </div>
    </div>
  )
}

export default SinglePage