import { useNavigate } from "react-router-dom";
import { CardProvider } from "../components/cardcomponents/CardContext";
import { CardStructure } from "../components/cardcomponents/CardStructure";
import { ComingSoon } from "../components/ComingSoon";


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

    const subjectwise = { title2: "Not able to find your favourite subject ? Try our AI feature.", inputBox: <input type="text" className="placeholder-white border p-2 rounded" placeholder="Data Structures" /> };

    const roleWise = { title2: "Not able to find your desired role ? Try our AI feature.", inputBox: <input type="text" className="border p-2 rounded" /> };

    const companyWise = { title2: "Not able to find your desired company ? Try our AI feature.", inputBox: <input type="text" /> };

    const navigate = useNavigate()

    function logoutUser() {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    function goToReport() {
        navigate("/personalizedreport")
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div className="text-white text-4xl font-bold">
                    MINDPREP AI
                </div>
                <div>
                    <button className="text-black border border-white rounded-lg p-2 px-4 bg-white font-bold hover:bg-black hover:text-white cursor-pointer
                    transition duration-200 ease-in-out active:scale-95 mr-4"
                        onClick={goToReport}
                    >
                        Personalized Report
                    </button>
                    <button className="text-black border border-white rounded-lg p-2 px-4 bg-white font-bold hover:bg-black hover:text-white cursor-pointer
                    transition duration-200 ease-in-out active:scale-95"
                        onClick={logoutUser}
                    >
                        Signout
                    </button>
                </div>
            </div>
            <CardProvider subjects={subjects} GENAI={subjectwise}>
                <CardStructure title="Subject Wise MCQ's" />
            </CardProvider>

            <CardProvider subjects={roles} GENAI={roleWise}>
                <CardStructure title="Role Wise MCQ's" />
            </CardProvider>
            <CardProvider subjects={companies} GENAI={companyWise}>
                <CardStructure title="Company Wise MCQ's" />
            </CardProvider>
            <ComingSoon
                text="Resume Analyzer"
                image="/comingsoon.png" />
            <ComingSoon
                text="Mock Interview"
                image="/comingsoon.png" />

        </div>
    )
}