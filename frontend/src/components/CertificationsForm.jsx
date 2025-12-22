import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const CertificationsForm = () => {
  const { resumeData, addCertification, updateCertification, deleteCertification } = useResume();
  const { certifications } = resumeData;
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    certification_name: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    credential_url: '',
    credential_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      updateCertification(editingIndex, formData);
      setEditingIndex(null);
    } else {
      addCertification(formData);
    }
    setFormData({
      certification_name: '',
      issuing_organization: '',
      issue_date: '',
      expiry_date: '',
      credential_url: '',
      credential_id: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(certifications[index]);
    setEditingIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Certifications</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name *</label>
            <input
              type="text"
              name="certification_name"
              value={formData.certification_name}
              onChange={handleChange}
              required
              placeholder="AWS Certified Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization *</label>
            <input
              type="text"
              name="issuing_organization"
              value={formData.issuing_organization}
              onChange={handleChange}
              required
              placeholder="Amazon Web Services"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
            <input
              type="date"
              name="issue_date"
              value={formData.issue_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
            <input
              type="text"
              name="credential_id"
              value={formData.credential_id}
              onChange={handleChange}
              placeholder="ABC123XYZ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credential URL</label>
            <input
              type="url"
              name="credential_url"
              value={formData.credential_url}
              onChange={handleChange}
              placeholder="https://example.com/verify"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editingIndex !== null ? 'Update Certification' : 'Add Certification'}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setFormData({
                certification_name: '',
                issuing_organization: '',
                issue_date: '',
                expiry_date: '',
                credential_url: '',
                credential_id: '',
              });
            }}
            className="ml-2 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      {certifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">Certifications List</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3 border-l-4 border-secondary">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{cert.certification_name}</h4>
                  <p className="text-sm text-gray-600">{cert.issuing_organization}</p>
                  {cert.issue_date && <p className="text-xs text-gray-500">Issued: {cert.issue_date}</p>}
                  {cert.credential_id && <p className="text-xs text-gray-500">ID: {cert.credential_id}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCertification(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
