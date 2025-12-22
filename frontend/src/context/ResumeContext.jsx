/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    id: null,
    title: 'My Resume',
    personal_details: {
      full_name: '',
      email: '',
      phone: '',
      linkedin_url: '',
      github_url: '',
      location: '',
      professional_summary: '',
    },
    education: [],
    projects: [],
    skills: [],
    internships: [],
    certifications: [],
  });

  // Track section order for drag-and-drop
  const [sectionOrder, setSectionOrder] = useState([
    'personal',
    'education',
    'skills',
    'projects',
    'internships',
    'certifications',
  ]);

  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateResumeData = (newData) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updatePersonalDetails = (details) => {
    setResumeData((prevData) => ({
      ...prevData,
      personal_details: {
        ...prevData.personal_details,
        ...details,
      },
    }));
  };

  const addEducation = (education) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: [...prevData.education, education],
    }));
  };

  const updateEducation = (index, education) => {
    setResumeData((prevData) => {
      const newEducation = [...prevData.education];
      newEducation[index] = education;
      return {
        ...prevData,
        education: newEducation,
      };
    });
  };

  const deleteEducation = (index) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  const addProject = (project) => {
    setResumeData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, project],
    }));
  };

  const updateProject = (index, project) => {
    setResumeData((prevData) => {
      const newProjects = [...prevData.projects];
      newProjects[index] = project;
      return {
        ...prevData,
        projects: newProjects,
      };
    });
  };

  const deleteProject = (index) => {
    setResumeData((prevData) => ({
      ...prevData,
      projects: prevData.projects.filter((_, i) => i !== index),
    }));
  };

  const addSkill = (skill) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, skill],
    }));
  };

  const updateSkill = (index, skill) => {
    setResumeData((prevData) => {
      const newSkills = [...prevData.skills];
      newSkills[index] = skill;
      return {
        ...prevData,
        skills: newSkills,
      };
    });
  };

  const deleteSkill = (index) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const addInternship = (internship) => {
    setResumeData((prevData) => ({
      ...prevData,
      internships: [...prevData.internships, internship],
    }));
  };

  const updateInternship = (index, internship) => {
    setResumeData((prevData) => {
      const newInternships = [...prevData.internships];
      newInternships[index] = internship;
      return {
        ...prevData,
        internships: newInternships,
      };
    });
  };

  const deleteInternship = (index) => {
    setResumeData((prevData) => ({
      ...prevData,
      internships: prevData.internships.filter((_, i) => i !== index),
    }));
  };

  const addCertification = (certification) => {
    setResumeData((prevData) => ({
      ...prevData,
      certifications: [...prevData.certifications, certification],
    }));
  };

  const updateCertification = (index, certification) => {
    setResumeData((prevData) => {
      const newCertifications = [...prevData.certifications];
      newCertifications[index] = certification;
      return {
        ...prevData,
        certifications: newCertifications,
      };
    });
  };

  const deleteCertification = (index) => {
    setResumeData((prevData) => ({
      ...prevData,
      certifications: prevData.certifications.filter((_, i) => i !== index),
    }));
  };

  const reorderSections = (newOrder) => {
    setSectionOrder(newOrder);
  };

  const value = {
    resumeData,
    userId,
    setUserId,
    updateResumeData,
    updatePersonalDetails,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addInternship,
    updateInternship,
    deleteInternship,
    addCertification,
    updateCertification,
    deleteCertification,
    loading,
    setLoading,
    error,
    setError,
    sectionOrder,
    reorderSections,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
