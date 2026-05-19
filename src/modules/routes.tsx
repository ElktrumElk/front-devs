
export const routes = {
    home: '/app/home',
    login: '/login',
    verifyEmail: '/verifyemail',
    splash: '/splash',
    userProfile: (username?: string) => username ? `/app/user/${username}` : '/app/user/profile'
}
