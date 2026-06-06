import { useNavigate } from "react-router-dom";
import api from "../data/axios";


interface Login {
  email: string;
  password: string;
}
export function UserLogin() {
  const navigate = useNavigate();

  const submitCredentials = async ({ email, password }: Login) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("data", JSON.stringify(data.user));
    console.log(data.user);
    navigate("/verifyemail", { replace: true });
  };

  return { submitCredentials };
}

export const GetData = () => {

  const userData = async () => {
    const reqData = localStorage.getItem("data");
    const parseData = JSON.parse(reqData as unknown as string);

    if (parseData) {
      const data = new Promise((resolve) => {
        if (parseData) {
          resolve(parseData);
        } else {
          resolve("No data!");
        }
      });

      return await Promise.all([data]);
    }
    
    const data = await api.get('/api/auth/me')

    return data
  };

  return {userData}
};
