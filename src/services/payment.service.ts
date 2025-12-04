
import api from "@/lib/axios";
import { endpoints } from "@/config/api";

export function getPayments() {
    return api.get(endpoints.payments);
}
