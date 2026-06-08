import { useState } from "react";
import { UserTheme } from "./user_theme";

interface provider {
    children: React.JSX.Element
}
export function UserThemeProvider({ children }: provider) {

    const [colorMode, setColorMode] = useState<string>('ligh')

    return (
        <>
            <UserTheme.Provider value={{ colorMode, setColorMode }}>
                {children}
            </UserTheme.Provider>
        </>
    )

}