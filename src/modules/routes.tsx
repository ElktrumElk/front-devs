
export const routes = {
    home: '/app/home',
    login: '/login',
    verifyEmail: '/verifyemail',
    splash: '/splash',
    setting: '/app/settings',
    posts: '/app/user/post',
    userProfile: (username?: string) => username ? `/app/user/${username}` : '/app/user/profile'
}
