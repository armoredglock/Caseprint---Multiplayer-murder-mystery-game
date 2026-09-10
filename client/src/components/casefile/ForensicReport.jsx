import React from 'react';

const ForensicReport = ({ forensics }) => {
  if (!forensics) return <div>No forensic data available.</div>;

  return (
    <div className="bg-white p-4 font-mono text-sm text-gray-800">
      
      <div className="space-y-6">
        <section>
          <h3 className="bg-[#1c2431] text-white px-4 py-2 text-xl font-bold uppercase tracking-widest mb-2">EXAMINATION</h3>
          <p className="px-4 py-2 leading-relaxed text-base">{forensics.externalExam || forensics.internalExam || 'Otherwise healthy.'}</p>
        </section>

        {forensics.toxicology && forensics.toxicology.length > 0 && (
          <section>
            <h3 className="bg-[#1c2431] text-white px-4 py-2 text-xl font-bold uppercase tracking-widest mb-2">TOXICOLOGY SCREEN</h3>
            <div className="overflow-x-auto">
              <table className="w-full mt-2 border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th className="border-r border-gray-200 p-3 font-bold">Substance</th>
                    <th className="border-r border-gray-200 p-3 font-bold">Result</th>
                    <th className="border-r border-gray-200 p-3 font-bold">Level</th>
                    <th className="p-3 font-bold">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {forensics?.toxicology?.map((tox, idx) => (
                    <tr key={idx} className={`border-b border-gray-200 ${tox.result.toLowerCase() === 'positive' ? 'bg-red-50 text-red-900 font-bold' : ''}`}>
                      <td className="border-r border-gray-200 p-3">{tox.substance}</td>
                      <td className="border-r border-gray-200 p-3">{tox.result}</td>
                      <td className="border-r border-gray-200 p-3">{tox.level}</td>
                      <td className="p-3 text-gray-500">{tox.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <section>
             <h3 className="text-gray-500 font-bold uppercase tracking-widest text-lg border-b border-gray-300 mb-2">FINGERPRINTS</h3>
             <p className="leading-relaxed break-words text-base">{forensics.fingerprints || 'None found.'}</p>
          </section>
          <section>
            <h3 className="text-gray-500 font-bold uppercase tracking-widest text-lg border-b border-gray-300 mb-2">DNA</h3>
            <p className="leading-relaxed break-words text-base">{forensics.dna || 'No foreign DNA detected'}</p>
          </section>
        </div>

        <section className="mt-8 border-4 border-[#1c2431] p-4 relative">
          <div className="absolute -top-4 left-4 bg-white px-3 py-1 font-bold text-[#1c2431] text-lg tracking-widest">CONCLUSION</div>
          <div className="grid grid-cols-1 gap-6 pt-4">
            <div>
              <span className="text-gray-500 font-bold block text-sm mb-1">CAUSE OF DEATH</span>
              <p className="text-xl font-bold text-red-700 uppercase">{forensics.causeOfDeath || 'Pending'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForensicReport;
