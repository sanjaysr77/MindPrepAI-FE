import { CardProvider } from "../components/CardContext";
import { CardStructure } from "../components/CardStructure";

export function HomePage() {

    const subjects = [
        { image: "/database.svg", title: "DBMS" },
        { image: "/OOPS.png", title: "OOPS" },
        { image: "/OS.jpeg", title: "OS" }
    ]
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
            <CardProvider subjects = {subjects}>
                <CardStructure title = "Subject Wise MCQ's" />
            </CardProvider>
        </div>
    )
}