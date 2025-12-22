/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import { useCallback } from 'react';
import { useResume } from '../context/ResumeContext';
import {
  resumeAPI,
  educationAPI,
  projectsAPI,
  skillsAPI,
  internshipsAPI,
  certificationsAPI,
  personalDetailsAPI,
} from '../services/api';

export const useSaveResume = () => {
  const {
    resumeData,
    updateResumeData,
    setLoading,
    setError,
    userId,
  } = useResume();

  const saveResume = useCallback(async () => {
    if (!userId) {
      setError('User ID not set');
      return null;
    }

    setLoading(true);

    try {
      let resumeId = resumeData.id;

      // ===== CREATE / UPDATE RESUME =====
      if (!resumeId) {
        console.log('[SAVE] Creating new resume with userId:', userId, 'title:', resumeData.title);
        const resumeRes = await resumeAPI.createResume(userId, resumeData.title);
        console.log('[SAVE] Resume created with ID:', resumeRes.data.id);
        resumeId = resumeRes.data.id;

        // ✅ STORE resume_id in context
        updateResumeData({ id: resumeId });
      } else {
        await resumeAPI.updateResume(resumeId, { title: resumeData.title });
      }

      // ===== PERSONAL DETAILS =====
      if (resumeData.personal_details) {
        if (resumeData.personal_details.id) {
          await personalDetailsAPI.updatePersonalDetails(
            resumeData.personal_details.id,
            resumeData.personal_details
          );
        } else {
          const res = await personalDetailsAPI.createPersonalDetails({
            resume_id: resumeId,
            ...resumeData.personal_details,
          });

          updateResumeData({
            personal_details: {
              ...resumeData.personal_details,
              id: res.data.id,
            },
          });
        }
      }

      // ===== EDUCATION =====
      for (let i = 0; i < resumeData.education.length; i++) {
        const edu = resumeData.education[i];

        if (edu.id) {
          await educationAPI.updateEducation(edu.id, edu);
        } else {
          const res = await educationAPI.createEducation({
            resume_id: resumeId,
            ...edu,
          });

          resumeData.education[i].id = res.data.id;
        }
      }

      // ===== PROJECTS =====
      for (let i = 0; i < resumeData.projects.length; i++) {
        const project = resumeData.projects[i];

        if (project.id) {
          await projectsAPI.updateProject(project.id, project);
        } else {
          const res = await projectsAPI.createProject({
            resume_id: resumeId,
            ...project,
          });

          resumeData.projects[i].id = res.data.id;
        }
      }

      // ===== SKILLS =====
      for (let i = 0; i < resumeData.skills.length; i++) {
        const skill = resumeData.skills[i];

        if (skill.id) {
          await skillsAPI.updateSkill(skill.id, skill);
        } else {
          const res = await skillsAPI.createSkill({
            resume_id: resumeId,
            ...skill,
          });

          resumeData.skills[i].id = res.data.id;
        }
      }

      // ===== INTERNSHIPS =====
      for (let i = 0; i < resumeData.internships.length; i++) {
        const internship = resumeData.internships[i];

        if (internship.id) {
          await internshipsAPI.updateInternship(internship.id, internship);
        } else {
          const res = await internshipsAPI.createInternship({
            resume_id: resumeId,
            ...internship,
          });

          resumeData.internships[i].id = res.data.id;
        }
      }

      // ===== CERTIFICATIONS =====
      for (let i = 0; i < resumeData.certifications.length; i++) {
        const cert = resumeData.certifications[i];

        if (cert.id) {
          await certificationsAPI.updateCertification(cert.id, cert);
        } else {
          const res = await certificationsAPI.createCertification({
            resume_id: resumeId,
            ...cert,
          });

          resumeData.certifications[i].id = res.data.id;
        }
      }

      setLoading(false);
      return resumeId;
    } catch (err) {
      console.error('[SAVE] Error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to save resume';
      setError(errorMsg);
      setLoading(false);
      return null;
    }
  }, [resumeData, userId, setLoading, setError, updateResumeData]);

  return { saveResume };
};

export const useLoadResume = () => {
  const { updateResumeData, setLoading, setError } = useResume();

  const loadResume = useCallback(async (resumeId) => {
    setLoading(true);
    try {
      const res = await resumeAPI.getResume(resumeId);
      updateResumeData(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.message || 'Failed to load resume');
      setLoading(false);
      return null;
    }
  }, [updateResumeData, setLoading, setError]);

  return { loadResume };
};
