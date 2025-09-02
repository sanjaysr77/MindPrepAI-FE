import { CardProvider } from "../components/cardcomponents/CardContext";
import { CardStructure } from "../components/cardcomponents/CardStructure";

export function HomePage() {

    const subjects = [
        { image: "/database.svg", title: "DBMS" },
        { image: "/OOPS.png", title: "OOPS" },
        { image: "/OS.jpeg", title: "OS" },
        { image: "/networks.jpeg", title: "Networks" },
    ]

    const companies = [
        { image: "/infosys.png", title: "Infosys" },
        { image: "/wipro.png", title: "Wipro" },
        { image: "/TCS.png", title: "TCS" },
        { image: "/capegemini.png", title: "Capgemini" },
    ];

    const roles = [
        { image: "/MERN.png", title: "MERN Stack" },
        { image: "/React.png", title: "React" },
        { image: "/java.png", title: "Java Full Stack" },
        { image: "/python.png", title: "Python Full Stack" },
    ]

    const subjectwise = { title2: "Not able to find your subject ? Try our AI feature.", inputBox: <input type="text" className="placeholder-white border p-2 rounded" placeholder="Data Structures"/> };

    const roleWise = { title2: "Not able to find your preffered role ? Try our AI feature.", inputBox: <input type="text" className="border p-2 rounded" /> };

    const companyWise = { title2: "Not able to find your preffered company ? Try our AI feature.", inputBox: <input type="text" className="border p-2 rounded" /> };


    return (
        <div className="p-4 sm:p-6 lg:p-8 lg:space-y-8">
            <CardProvider subjects={subjects} GENAI={subjectwise}>
                <CardStructure title="Subject Wise MCQ's" />
            </CardProvider>

            <CardProvider subjects={roles} GENAI={roleWise}>
                <CardStructure title="Role Wise MCQ's" />
            </CardProvider>
            <CardProvider subjects={companies} GENAI={companyWise}>
                <CardStructure title="Company Wise MCQ's" />
            </CardProvider>

        </div>
    )
}