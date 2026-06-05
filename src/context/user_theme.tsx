import { createContext } from "react";


interface theme {
    colorMode: string,
    setColorMode: React.Dispatch<React.SetStateAction<string>>
}
export const UserTheme = createContext<theme>(null);