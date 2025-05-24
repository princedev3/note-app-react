"use client"
import Filter from "@/components/filter";
import NoteCardContainer from "@/components/note-card-container";
import { useNoteStore } from "@/store/note-store";
import { useSearchStore } from "@/store/search-store";
import { useEffect, useState } from "react";

export default function Home() {
  const {query,clearQuery}=useSearchStore()
  const {allNotes,setAllNotes}= useNoteStore()
  const[filtered,setFilters]=useState("ALL")
  const handleSetFilter = (value:string) => {
    setFilters(value)
    clearQuery(); 
  };
  console.log(filtered)
  useEffect(()=>{
    const fetchAllData = async ()=>{
      try {
      let url = "https://django-note-app-naxf.onrender.com/notes/";
        if (query) {
          url += `?search=${query}`;
        } else if (filtered !== "ALL") {
          url += `?cat=${filtered}`;
        }
        const res = await fetch(url,{
          method:"GET"
        })
        const data =await res.json()
        setAllNotes(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllData()
  },[query,setAllNotes,filtered])

  return (
    <div className="py-4 bg-gray-50">
      <Filter setFilters={handleSetFilter} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {
          allNotes?.map((item)=>(
            <NoteCardContainer key={item.id} {...item} />
          ))
        }
      </div>
    </div>
  );
}