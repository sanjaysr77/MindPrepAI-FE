import { AICard } from "./AICard";
import { useCardContext } from "./CardContext";
import { SmallCard } from "./SmallCard";

export function CardStructure({ title }: { title: string }) {
  const { subjects } = useCardContext();
  return (
    <div className="flex">
      <div className="
        bg-gray-100 border border-black rounded-lg p-2 mt-12 ml-5 h-30 w-70 
        sm:w-100 sm:h-50
        md:w-140 
        lg:w-200 lg:h-60 lg:ml-20
      ">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold text-center
          lg:text-2xl">{title}</h2>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex gap-2 mt-4">
            {subjects.map((subject, index) => (
              <SmallCard key={index} image={subject.image}
                title={subject.title} />
            )
            )}
          </div>
        </div>
      </div>
      <AICard />
    </div>
  )
}
