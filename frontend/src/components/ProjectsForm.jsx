import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, deleteProject } = useResume();
  const { projects } = resumeData;
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_link: '',
    start_date: '',
    end_date: '',
    is_ongoing: false,
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
      updateProject(editingIndex, formData);
      setEditingIndex(null);
    } else {
      addProject(formData);
    }
    setFormData({
      title: '',
      description: '',
      tech_stack: '',
      github_link: '',
      start_date: '',
      end_date: '',
      is_ongoing: false,
    });
  };

  const handleEdit = (index) => {
    setFormData(projects[index]);
    setEditingIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Academic Projects</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Web Chat Application"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
            <input
              type="text"
              name="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              placeholder="React, Node.js, PostgreSQL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Link</label>
            <input
              type="url"
              name="github_link"
              value={formData.github_link}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
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
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_ongoing"
                checked={formData.is_ongoing}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Ongoing Project</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editingIndex !== null ? 'Update Project' : 'Add Project'}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setFormData({
                title: '',
                description: '',
                tech_stack: '',
                github_link: '',
                start_date: '',
                end_date: '',
                is_ongoing: false,
              });
            }}
            className="ml-2 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      {projects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">Projects List</h3>
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3 border-l-4 border-secondary">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{project.title}</h4>
                  {project.description && <p className="text-sm text-gray-600">{project.description}</p>}
                  {project.tech_stack && <p className="text-xs text-gray-500">Tech: {project.tech_stack}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(index)}
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

export default ProjectsForm;
