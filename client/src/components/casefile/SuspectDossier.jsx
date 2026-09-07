import React from 'react';

const SuspectDossier = ({ suspects }) => {
  const [expandedId, setExpandedId] = React.useState(null);

  if (!suspects || suspects.length === 0) return <div>No suspects identified yet.</div>;

  return (
    <div className="relative">
      <div className="stamp stamp-red top-0 right-0 opacity-20">RESTRICTED</div>
      
      <h2 className="font-ui font-bold text-2xl border-b-2 border-ink-black pb-2 mb-6 text-ink-black uppercase tracking-widest">
        PERSONS OF INTEREST
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suspects.map(suspect => {
          const isExpanded = expandedId === suspect.id;
          
          return (
            <div 
              key={suspect.id}
              className={`bg-white border border-border/30 shadow-sm p-4 transition-all duration-300 ${isExpanded ? 'col-span-1 md:col-span-2 row-span-2 z-10 shadow-lg' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : suspect.id)}
            >
              <div className="flex gap-4">
                {/* Mugshot */}
                <div className="w-32 h-40 bg-gray-200 border-4 border-white shadow flex-shrink-0 relative overflow-hidden">
                   {suspect.photo ? (
                     <img src={suspect.photo} alt={suspect.name} className="w-full h-full object-cover grayscale contrast-125" />
                   ) : (
                     <div className="absolute inset-0 bg-ink-blue/5 flex items-center justify-center text-xs text-ink-blue/40 font-mono text-center px-2">
                       PHOTO UNAVAILABLE<br/>ID: {suspect.id}
                     </div>
                   )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 font-mono text-sm text-ink-black">
                  <h3 className="font-bold text-lg mb-1">{suspect.name}</h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
                    <span className="text-ink-black/60">AGE:</span> <span>{suspect.age}</span>
                    <span className="text-ink-black/60">OCC:</span> <span>{suspect.occupation}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-ink-black/60 block text-xs">RELATION TO VICTIM:</span>
                    <span className="leading-tight">{suspect.relationToVictim}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-2 inline-block border-2 border-ink-red text-ink-red font-bold px-2 py-0.5 text-xs transform -rotate-2">
                    {suspect.status}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-6 pt-4 border-t border-dashed border-ink-black/20 font-typewriter text-ink-blue space-y-4 animate-fade-in">
                  <div>
                    <strong className="font-ui text-xs tracking-widest text-ink-black uppercase block mb-1">Last Known Whereabouts</strong>
                    <p>{suspect.lastKnownWhereabouts}</p>
                  </div>
                  
                  <div>
                    <strong className="font-ui text-xs tracking-widest text-ink-black uppercase block mb-1">Stated Alibi</strong>
                    <p className="bg-yellow-100/50 p-2 border-l-4 border-yellow-400">{suspect.alibi}</p>
                  </div>

                  <div>
                    <strong className="font-ui text-xs tracking-widest text-ink-black uppercase block mb-1 flex items-center gap-2">
                      Motive Assessment
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        suspect.motiveAssessment === 'HIGH' ? 'bg-red-200 text-red-800' : 
                        suspect.motiveAssessment === 'MEDIUM' ? 'bg-orange-200 text-orange-800' : 'bg-green-200 text-green-800'
                      }`}>
                        {suspect.motiveAssessment}
                      </span>
                    </strong>
                    <p>{suspect.background}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuspectDossier;
