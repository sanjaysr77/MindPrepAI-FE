type SmallCardPros = {
    title: string;
    image: string;
}
export function SmallCard({ title, image }: SmallCardPros) {
    return (
        <div className="bg-gray-200 h-20 w-20 rounded-lg border border-black flex flex-col items-center justify-center mt-2
        transistion duration-200 ease-in-out
        hover:bg-gray-300 active:scale-95 cursor-pointer
        sm:h-30 sm:w-30
        md:h-25 md:w-25
        lg:h-40 lg:w-40">
            <img src={image} className="h-5 w-8
            md:h-13 md:w-20 mt-2
            lg:h-20 lg:w-30" />
            <div className="mt-2 hidden sm:block text-sm md:text-base lg:text-lg">
                {title}
            </div>

        </div>
    )
}