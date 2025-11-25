export const API_BASE_URL = "https://lunetronwebservices.pythonanywhere.com/api/v1";

export const endpoints = {
    // Auth
    login: `${API_BASE_URL}/auth/login/`,
    signup: `${API_BASE_URL}/auth/signup/`,
    profile: `${API_BASE_URL}/auth/profile/`,
    refreshToken: `${API_BASE_URL}/auth/refresh/`,

    // Entities
    organization: `${API_BASE_URL}/organizations`,
    accounts: `${API_BASE_URL}/accounts/`,
    branches: `${API_BASE_URL}/branches/`,
    products: `${API_BASE_URL}/products/`,

    // Orders
    orders: `${API_BASE_URL}/orders/`,

    // Order Actions
    uploadDocument: (orderId: number) =>
        `${API_BASE_URL}/orders/${orderId}/upload-document/`,
    sendSignatureRequest: (orderId: number) =>
        `${API_BASE_URL}/orders/${orderId}/send-signature-request/`,
    makePayment: (orderId: number) =>
        `${API_BASE_URL}/orders/${orderId}/make-payment/`,

    // Webhooks (You won't call these from frontend)
    webhookSignature: `${API_BASE_URL}/webhooks/signature/`,
    webhookPayments: `${API_BASE_URL}/payments/webhook/`,

    // Invoice
    invoice: (invoiceId: number) => `${API_BASE_URL}/invoices/${invoiceId}/`,
};
