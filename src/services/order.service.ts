import api from "@/lib/axios";
import { endpoints } from "@/config/api";

export function createOrder(payload: any) {
    return api.post(endpoints.orders, payload);
}

export function uploadDocument(orderId: number, formData: FormData) {
    return api.post(endpoints.uploadDocument(orderId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function sendSignatureRequest(orderId: number, payload: any) {
    return api.post(endpoints.sendSignatureRequest(orderId), payload);
}

export function makePayment(orderId: number, payload: any) {
    return api.post(endpoints.makePayment(orderId), payload);
}

export function getInvoice(invoiceId: number) {
    return api.get(endpoints.invoice(invoiceId));
}
