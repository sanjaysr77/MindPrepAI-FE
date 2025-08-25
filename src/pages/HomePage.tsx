import { CardProvider } from "../components/CardContext";
import { CardStructure } from "../components/CardStructure";

export function HomePage() {

    const subjects = [
        { image: "/database.svg", title: "DBMS" },
        { image: "/OOPS.png", title: "OOPS" },
        { image: "/OS.jpeg", title: "OS" }
    ]

    const companies = [
    { image: "/infosys.png", title: "Infosys" },
    { image: "/wipro.png", title: "Wipro" },
    { image: "/TCS.png", title: "TCS" }
  ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 lg:space-y-8">
            <CardProvider subjects = {subjects}>
                <CardStructure title = "Subject Wise MCQ's" />
            </CardProvider>

            <CardProvider subjects = {companies}>
                <CardStructure title = "Company Wise MCQ's" />
            </CardProvider>
        </div>
    )
}