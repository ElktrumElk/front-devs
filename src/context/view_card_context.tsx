import { useState } from "react";


export default function useViewCardContext() {
    const [isViewCard, setIsViewCard] = useState(false);
    const [viewCardId, setViewCardId] = useState<number>(null);

    return {isViewCard,  setIsViewCard, viewCardId, setViewCardId}
}