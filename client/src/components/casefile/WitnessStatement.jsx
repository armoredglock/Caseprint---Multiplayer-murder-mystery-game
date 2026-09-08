import React from 'react';

const WitnessStatement = ({ statements }) => {
  if (!statements || statements.length === 0) return <div>No witness statements available.</div>;

  return (
    <div className="space-y-12">
      {statements.map((statement, idx) => (
        <div key={idx} className="bg-white p-4 font-mono text-sm text-gray-800 border-4 border-[#1c2431]">
          <div className="bg-[#1c2431] text-white px-4 py-3 flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">SWORN STATEMENT</h2>
            <div className="text-right text-xs text-gray-300">
              <p>WITNESS: {statement.witnessName.toUpperCase()}</p>
              <p>DATE: {new Date(statement.timestamp).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="px-2 mb-6 text-gray-600 leading-relaxed border-b border-gray-200 pb-4">
            <p>I, <strong className="text-gray-900">{statement.witnessName}</strong>, age {statement.age || '___'}, occupation {statement.occupation || '___'}, residing at {statement.address || '___'}, do hereby make the following statement of my own free will:</p>
          </div>

          <p className="whitespace-pre-wrap px-2 leading-relaxed text-base text-gray-900 font-bold bg-gray-50 p-4 border-l-4 border-[#1c2431]">
            {statement.body}
          </p>

          <div className="mt-8 pt-4 px-2 flex justify-between items-end border-t-2 border-gray-200">
            <div className="text-gray-500 text-xs font-bold tracking-widest uppercase">
              Taken by:<br/>
              <strong className="text-[#1c2431] text-sm block mt-1">{statement.takenBy}</strong>
            </div>
            
            <div className="text-right">
              <div className="font-handwriting text-3xl text-[#1c2431] opacity-80 mb-2 transform -rotate-2">
                {statement.signature || statement.witnessName}
              </div>
              <div className="w-48 border-t-2 border-gray-300 ml-auto" />
              <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-widest block mt-1">Signature of Witness</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WitnessStatement;
