import React from 'react';

const DigitalEvidence = ({ digital }) => {
  const [activeTab, setActiveTab] = React.useState('phone');

  if (!digital) return <div>No digital evidence extracted.</div>;

  const hasPhone = digital.phoneRecords && digital.phoneRecords.length > 0;
  const hasEmail = digital.emails && digital.emails.length > 0;
  const hasCCTV = digital.cctvLogs && digital.cctvLogs.length > 0;

  // Default to first available
  React.useEffect(() => {
    if (activeTab === 'phone' && !hasPhone && hasEmail) setActiveTab('email');
    else if (activeTab === 'phone' && !hasPhone && !hasEmail && hasCCTV) setActiveTab('cctv');
  }, [hasPhone, hasEmail, hasCCTV, activeTab]);

  return (
    <div className="bg-gray-100 p-4 font-mono text-sm h-full flex flex-col border border-gray-300">
      
      {/* Internal Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-300 pb-2">
        {hasPhone && (
          <button 
            className={`px-4 py-2 font-bold ${activeTab === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('phone')}
          >
            PHONE LOGS
          </button>
        )}
        {hasEmail && (
          <button 
            className={`px-4 py-2 font-bold ${activeTab === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('email')}
          >
            EMAILS
          </button>
        )}
        {hasCCTV && (
          <button 
            className={`px-4 py-2 font-bold ${activeTab === 'cctv' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('cctv')}
          >
            CCTV TERMINAL
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 shadow-inner">
        
        {/* Phone Logs */}
        {activeTab === 'phone' && (
          <div className="p-4">
            <div className="text-center mb-6 font-ui">
              <h3 className="font-bold text-xl uppercase">MetroComm Cellular</h3>
              <p className="text-xs text-gray-500">SUBSCRIBER USAGE DETAIL</p>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="py-2">Time</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">From/To</th>
                  <th className="py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {digital.phoneRecords.map((record, idx) => (
                  <tr key={idx} className={`border-b border-gray-200 ${record.flagged ? 'bg-yellow-50' : ''}`}>
                    <td className="py-2 font-bold">{record.time}</td>
                    <td className="py-2 text-xs">
                      <span className={`px-1 rounded ${
                        record.type === 'INCOMING' ? 'bg-blue-100 text-blue-800' : 
                        record.type === 'OUTGOING' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="py-2">{record.type === 'INCOMING' ? record.from : record.to}</td>
                    <td className="py-2 text-gray-500">{record.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Emails */}
        {activeTab === 'email' && (
          <div className="p-0">
            {digital.emails.map((email, idx) => (
              <div key={idx} className={`border-b-4 border-gray-300 ${email.flagged ? 'bg-yellow-50/30' : ''}`}>
                <div className="bg-gray-100 p-3 border-b border-gray-200 font-ui text-sm">
                  <div className="grid grid-cols-[80px_1fr] gap-2 mb-1">
                    <span className="text-gray-500 font-bold text-right">From:</span>
                    <span className="font-mono">{email.from}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 mb-1">
                    <span className="text-gray-500 font-bold text-right">To:</span>
                    <span className="font-mono">{email.to}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2 mb-1">
                    <span className="text-gray-500 font-bold text-right">Date:</span>
                    <span>{email.date}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-gray-500 font-bold text-right">Subject:</span>
                    <span className="font-bold">{email.subject}</span>
                  </div>
                </div>
                <div className="p-6 font-ui text-base whitespace-pre-wrap leading-relaxed">
                  {email.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CCTV Terminal */}
        {activeTab === 'cctv' && (
          <div className="bg-[#0a0a0f] text-green-400 p-4 h-full font-mono text-sm overflow-y-auto">
            <div className="mb-4 text-green-600">
              <p>NovaTech Security System v4.2</p>
              <p>Connecting to database... OK</p>
              <p>Querying logs for {digital.cctvLogs[0]?.timestamp?.split(' ')[0] || 'requested date'}...</p>
              <p className="border-b border-green-800 pb-2 mb-2">Found {digital.cctvLogs.length} matching events.</p>
            </div>
            
            <div className="space-y-2">
              {digital.cctvLogs.map((log, idx) => (
                <div key={idx} className={`flex gap-4 ${log.flagged ? 'bg-green-900/40 text-white' : ''}`}>
                  <span className="w-24 flex-shrink-0 opacity-70">[{log.timestamp}]</span>
                  <span className="w-32 flex-shrink-0 text-blue-400">{log.camera}</span>
                  <span className="flex-1">{log.note}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 opacity-50 animate-pulse">_</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DigitalEvidence;
