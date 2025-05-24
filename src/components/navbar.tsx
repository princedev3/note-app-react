"use client"
import { Plus} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useSearchStore } from '@/store/search-store'
import { useNoteStore } from '@/store/note-store'


const Navbar = () => {
  const {setQuery}=useSearchStore()
  const{addNote}=useNoteStore()
  const[open,setOpen]=useState(false)
    const categories = [
  { name: "BUSINESS" },
  { name: "PERSONAL" },
  { name: "IMPORTANT" }
];
const handleCreateNote= async(e:React.FormEvent<HTMLFormElement>)=>{
try {
  e.preventDefault()
  const target = e.target as HTMLFormElement
  const formdata = new FormData(target)
  const title = formdata.get("title")
  const body = formdata.get("body")
  const category = formdata.get("category")
  if(!title || !body || !category){
    toast("fill inputs values", {
          description: "can not submit empty form"
        })
    return 
  }

    const res = await fetch("https://django-note-app-naxf.onrender.com/notes/",{
          method:"POST",
           headers:{
        "Content-Type":"application/json"
      },
        body:JSON.stringify({title,body,category})
        })
       const data =  await res.json()
     addNote(data)
        target.reset()
        setOpen(false)
} catch (error) {
  console.log(error)
}
}
const handleSearch = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const target = e.target as HTMLFormElement
  const search = new FormData(target).get("search") as string
  setQuery(search)
  target.reset()
  
}
  return (
 <div className='h-20 bg-zinc-100 flex items-center justify-between lg:px-20'>
 <Link href={"/"} className="text-2xl hidden md:flex  font-semibold text-black/80 cursor-pointer">Notey</Link>
<form onSubmit={handleSearch} className="flex border border-gray-300 rounded-md w-fit">
  <input
    type="text"
    name="search"
    placeholder="Search"
    className="md:w-[400px] py-2 bg-white px-3 placeholder:text-gray-500 text-lg outline-none border-none rounded-l-md"
  />
  <button
    type="submit"
    className="text-lg px-1  bg-green-50 cursor-pointer border text-green-700 border-green-700 -mt-[2px] rounded-r-md"
  >
    Search
  </button>
</form>
<Dialog onOpenChange={setOpen} open={open}>
  <DialogTrigger asChild>
      <button className="rounded-lg flex gap-1 items-center border py-2 border-[#0388fc] px-2">
  <Plus className="bg-[#0388fc] text-white rounded p-1 w-6 h-6" />
  <span className=" text-[#0388fc] capitalize">add note</span>
</button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center text-xl capitalize'>add new note</DialogTitle>
      <DialogDescription>
        <form onSubmit={handleCreateNote} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label htmlFor="" className='text-black/70 text-xl capitalize'>Title</label>
                <input type="title" required name='title' placeholder={`Enter note's title`} className='p-2 outline-0 border border-gray-200 rounded-lg' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className='text-black/70 text-xl capitalize'>content</label>
                <textarea name='body' required placeholder={`Enter note's title`} className='p-2 outline-0 border border-gray-200 rounded-lg' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className='text-black/70 text-xl capitalize'>Note's category</label>
                 <Select name='category' required>
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
            <button className='text-lg bg-[#0388fc] text-white rounded-lg py-2 capitalize'>add note</button>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default Navbar