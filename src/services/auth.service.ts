import api from "@/lib/axios";
import Cookies from "js-cookie";
import { endpoints } from "@/config/api";

export async function loginService(payload: { email: string; password: string }) {
    const res = await api.post(endpoints.login, payload);
    Cookies.set("token", res.data.token);
    return res.data;
}

export async function signupService(payload: any) {
    const res = await api.post(endpoints.signup, payload);
    return res.data;
}

export async function getProfileService() {
    const res = await api.get(endpoints.profile);
    return res.data;
}

export async function logoutService() {
    Cookies.remove("token");
}

export function getToken() {
    return Cookies.get("token");
}
