import { createContext, useContext, type ReactNode } from "react";

type Subject = {
    image: string;
    title: string;
}

type CardContextType = {
    subjects: Subject [];
}

const CardContext = createContext<CardContextType | undefined>(undefined)

export function useCardContext () {
    const context = useContext(CardContext)
    if (!context) {
        throw new Error ("useCardContext must be provided in Card Provider")
    }
    return context;
}

export function CardProvider ({children, subjects}: {children: ReactNode; subjects: Subject[] }) {
    return (
        <CardContext.Provider value ={{subjects}}>
            {children}
        </CardContext.Provider>
    )
}