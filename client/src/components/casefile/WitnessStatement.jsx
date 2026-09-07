import React from 'react';

const WitnessStatement = ({ statements }) => {
  if (!statements || statements.length === 0) return <div>No witness statements available.</div>;

  return (
    <div className="space-y-12">
      {statements.map((statement, idx) => (
        <div key={idx} className="doc-statement relative shadow-md">
          {/* Paper holes */}
          <div className="absolute left-4 top-10 w-3 h-3 rounded-full bg-bg shadow-inner" />
          <div className="absolute left-4 top-1/2 w-3 h-3 rounded-full bg-bg shadow-inner" />
          <div className="absolute left-4 bottom-10 w-3 h-3 rounded-full bg-bg shadow-inner" />
          
          <div className="border-b-2 border-ink-black pb-2 mb-8">
            <h2 className="font-ui font-bold text-xl uppercase tracking-widest text-ink-black">
              SWORN STATEMENT
            </h2>
            <div className="flex justify-between text-sm font-mono mt-2 text-ink-black/70">
              <span>WITNESS: {statement.witnessName.toUpperCase()}</span>
              <span>DATE: {new Date(statement.timestamp).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-6 font-mono text-sm text-ink-black/80 space-y-1">
            <p>I, <strong>{statement.witnessName}</strong>, age {statement.age || '___'}, occupation {statement.occupation || '___'}, residing at {statement.address || '___'}, do hereby make the following statement of my own free will:</p>
          </div>

          <p className="whitespace-pre-wrap pl-4">
            {statement.body}
          </p>

          <div className="mt-12 pt-8 border-t border-ink-black/20 flex justify-between items-end">
            <div className="font-mono text-sm text-ink-black/60">
              Taken by: <br/>
              <strong className="text-ink-black">{statement.takenBy}</strong>
            </div>
            
            <div className="text-center">
              <div className="signature">
                {statement.signature || statement.witnessName}
              </div>
              <div className="w-48 border-t border-ink-black mt-1 mx-auto" />
              <span className="font-mono text-xs text-ink-black/60">Signature of Witness</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WitnessStatement;
