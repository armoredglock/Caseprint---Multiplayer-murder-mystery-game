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
  if (!overview) return <div className="p-8 text-center text-text-secondary font-mono">LOADING EVIDENCE FILE...</div>;
  return (
  <div className="doc-official">
    <div className="doc-header">
      <div className="text-right w-full">
        <h2 className="doc-title">INCIDENT REPORT</h2>
        <p className="font-mono text-sm text-text-secondary">FORM 44-B (REV. 2021)</p>
      </div>
    </div>
    
    <div className="doc-field-grid mt-6">
      <div className="doc-field"><span className="doc-label">INCIDENT NO:</span><span className="doc-value">{overview.incidentNumber}</span></div>
      <div className="doc-field"><span className="doc-label">DATE:</span><span className="doc-value">{overview.date}</span></div>
      <div className="doc-field"><span className="doc-label">OFFICER:</span><span className="doc-value">{overview.reportingOfficer}</span></div>
      <div className="doc-field"><span className="doc-label">JURISDICTION:</span><span className="doc-value">{overview.jurisdiction}</span></div>
    </div>
    <div className="mt-8">
      <span className="doc-label block mb-2">SUMMARY OF INCIDENT:</span>
      <p className="font-typewriter text-lg leading-relaxed text-ink-blue">{overview.summary}</p>
    </div>
    <div className="stamp stamp-red top-20 right-10">ACTIVE</div>
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
