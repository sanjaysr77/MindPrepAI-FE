
type SmallCardPros = {
    title: string;
    image: string;
}
export function SmallCard ({title, image}: SmallCardPros) {
    return (
        <div className="bg-gray-200 h-30 w-30 rounded-lg border border-black flex flex-col items-center justify-center
        transistion duration-200 ease-in-out
        hover:bg-gray-300 active:scale-95 cursor-pointer
        lg:h-40 lg:w-40">
            <img src = {image} className="h-20" />
            <div>{title}</div>
        </div>
    )
}