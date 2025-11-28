

import React from "react";

const organizations = [
  { name: "Lunitron web services", domain: "lunitron.com", address: "indra nagar , banguluru", status: "Active" },
  { name: "TCS", domain: "Tcs.com", address: "456 Rainy Rd, NOida", status: "active" },
  { name: "jindal Ltd", domain: "jindal.in", address: "456 Rainy Rd, Pune", status: "active" },
  
];

const OrganizationList: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Organization List</h1>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Organization</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Domain</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {organizations.map((org, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{org.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{org.domain}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{org.address}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${org.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                {org.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrganizationList;
