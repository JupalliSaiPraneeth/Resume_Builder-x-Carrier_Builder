import React from 'react';
import { useResume } from '../context/ResumeContext';

const ResumePreview = React.forwardRef((props, ref) => {
  const { resumeData, sectionOrder } = useResume();
  const { personal_details, education, projects, skills, internships, certifications } = resumeData;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Section renderer components
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return null; // Header is always first
      case 'education':
        return education.length > 0 ? (
          <div className="resume-section mb-4">
            <h2 className="resume-section-header text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-2">
              EDUCATION
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="resume-item mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">
                      {edu.degree}
                      {edu.field_of_study && ` in ${edu.field_of_study}`}
                    </h3>
                    <p className="text-sm text-gray-700">{edu.institution_name}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.start_year && edu.pass_out_year
                      ? `${edu.start_year} - ${edu.pass_out_year}`
                      : edu.pass_out_year}
                  </span>
                </div>
                {edu.cgpa && <p className="text-xs text-gray-600">CGPA: {edu.cgpa}</p>}
                {edu.description && <p className="text-xs text-gray-600">{edu.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'skills':
        return skills.length > 0 ? (
          <div className="resume-section mb-4">
            <h2 className="resume-section-header text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-2">
              TECHNICAL SKILLS
            </h2>
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="resume-item mb-2">
                <p className="text-sm">
                  <span className="font-semibold">{category}:</span>{' '}
                  {categorySkills.map((s) => s.skill_name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        ) : null;
      case 'projects':
        return projects.length > 0 ? (
          <div className="resume-section mb-4">
            <h2 className="resume-section-header text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-2">
              PROJECTS
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="resume-item mb-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm">{project.title}</h3>
                  {project.start_date && (
                    <span className="text-sm text-gray-600">
                      {project.start_date} to {project.is_ongoing ? 'Present' : project.end_date}
                    </span>
                  )}
                </div>
                {project.tech_stack && (
                  <p className="text-xs text-gray-600">Tech: {project.tech_stack}</p>
                )}
                {project.description && (
                  <p className="text-xs leading-relaxed text-gray-700">{project.description}</p>
                )}
                 {project.github_link && (
                   <p className="text-xs mt-1">
                     <a
                       href={project.github_link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-secondary underline hover:text-primary font-semibold"
                     >
                       Visit Link
                     </a>
                   </p>
                 )}
              </div>
            ))}
          </div>
        ) : null;
      case 'internships':
        return internships.length > 0 ? (
          <div className="resume-section mb-4">
            <h2 className="resume-section-header text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-2">
              INTERNSHIPS
            </h2>
            {internships.map((internship, index) => (
              <div key={index} className="resume-item mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">{internship.position}</h3>
                    <p className="text-sm text-gray-700">{internship.company_name}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {internship.start_date} to {internship.is_ongoing ? 'Present' : internship.end_date}
                  </span>
                </div>
                {internship.duration_months && (
                  <p className="text-xs text-gray-600">Duration: {internship.duration_months} months</p>
                )}
                {internship.description && (
                  <p className="text-xs leading-relaxed text-gray-700">{internship.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : null;
      case 'certifications':
        return certifications.length > 0 ? (
          <div className="resume-section mb-4">
            <h2 className="resume-section-header text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-2">
              CERTIFICATIONS
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="resume-item mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">{cert.certification_name}</h3>
                    <p className="text-sm text-gray-700">{cert.issuing_organization}</p>
                  </div>
                  {cert.issue_date && (
                    <span className="text-sm text-gray-600">{cert.issue_date}</span>
                  )}
                </div>
                {cert.credential_id && (
                  <p className="text-xs text-gray-600">ID: {cert.credential_id}</p>
                )}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className="a4-paper bg-white text-gray-800">
      {/* Header - Always First */}
      <div className="border-b-2 border-primary pb-4 mb-4">
        <h1 className="text-3xl font-bold text-primary">
          {personal_details.full_name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm mt-2 text-gray-600">
          {personal_details.email && (
            <span>{personal_details.email}</span>
          )}
          {personal_details.phone && (
            <span>{personal_details.phone}</span>
          )}
          {personal_details.location && (
            <span>{personal_details.location}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {personal_details.linkedin_url && (
            <a href={personal_details.linkedin_url} className="text-secondary hover:underline">
              LinkedIn
            </a>
          )}
          {personal_details.github_url && (
            <a href={personal_details.github_url} className="text-secondary hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personal_details.professional_summary && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed">{personal_details.professional_summary}</p>
        </div>
      )}

      {/* Render sections in user-defined order */}
      {sectionOrder.map((sectionId) => renderSection(sectionId))}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
