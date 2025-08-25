import { AICard } from "./AICard";

export function CardStructure () {
  return (
    <div className="flex">
      <div className="
        bg-gray-100 border border-black rounded-lg p-2 mt-12 ml-5 h-40 w-70 
        sm:w-90 
        md:w-120 
        lg:w-200 lg:h-50 lg:ml-20
      ">
      </div>
      <AICard />
    </div>
  )
}
