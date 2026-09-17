/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  getStoredConfig, 
  saveStoredConfig, 
  getStoredParticipants, 
  saveStoredParticipants,
  getStoredCommittee,
  saveStoredCommittee
} from './utils/storage';
import { Participant, SystemConfig, CommitteeMember } from './types';
import { Navbar, NavTab } from './components/Navbar';
import { RegistrationView } from './components/Registration/RegistrationView';
import { BranchCodesView } from './components/Branches/BranchCodesView';
import { JuryScoringView } from './components/JuryScoring/JuryScoringView';
import { LiveScoreboardView } from './components/LiveScore/LiveScoreboardView';
import { LiveStreamingView } from './components/LiveStreaming/LiveStreamingView';
import { CertificateGeneratorView } from './components/Certificates/CertificateGeneratorView';
import { CertificateVerifierView } from './components/Certificates/CertificateVerifierView';
import { OfficialDocumentsView } from './components/OfficialDocs/OfficialDocumentsView';
import { IdCardsHubView } from './components/IdCards/IdCardsHubView';
import { SettingsModal } from './components/SettingsModal';
import { NationalRubricModal } from './components/JuryScoring/NationalRubricModal';
import { INITIAL_PARTICIPANTS, DEFAULT_SYSTEM_CONFIG } from './data/initialParticipants';
import { INITIAL_COMMITTEE } from './data/initialCommittee';
import { getKecamatanById } from './data/lombokBaratKecamatan';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SystemConfig>(getStoredConfig);
  const [participants, setParticipants] = useState<Participant[]>(getStoredParticipants);
  const [committee, setCommittee] = useState<CommitteeMember[]>(getStoredCommittee);
  const [activeTab, setActiveTab] = useState<NavTab>('registration');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGlobalRubricOpen, setIsGlobalRubricOpen] = useState(false);

  // Cross-view context navigation
  const [judgingParticipantId, setJudgingParticipantId] = useState<string | undefined>(undefined);
  const [certParticipantId, setCertParticipantId] = useState<string | undefined>(undefined);
  const [verifyQuery, setVerifyQuery] = useState<string | undefined>(undefined);

  // Sync state with custom event or localStorage
  useEffect(() => {
    const handleStorageUpdate = () => {
      setParticipants(getStoredParticipants());
    };
    const handleCommitteeUpdate = () => {
      setCommittee(getStoredCommittee());
    };
    window.addEventListener('simtq_participants_updated', handleStorageUpdate);
    window.addEventListener('simtq_committee_updated', handleCommitteeUpdate);
    return () => {
      window.removeEventListener('simtq_participants_updated', handleStorageUpdate);
      window.removeEventListener('simtq_committee_updated', handleCommitteeUpdate);
    };
  }, []);

  const handleSaveParticipants = (updated: Participant[]) => {
    setParticipants(updated);
    saveStoredParticipants(updated);
  };

  const handleSaveCommittee = (updated: CommitteeMember[]) => {
    setCommittee(updated);
    saveStoredCommittee(updated);
  };

  const handleSaveConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
    saveStoredConfig(newConfig);
  };

  const handleSelectKecamatan = (kecamatanId: string) => {
    const kec = getKecamatanById(kecamatanId);
    const updatedConfig: SystemConfig = {
      ...config,
      activeKecamatanId: kec.id,
      edition: `MTQ KE-XXXII TINGKAT KECAMATAN ${kec.name.toUpperCase()}`,
      hostLocation: `Kecamatan ${kec.name}, Kabupaten Lombok Barat, NTB`,
      chairmanTitle: `Ketua LPTQ Kec. ${kec.name} / Camat ${kec.name}`,
      chiefJudgeTitle: `Ketua Dewan Hakim MTQ Kec. ${kec.name}`,
      chairmanName: kec.defaultChairman,
      chiefJudgeName: kec.defaultChiefJudge
    };
    handleSaveConfig(updatedConfig);
  };

  const handleResetAllData = () => {
    localStorage.clear();
    setParticipants(INITIAL_PARTICIPANTS);
    setCommittee(INITIAL_COMMITTEE);
    setConfig(DEFAULT_SYSTEM_CONFIG);
    saveStoredParticipants(INITIAL_PARTICIPANTS);
    saveStoredCommittee(INITIAL_COMMITTEE);
    saveStoredConfig(DEFAULT_SYSTEM_CONFIG);
  };

  const navigateToJudging = (participantId: string) => {
    setJudgingParticipantId(participantId);
    setActiveTab('judging');
  };

  const navigateToCertificate = (participantId: string) => {
    setCertParticipantId(participantId);
    setActiveTab('certificates');
  };

  const navigateToVerify = (hashOrNo: string) => {
    setVerifyQuery(hashOrNo);
    setActiveTab('verify');
  };

  const completedParticipants = participants.filter(p => p.finalScore && p.finalScore > 0).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRubric={() => setIsGlobalRubricOpen(true)}
        onSelectKecamatan={handleSelectKecamatan}
        totalParticipants={participants.length}
        completedParticipants={completedParticipants}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'registration' && (
          <RegistrationView
            participants={participants}
            onSaveParticipants={handleSaveParticipants}
            config={config}
            onNavigateToJudging={navigateToJudging}
            onNavigateToStreaming={() => setActiveTab('streaming')}
          />
        )}

        {activeTab === 'idcards' && (
          <IdCardsHubView
            participants={participants}
            committee={committee}
            onSaveCommittee={handleSaveCommittee}
            config={config}
          />
        )}

        {activeTab === 'branches' && (
          <BranchCodesView
            participants={participants}
          />
        )}

        {activeTab === 'documents' && (
          <OfficialDocumentsView />
        )}

        {activeTab === 'streaming' && (
          <LiveStreamingView
            participants={participants}
            config={config}
            onNavigateToJudging={navigateToJudging}
            onNavigateToScoreboard={() => setActiveTab('scoreboard')}
            onUpdateParticipantStatus={(participantId, newStatus) => {
              const updated = participants.map(p => 
                p.id === participantId ? { ...p, status: newStatus } : p
              );
              handleSaveParticipants(updated);
            }}
          />
        )}

        {activeTab === 'judging' && (
          <JuryScoringView
            participants={participants}
            onSaveParticipants={handleSaveParticipants}
            config={config}
            selectedParticipantId={judgingParticipantId}
          />
        )}

        {activeTab === 'scoreboard' && (
          <LiveScoreboardView
            participants={participants}
            config={config}
            onNavigateToCertificate={navigateToCertificate}
            onNavigateToStreaming={() => setActiveTab('streaming')}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificateGeneratorView
            participants={participants}
            config={config}
            initialSelectedParticipantId={certParticipantId}
            onNavigateToVerify={navigateToVerify}
          />
        )}

        {activeTab === 'verify' && (
          <CertificateVerifierView
            participants={participants}
            config={config}
            initialQuery={verifyQuery}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-300 py-6 border-t border-emerald-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-white tracking-wide text-sm">
              SIMTQ - {config.edition}
            </div>
            <p className="text-emerald-400/90 text-[11px] mt-0.5">
              Standarisasi Lembaga Pengembangan Tilawatil Qur'an (LPTQ) • Format 9 Cabang Resmi Musabaqah
            </p>
            <div className="mt-2 inline-flex flex-wrap items-center justify-center sm:justify-start gap-1.5 bg-emerald-900/90 border border-emerald-700/80 px-3 py-1.5 rounded-lg text-emerald-100 text-xs shadow-sm">
              <span className="text-amber-400 font-semibold">Pengembang Aplikasi:</span>
              <strong className="text-white font-bold tracking-wide underline decoration-amber-400/60">Husni, S.Kom.I</strong>
              <span className="text-emerald-300 text-[11px]">• Penyuluh Agama Islam KUA Kecamatan Gerung, Kab. Lombok Barat</span>
            </div>
          </div>
          <div className="text-[11px] text-emerald-400/80 font-mono text-center sm:text-right">
            <div>{config.hostLocation}</div>
            <div className="text-[10px] text-emerald-500 mt-1">LPTQ & KUA Kecamatan Gerung © 2026</div>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          config={config}
          onSaveConfig={handleSaveConfig}
          onResetAllData={handleResetAllData}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Global National Rubric Modal */}
      <NationalRubricModal
        isOpen={isGlobalRubricOpen}
        onClose={() => setIsGlobalRubricOpen(false)}
      />
    </div>
  );
}
