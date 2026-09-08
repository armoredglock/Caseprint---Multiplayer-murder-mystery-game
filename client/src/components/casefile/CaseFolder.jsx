import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

import SuspectDossier from './SuspectDossier';
import WitnessStatement from './WitnessStatement';
import ForensicReport from './ForensicReport';
import EvidenceLog from './EvidenceLog';
import DigitalEvidence from './DigitalEvidence';
import CaseTimeline from './CaseTimeline';

// Placeholders for the remaining two
const IncidentReport = ({ overview }) => {
  if (!overview) return <div className="p-4 font-mono">LOADING EVIDENCE FILE...</div>;
  return (
  <div className="bg-white p-4 font-mono text-sm text-gray-800">
    <div className="space-y-6">
      <section>
        <div className="bg-[#1c2431] text-white px-4 py-3 flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold uppercase tracking-widest">INCIDENT REPORT</h2>
          <p className="text-xs text-gray-300">FORM 44-B</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 mb-6">
          <div className="border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">INCIDENT NO</span>
            <span className="font-bold">{overview.incidentNumber}</span>
          </div>
          <div className="border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">DATE</span>
            <span className="font-bold">{overview.date}</span>
          </div>
          <div className="border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">OFFICER</span>
            <span className="font-bold">{overview.reportingOfficer}</span>
          </div>
          <div className="border-b border-gray-200 pb-2">
            <span className="text-gray-500 font-bold block text-xs mb-1 uppercase tracking-widest">JURISDICTION</span>
            <span className="font-bold">{overview.jurisdiction}</span>
          </div>
        </div>

        <section className="px-2">
          <h3 className="text-gray-500 font-bold uppercase tracking-widest text-lg border-b border-gray-300 mb-2">SUMMARY</h3>
          <p className="leading-relaxed text-base">{overview.summary}</p>
        </section>
      </section>

      <section className="mt-8 border-4 border-[#1c2431] p-4 relative mx-2">
        <div className="absolute -top-4 left-4 bg-white px-3 py-1 font-bold text-[#1c2431] text-lg tracking-widest">STATUS</div>
        <div className="pt-2 text-center">
          <span className="text-2xl font-bold text-red-700 uppercase tracking-widest">ACTIVE INVESTIGATION</span>
        </div>
      </section>
    </div>
  </div>
)};

const VictimProfile = ({ victim }) => {
  if (!victim) return <div className="p-8 text-center text-text-secondary font-mono">LOADING EVIDENCE FILE...</div>;
  return (
  <div className="bg-white p-6 shadow border border-gray-200 font-ui text-ink-black">
    <h2 className="font-bold text-2xl mb-4 border-b-2 border-ink-black uppercase">VICTIM PROFILE</h2>
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-full sm:w-1/3 max-w-[200px] mx-auto sm:max-w-none">
        <div className="bg-white p-2 pb-8 shadow-md border border-gray-100 transform -rotate-3">
          <div className="bg-gray-200 h-48 flex items-center justify-center font-mono text-gray-400 text-sm border border-gray-300 relative overflow-hidden">
            {victim.photo ? (
              <img src={victim.photo} alt={victim.name} className="w-full h-full object-cover grayscale contrast-125" />
            ) : (
              'NO PHOTO'
            )}
          </div>
          <p className="text-center font-handwriting text-xl mt-2">{victim.name}</p>
        </div>
      </div>
      <div className="w-full sm:w-2/3 space-y-2 font-mono text-sm">
        <p><strong>NAME:</strong> {victim.name}</p>
        <p><strong>AGE:</strong> {victim.age}</p>
        <p><strong>OCCUPATION:</strong> {victim.occupation}</p>
        <p><strong>DOB:</strong> {victim.dateOfBirth}</p>
        <div className="mt-4 border-t border-gray-200 pt-4 font-ui">
          <strong className="block mb-1 text-xs uppercase tracking-widest text-gray-500">BIOGRAPHY</strong>
          <p className="text-base">{victim.biography}</p>
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
      <div className="case-folder">
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
