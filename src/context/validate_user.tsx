import { useState } from "react"

export function useValidation() {
    const [onValidation, setOnValidation] = useState(true);
    return { onValidation, setOnValidation };
}