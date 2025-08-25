type SmallCardPros = {
    title: string;
    image: string;
}
export function SmallCard ({title, image}: SmallCardPros) {
    return (
        <div className="bg-gray-200 h-20 w-20 rounded-lg border border-black flex flex-col items-center justify-center
        transistion duration-200 ease-in-out
        hover:bg-gray-300 active:scale-95 cursor-pointer
        sm:h-25 sm:w-25
        md:h-30 md:w-30
        lg:h-40 lg:w-40">
            <img src = {image} className="h-8
            md:h-15 md:w-20
            lg:h-20 lg:w-30" />
            <div>{title}</div>
        </div>
    )
}