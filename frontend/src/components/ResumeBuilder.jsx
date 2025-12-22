import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../context/ResumeContext';
import { useSaveResume } from '../hooks/useResumePersistence';

import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectsForm';
import SkillsForm from './SkillsForm';
import InternshipsForm from './InternshipsForm';
import CertificationsForm from './CertificationsForm';
import ResumePreview from './ResumePreview';

const ResumeBuilder = () => {
  const resumePreviewRef = useRef();

  const {
    resumeData,
    updateResumeData,
    sectionOrder,
    reorderSections,
  } = useResume();

  const { saveResume } = useSaveResume();

  const [activeTab, setActiveTab] = useState('personal');
  const [draggedTab, setDraggedTab] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // ===== PDF DOWNLOAD =====
  const handleDownloadPDF = useReactToPrint({
    content: () => resumePreviewRef.current,
    documentTitle: `${resumeData.personal_details.full_name || 'Resume'}`,
    pageStyle: `
      @page { size: A4; margin: 5mm; }
      @media print {
        body {
          margin: 15mm;
          -webkit-print-color-adjust: exact;
        }
        .resume-section, .section-item {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        html, body {
          height: auto;
          overflow: visible;
        }
      }
    `,
  });

  // ===== SAVE RESUME =====
  const handleSaveResume = async () => {
    setIsSaving(true);
    const savedId = await saveResume();
    setIsSaving(false);

    if (savedId) {
      alert('✅ Resume saved successfully to database');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'internships', label: 'Internships' },
    { id: 'certifications', label: 'Certifications' },
  ];

  const orderedTabs = sectionOrder
    .map((id) => tabs.find((tab) => tab.id === id))
    .filter(Boolean);

  const handleDragStart = (e, tabId) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTabId) => {
    e.preventDefault();
    if (draggedTab && draggedTab !== targetTabId) {
      const newOrder = [...sectionOrder];
      const draggedIndex = newOrder.indexOf(draggedTab);
      const targetIndex = newOrder.indexOf(targetTabId);
      newOrder[draggedIndex] = targetTabId;
      newOrder[targetIndex] = draggedTab;
      reorderSections(newOrder);
    }
    setDraggedTab(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Resume Builder</h1>
          <p className="text-gray-300 mt-1">For Fresh Engineering Graduates</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {/* Resume Title */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume Title
            </label>
            <input
              type="text"
              value={resumeData.title}
              onChange={(e) => updateResumeData({ title: e.target.value })}
              placeholder="My Resume"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="flex flex-wrap border-b">
              {orderedTabs.map((tab) => (
                <button
                  key={tab.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tab.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, tab.id)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 text-center font-medium cursor-move ${
                    activeTab === tab.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === 'personal' && <PersonalDetailsForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'projects' && <ProjectsForm />}
              {activeTab === 'internships' && <InternshipsForm />}
              {activeTab === 'certifications' && <CertificationsForm />}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            {/* SAVE BUTTON */}
            <button
              onClick={handleSaveResume}
              disabled={isSaving}
              className="w-full mb-3 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
            >
              {isSaving ? 'Saving...' : '💾 Save Resume'}
            </button>

            {/* PDF BUTTON */}
            <button
              onClick={handleDownloadPDF}
              className="w-full mb-4 bg-green-600 text-white font-bold py-3 rounded-lg"
            >
              Save as PDF
            </button>

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-bold text-primary">Preview</h2>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-250px)] bg-white border rounded-lg">
              <ResumePreview ref={resumePreviewRef} />
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-white text-center py-6 mt-12">
        <p className="text-sm">© 2025 Resume Builder</p>
      </footer>
    </div>
  );
};

export default ResumeBuilder;
