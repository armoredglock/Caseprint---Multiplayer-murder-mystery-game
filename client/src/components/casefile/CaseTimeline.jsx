import React from 'react';

const CaseTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return <div>Timeline reconstruction pending.</div>;

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-ui font-bold text-2xl uppercase tracking-widest text-ink-black border-b-2 border-ink-black inline-block pb-2">
          EVENT RECONSTRUCTION
        </h2>
      </div>

      <div className="relative border-l-4 border-ink-black/20 pl-8 ml-4 space-y-12">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative">
            
            {/* Timeline Node */}
            <div className={`absolute -left-[42px] top-1 w-6 h-6 rounded-full border-4 border-white ${
              event.critical ? 'bg-ink-red timeline-critical' : 'bg-ink-black'
            }`} />
            
            <div className="bg-white p-4 shadow-sm border border-border/20 rounded relative">
              {/* Arrow pointing to node */}
              <div className="absolute top-3 -left-3 w-3 h-3 bg-white border-t border-l border-border/20 transform -rotate-45" />
              
              <div className="flex gap-4 items-start">
                <div className="font-mono font-bold text-lg text-ink-blue min-w-[70px]">
                  {event.time}
                </div>
                
                <div className="flex-1">
                  <p className="font-typewriter text-lg text-ink-black leading-snug">
                    {event.event}
                  </p>
                  
                  {event.linkedEvidence && event.linkedEvidence.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {event.linkedEvidence.map(ev => (
                        <span key={ev} className="text-[10px] font-mono bg-yellow-100 border border-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full">
                          REF: {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseTimeline;
