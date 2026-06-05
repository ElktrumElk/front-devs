import { useState } from "react";


export default function useViewCardContext() {
    const [isViewCard, setIsViewCard] = useState(false);
    const [viewCardId, setViewCardId] = useState<string>('');

    return {isViewCard,  setIsViewCard, viewCardId, setViewCardId}
}