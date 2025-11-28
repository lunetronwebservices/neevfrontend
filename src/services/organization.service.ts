import api from "@/lib/axios";
import { endpoints } from "@/config/api";


export function getOrganizations() {
    return api.get(endpoints.organization);
}