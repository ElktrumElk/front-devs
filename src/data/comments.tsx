
import { useEffect, useState } from "react"


export function UserComment() {


    const [comments, setComments] = useState({
        c01: [
            { id: 2, userCommentName: 'AG', comment: "I'm Amaized", time: '4 min ago' },
            { id: 1, userCommentName: 'Sheikito', comment: "I'm Amaized", time: '1 hr ago' },
        ],
        c02: [
            { id: 2, userCommentName: 'William', comment: "Nice layout", time: '4 min ago' },
            { id: 1, userCommentName: 'favmaclegend', comment: "Well Responsive", time: '27 min ago' },
        ],
        c04: [
            { id: 2, userCommentName: 'Sheik', comment: "I'm Amaized", time: '4 min ago' },
            { id: 1, userCommentName: 'Sheikito', comment: "I'm Amaized", time: '1 hr ago' },
        ]

    })

    return { comments, setComments }
}