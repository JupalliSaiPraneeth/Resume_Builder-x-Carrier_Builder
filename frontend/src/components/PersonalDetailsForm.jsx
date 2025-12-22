import React from 'react';
import { useResume } from '../context/ResumeContext';

const PersonalDetailsForm = () => {
  const { resumeData, updatePersonalDetails } = useResume();
  const { personal_details } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalDetails({ [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Personal Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={personal_details.full_name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={personal_details.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={personal_details.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={personal_details.location}
            onChange={handleChange}
            placeholder="City, State"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin_url"
            value={personal_details.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
          <input
            type="url"
            name="github_url"
            value={personal_details.github_url}
            onChange={handleChange}
            placeholder="https://github.com/johndoe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
        <textarea
          name="professional_summary"
          value={personal_details.professional_summary}
          onChange={handleChange}
          placeholder="Brief professional summary..."
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
