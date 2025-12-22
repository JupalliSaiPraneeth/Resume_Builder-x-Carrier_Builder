import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const InternshipsForm = () => {
  const { resumeData, addInternship, updateInternship, deleteInternship } = useResume();
  const { internships } = resumeData;
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
    is_ongoing: false,
    duration_months: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      updateInternship(editingIndex, formData);
      setEditingIndex(null);
    } else {
      addInternship(formData);
    }
    setFormData({
      company_name: '',
      position: '',
      description: '',
      start_date: '',
      end_date: '',
      is_ongoing: false,
      duration_months: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(internships[index]);
    setEditingIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Internships</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              placeholder="Tech Company Ltd."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Software Development Intern"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              disabled={formData.is_ongoing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (months)</label>
            <input
              type="number"
              name="duration_months"
              value={formData.duration_months}
              onChange={handleChange}
              placeholder="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_ongoing"
              checked={formData.is_ongoing}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">Currently Interning</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editingIndex !== null ? 'Update Internship' : 'Add Internship'}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setFormData({
                company_name: '',
                position: '',
                description: '',
                start_date: '',
                end_date: '',
                is_ongoing: false,
                duration_months: '',
              });
            }}
            className="ml-2 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      {internships.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">Internship Records</h3>
          {internships.map((internship, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3 border-l-4 border-secondary">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{internship.position}</h4>
                  <p className="text-sm text-gray-600">{internship.company_name}</p>
                  <p className="text-xs text-gray-500">
                    {internship.start_date} to {internship.is_ongoing ? 'Present' : internship.end_date}
                  </p>
                  {internship.duration_months && <p className="text-sm">Duration: {internship.duration_months} months</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteInternship(index)}
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

export default InternshipsForm;
