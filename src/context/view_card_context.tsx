import { useState } from "react";


export default function useViewCardContext() {
    const [isViewCard, setIsViewCard] = useState(false);
    const [viewCardId, setViewCardId] = useState<number>(0);

    return {isViewCard,  setIsViewCard, viewCardId, setViewCardId}
}