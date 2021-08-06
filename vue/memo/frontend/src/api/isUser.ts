import client from "@/api/client";
import JwtDecode, { JwtPayload } from "jwt-decode";

interface JwtPayLoad extends JwtPayload {
  sub: string;
}
const token = localStorage.getItem("accessToken");
const { sub } = JwtDecode<JwtPayload>(token as string);
const requestUser = async () => {
  return await client.get(`/api/users/${sub}`);
};

export { requestUser };
