
// 1. Define the User interface
interface User {
    id: number;
    username: string,
    fullname: string,
    password: string,
    email: string,
    bio: string,
    avatarUrl: string,
    usertag: string,
    ratings: number,
    followers: number
}

export function userAccount() {
    // 2. Explicitly type the Database object
    const Database: Record<string, User> = {
        'elktrumelk@gmail.com': { id: 1, username: 'ElktrumElk', ratings: 8000, followers: 12000, usertag: '@vector_runner', fullname: 'Elkanah Cole', password: '123456789', email: 'elktrumelk@gmail.com', bio: 'I am the Vector Runner', 
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" },
        'sheik@gmail.com': { id: 2, username: 'Sheiketo', ratings: 3600, followers: 4500, usertag: '@sheik', fullname: 'Sheik Yusuf Kamara ', password: '246810', email: 'sheik@gmail.com', bio: 'Sheikito We move',
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        }
    };

    return { Database };
}
