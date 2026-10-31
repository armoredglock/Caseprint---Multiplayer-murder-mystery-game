import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

import SuspectDossier from './SuspectDossier';
import WitnessStatement from './WitnessStatement';
import ForensicReport from './ForensicReport';
import EvidenceLog from './EvidenceLog';
import DigitalEvidence from './DigitalEvidence';
import CaseTimeline from './CaseTimeline';
import RealisticPaperclip from '../ui/RealisticPaperclip';

// Placeholders for the remaining two
const IncidentReport = ({ overview }) => {
  if (!overview) return <div className="p-4 font-mono">LOADING EVIDENCE FILE...</div>;
  return (
  <div className="bg-[#fcfbf9] p-4 md:p-6 font-mono text-sm text-gray-800 relative border border-gray-200 shadow-sm">
    {/* Realistic Paperclip holding Incident Report */}
    <RealisticPaperclip className="-top-3 right-6" angle={8} size={56} variant="steel" />
    <div className="stamp stamp-red top-3 right-16 opacity-30 text-lg pointer-events-none">OFFICIAL RECORD</div>

    <div className="space-y-6">
      <section>
        <div className="bg-[#1c2431] text-white px-4 py-3 flex justify-between items-center mb-4 shadow-sm">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest font-ui">INCIDENT REPORT</h2>
            <p className="text-[10px] text-gray-300 font-mono">METROPOLITAN POLICE DEPARTMENT</p>
          </div>
          <p className="text-xs text-gray-300 font-mono font-bold">FORM 44-B</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 mb-6">
          <div className="border-b border-gray-300 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">INCIDENT NO</span>
            <span className="font-bold text-ink-blue text-base">{overview.incidentNumber}</span>
          </div>
          <div className="border-b border-gray-300 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">DATE</span>
            <span className="font-bold text-base">{overview.date}</span>
          </div>
          <div className="border-b border-gray-300 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">OFFICER</span>
            <span className="font-bold text-base">{overview.reportingOfficer}</span>
          </div>
          <div className="border-b border-gray-300 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">JURISDICTION</span>
            <span className="font-bold text-base">{overview.jurisdiction}</span>
          </div>
        </div>

        <section className="px-2">
          <h3 className="text-gray-600 font-bold uppercase tracking-widest text-sm border-b border-gray-300 mb-2 pb-1">SUMMARY OF INCIDENT</h3>
          <p className="leading-relaxed text-base font-typewriter text-ink-black/90 bg-white/70 p-4 border border-gray-200">{overview.summary}</p>
        </section>
      </section>

      <section className="mt-8 border-2 border-[#1c2431] p-4 relative mx-2 bg-white">
        <div className="absolute -top-3 left-4 bg-white px-2 font-bold text-[#1c2431] text-xs uppercase tracking-widest border border-[#1c2431]">CURRENT CLASSIFICATION</div>
        <div className="pt-1 text-center">
          <span className="text-2xl font-bold text-red-700 uppercase tracking-widest font-ui">ACTIVE HOMICIDE INVESTIGATION</span>
        </div>
      </section>
    </div>
  </div>
)};

const VictimProfile = ({ victim }) => {
  if (!victim) return <div className="p-8 text-center text-text-secondary font-mono">LOADING EVIDENCE FILE...</div>;
  return (
  <div className="bg-[#fcfbf9] p-6 shadow-sm border border-gray-200 font-ui text-ink-black relative">
    <div className="flex justify-between items-center border-b-2 border-ink-black pb-2 mb-6">
      <h2 className="font-bold text-2xl uppercase tracking-wider">VICTIM PROFILE & IDENTIFICATION</h2>
      <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">DOSSIER // DECEASED</span>
    </div>

    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-full sm:w-1/3 max-w-[210px] mx-auto sm:max-w-none">
        {/* Realistic Polaroid Photo with Realistic Paperclip */}
        <div className="bg-white p-2 pb-8 shadow-md border border-gray-200 transform -rotate-2 relative">
          <RealisticPaperclip className="-top-3 -right-2" angle={14} size={48} variant="brass" />
          <div className="bg-gray-200 h-48 flex items-center justify-center font-mono text-gray-400 text-sm border border-gray-300 relative overflow-hidden">
            {victim.photo ? (
              <img src={victim.photo} alt={victim.name} className="w-full h-full object-cover grayscale contrast-125" />
            ) : (
              'NO PHOTO'
            )}
          </div>
          <p className="text-center font-handwriting text-xl mt-2 text-ink-blue font-bold">{victim.name}</p>
        </div>
      </div>
      <div className="w-full sm:w-2/3 space-y-3 font-mono text-sm">
        <div className="grid grid-cols-2 gap-2 bg-white/80 p-3 border border-gray-200">
          <p><strong>NAME:</strong> <span className="text-ink-blue font-bold">{victim.name}</span></p>
          <p><strong>AGE:</strong> {victim.age}</p>
          <p><strong>OCCUPATION:</strong> {victim.occupation}</p>
          <p><strong>DOB:</strong> {victim.dateOfBirth}</p>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4 font-ui">
          <strong className="block mb-2 text-xs uppercase tracking-widest text-gray-500 font-bold">BACKGROUND & BIOGRAPHY</strong>
          <p className="text-base leading-relaxed font-typewriter text-ink-black/90 bg-white/60 p-4 border border-gray-200">{victim.biography}</p>
        </div>
      </div>
    </div>
  </div>
)};

