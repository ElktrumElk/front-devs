// 1. Define the User interface
interface User {
    id: number;
    username: string;
    fullname: string;
    password: string;
    email: string;
}

export function userAccount() {
    // 2. Explicitly type the Database object
    const Database: Record<string, User> = {
        'elktrumelk@gmail.com': { id: 1, username: 'ElktrumElk', fullname: 'Elkanah Cole', password: '123456789', email: 'elktrumelk@gmail.com' },
        'sheik@gmail.com': { id: 2, username: 'Sheiketo', fullname: 'Sheik Yusuf Kamara ', password: '246810', email: 'sheik@gmail.com' }
    };

    return { Database };
}
