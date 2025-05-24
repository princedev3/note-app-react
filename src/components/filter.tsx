import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Filter = ({setFilters}:{setFilters:(item:string)=>void}) => {
   const categories = [
  { name: "BUSINESS" },
  { name: "ALL" },
  { name: "PERSONAL" },
  { name: "IMPORTANT" }
];
  return (
    <div className=" grid w-full  place-content-center mx-auto">
 <Select  onValueChange={setFilters}>
  <SelectTrigger className="w-[450px] !p-6">
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
  )
}

export default Filter