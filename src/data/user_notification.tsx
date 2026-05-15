


export function userNotification() {
    const notify = {
        'sheik': [
            {id: '1', isUnread: false, message: 'Alice Gborie follewd you', time: 'just now', type: 'follow' },
            {id: '2', isUnread: true, message: "New Security update", time: '1 hour ago', type: 'system' },
        ],

        'vector_runner': [
            {id: '1', isUnread: true, message: 'Post Uploaded successfully', time: '2 days ago', type: 'post'},
            {id: '2', isUnread: false, message: "New Security update", time: '1 hour ago', type: 'system'},
        ]
    }

    return { notify }
}