import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const SkillsForm = () => {
  const { resumeData, addSkill, updateSkill, deleteSkill } = useResume();
  const { skills } = resumeData;
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Languages',
    skill_name: '',
    proficiency_level: 'Intermediate',
  });

  const categories = ['Languages', 'Frameworks', 'Tools', 'Databases', 'Platforms', 'Other'];
  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      updateSkill(editingIndex, formData);
      setEditingIndex(null);
    } else {
      addSkill(formData);
    }
    setFormData({
      category: 'Languages',
      skill_name: '',
      proficiency_level: 'Intermediate',
    });
  };

  const handleEdit = (index) => {
    setFormData(skills[index]);
    setEditingIndex(index);
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill, index) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push({ ...skill, index });
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Technical Skills</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name *</label>
            <input
              type="text"
              name="skill_name"
              value={formData.skill_name}
              onChange={handleChange}
              required
              placeholder="Python"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level</label>
            <select
              name="proficiency_level"
              value={formData.proficiency_level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editingIndex !== null ? 'Update Skill' : 'Add Skill'}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setFormData({
                category: 'Languages',
                skill_name: '',
                proficiency_level: 'Intermediate',
              });
            }}
            className="ml-2 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      {skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">Skills by Category</h3>
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="mb-4">
              <h4 className="font-semibold text-primary mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{skill.skill_name}</span>
                    {skill.proficiency_level && (
                      <span className="text-xs text-blue-600">({skill.proficiency_level})</span>
                    )}
                    <button
                      onClick={() => handleEdit(skill.index)}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteSkill(skill.index)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
