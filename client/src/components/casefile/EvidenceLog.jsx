import React from 'react';

const EvidenceLog = ({ evidence }) => {
  if (!evidence || evidence.length === 0) return <div>No physical evidence logged yet.</div>;

  return (
    <div>
      <div className="mb-6 flex justify-between items-end border-b-2 border-ink-black pb-2">
        <h2 className="font-ui font-bold text-2xl uppercase tracking-widest text-ink-black">
          EVIDENCE LOG
        </h2>
        <span className="font-mono text-sm font-bold bg-ink-black text-white px-2 py-1">
          {evidence.length} ITEMS CATALOGED
        </span>
      </div>

      <div className="evidence-grid">
        {evidence.map(item => (
          <div key={item.tagNumber} className="evidence-card flex flex-col h-full">
            <div className="evidence-tag">{item.tagNumber}</div>
            
            <div className="mt-6 mb-2 relative flex-grow">
               {/* Evidence Photo */}
               {item.photo ? (
                 <img src={item.photo} alt={item.description} className="evidence-photo" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
               ) : null}
               <div className={`evidence-photo bg-gray-200 ${item.photo ? 'hidden' : 'flex'} items-center justify-center text-gray-400 font-mono text-sm border-2 border-dashed border-gray-400`}>
                 NO IMAGE AVAILABLE
               </div>
            </div>

            <div className="font-mono text-sm text-ink-black mt-2">
              <p className="font-bold border-b border-gray-300 pb-1 mb-1 truncate" title={item.description}>
                {item.description}
              </p>
              <p className="text-xs text-ink-black/70 mb-2 truncate" title={item.locationFound}>
                Found: {item.locationFound}
              </p>
              
              {item.significance && (
                <div className="bg-yellow-50 p-2 text-xs border-l-2 border-yellow-400 mb-2 font-typewriter">
                  {item.significance}
                </div>
              )}

              {/* Chain of Custody */}
              {item.chainOfCustody && item.chainOfCustody.length > 0 && (
                <div className="mt-2 text-[10px] bg-gray-50 border border-gray-200 p-1">
                  <div className="font-bold mb-1 border-b border-gray-200 pb-1">CHAIN OF CUSTODY</div>
                  {item.chainOfCustody.map((log, i) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span className="truncate w-1/2">{log.officer}</span>
                      <span className="truncate w-1/2 text-right">{log.action}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceLog;
