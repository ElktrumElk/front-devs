const isLogin = new Promise<boolean | string>((resolve) => {

    const data = localStorage.getItem('isLogin');
    console.log(data)
    if (data === null) {
        resolve(null);
    }
    else if (data) {
        console.log(data)

        resolve(true)
    }
    else {
        resolve(false);
    }
});

const isVerified = new Promise<boolean | string>((resolve) => {
    const info = localStorage.getItem('isEmailVerify');

    if (info === null) {
        resolve(null)
    }
    else if (info) {
        resolve(true);
    }
    else {
        resolve(false);
    }
});

export async function userAuthentication() {
    const userLoggedIn = isLogin;
    const userVerified = isVerified;
    const [loginResponse, emailResponse] = await Promise.allSettled([userLoggedIn, userVerified]);
    return { loginResponse, emailResponse };

}