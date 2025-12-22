import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResume();
  const { education } = resumeData;
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    institution_name: '',
    degree: '',
    field_of_study: '',
    cgpa: '',
    start_year: '',
    pass_out_year: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      updateEducation(editingIndex, formData);
      setEditingIndex(null);
    } else {
      addEducation(formData);
    }
    setFormData({
      institution_name: '',
      degree: '',
      field_of_study: '',
      cgpa: '',
      start_year: '',
      pass_out_year: '',
      description: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(education[index]);
    setEditingIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Education</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name *</label>
            <input
              type="text"
              name="institution_name"
              value={formData.institution_name}
              onChange={handleChange}
              required
              placeholder="IIT Delhi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              placeholder="B.Tech"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
            <input
              type="text"
              name="field_of_study"
              value={formData.field_of_study}
              onChange={handleChange}
              placeholder="Computer Science"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
            <input
              type="number"
              step="0.01"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="8.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
            <input
              type="number"
              name="start_year"
              value={formData.start_year}
              onChange={handleChange}
              placeholder="2019"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pass Out Year *</label>
            <input
              type="number"
              name="pass_out_year"
              value={formData.pass_out_year}
              onChange={handleChange}
              required
              placeholder="2023"
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
            placeholder="Any additional info..."
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editingIndex !== null ? 'Update Education' : 'Add Education'}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setFormData({
                institution_name: '',
                degree: '',
                field_of_study: '',
                cgpa: '',
                start_year: '',
                pass_out_year: '',
                description: '',
              });
            }}
            className="ml-2 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      {education.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">Education Records</h3>
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3 border-l-4 border-secondary">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{edu.degree} in {edu.field_of_study}</h4>
                  <p className="text-sm text-gray-600">{edu.institution_name}</p>
                  <p className="text-xs text-gray-500">{edu.start_year} - {edu.pass_out_year}</p>
                  {edu.cgpa && <p className="text-sm">CGPA: {edu.cgpa}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEducation(index)}
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

export default EducationForm;