const CaseFolder = () => {
  const { caseData, roomState } = useGame();
  const [activeTab, setActiveTab] = useState('overview');

  // Available tabs based on current wave
  const tabs = [
    { id: 'overview', label: 'Incident', wave: 0 },
    { id: 'victim', label: 'Victim Profile', wave: 0 },
  ];

  const hasDigital = caseData?.digitalEvidence && (
    (caseData.digitalEvidence.phoneRecords?.length > 0) ||
    (caseData.digitalEvidence.emails?.length > 0) ||
    (caseData.digitalEvidence.cctvLogs?.length > 0) ||
    (caseData.digitalEvidence.puzzles?.length > 0) ||
    caseData.digitalEvidence.socialMedia ||
    caseData.digitalEvidence.other
  );

  if (caseData?.suspects && caseData.suspects.length > 0) tabs.push({ id: 'suspects', label: 'Suspects' });
  if (caseData?.witnessStatements && caseData.witnessStatements.length > 0) tabs.push({ id: 'witnesses', label: 'Witnesses' });
  if (caseData?.forensics) tabs.push({ id: 'forensics', label: 'Lab Reports' });
  if (caseData?.physicalEvidence && caseData.physicalEvidence.length > 0) tabs.push({ id: 'evidence', label: 'Evidence' });
  if (hasDigital) tabs.push({ id: 'digital', label: 'Digital' });
  if (caseData?.timeline && caseData.timeline.length > 0) tabs.push({ id: 'timeline', label: 'Timeline' });

  // Reset to overview if active tab becomes unavailable (shouldn't happen in normal flow, but just in case)
  useEffect(() => {
    if (!tabs.find(t => t.id === activeTab)) {
      setActiveTab('overview');
    }
  }, [tabs, activeTab]);

  return (
    <div className="case-folder-wrapper">
      
      {/* Folder Tabs Navigation */}
      <div className="folder-tabs">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            className={`folder-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ zIndex: activeTab === tab.id ? 20 : 10 - idx }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Folder Body */}
      <div className="case-folder relative">
        {/* Realistic Binder Paperclip fastening the active document bundle */}
        <RealisticPaperclip className="-top-3 right-8 z-30" angle={6} size={66} variant="steel" />
        <div className="document-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ rotateY: 90, opacity: 0, originX: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, type: 'tween' }}
              className="h-full relative"
            >
              {/* Render specific components based on active tab */}
              {activeTab === 'overview' && <IncidentReport overview={caseData?.overview} />}
              {activeTab === 'victim' && <VictimProfile victim={caseData?.victim} />}
              {activeTab === 'suspects' && <SuspectDossier suspects={caseData?.suspects} />}
              {activeTab === 'witnesses' && <WitnessStatement statements={caseData?.witnessStatements} />}
              {activeTab === 'forensics' && <ForensicReport forensics={caseData?.forensics} />}
              {activeTab === 'evidence' && <EvidenceLog evidence={caseData?.physicalEvidence} />}
              {activeTab === 'digital' && <DigitalEvidence digital={caseData?.digitalEvidence} />}
              {activeTab === 'timeline' && <CaseTimeline timeline={caseData?.timeline} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CaseFolder;
