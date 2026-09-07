import React from 'react';

const ForensicReport = ({ forensics }) => {
  if (!forensics) return <div>No forensic data available.</div>;

  return (
    <div className="bg-white p-8 font-mono text-sm text-gray-800 shadow-sm border border-gray-200 relative">
      <div className="border-b-4 border-gray-800 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900">{forensics.labName || 'City Forensic Laboratory'}</h2>
          <p className="text-gray-600 mt-1">OFFICIAL MEDICAL EXAMINER REPORT</p>
        </div>
        <div className="text-right">
          <p><strong>REPORT NO:</strong> {forensics.reportNumber}</p>
          <p><strong>DATE:</strong> {forensics.dateOfExam}</p>
          <p><strong>EXAMINER:</strong> {forensics.examiner}</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="bg-gray-800 text-white px-2 py-1 font-bold inline-block mb-2">EXTERNAL EXAMINATION</h3>
          <p className="pl-4 border-l-2 border-gray-300 py-1 leading-relaxed">{forensics.externalExam || 'Pending'}</p>
        </section>

        <section>
          <h3 className="bg-gray-800 text-white px-2 py-1 font-bold inline-block mb-2">INTERNAL EXAMINATION</h3>
          <p className="pl-4 border-l-2 border-gray-300 py-1 leading-relaxed">{forensics.internalExam || 'Pending'}</p>
        </section>

        {forensics.toxicology && forensics.toxicology.length > 0 && (
          <section>
            <h3 className="bg-gray-800 text-white px-2 py-1 font-bold inline-block mb-2">TOXICOLOGY SCREEN</h3>
            <table className="w-full mt-2 border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Substance</th>
                  <th className="border border-gray-300 p-2">Result</th>
                  <th className="border border-gray-300 p-2">Level</th>
                  <th className="border border-gray-300 p-2">Reference</th>
                </tr>
              </thead>
              <tbody>
                {forensics.toxicology.map((tox, idx) => (
                  <tr key={idx} className={tox.result.toLowerCase() === 'positive' ? 'bg-red-50 text-red-900 font-bold' : ''}>
                    <td className="border border-gray-300 p-2">{tox.substance}</td>
                    <td className="border border-gray-300 p-2">{tox.result}</td>
                    <td className="border border-gray-300 p-2">{tox.level}</td>
                    <td className="border border-gray-300 p-2 text-gray-500 font-normal">{tox.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8 pt-4">
          <section>
            <h3 className="text-gray-500 font-bold border-b border-gray-300 mb-2">FINGERPRINTS</h3>
            <p className="text-xs leading-relaxed">{forensics.fingerprints || 'None recovered'}</p>
          </section>
          <section>
            <h3 className="text-gray-500 font-bold border-b border-gray-300 mb-2">DNA</h3>
            <p className="text-xs leading-relaxed">{forensics.dna || 'No foreign DNA detected'}</p>
          </section>
        </div>

        <section className="mt-8 border-4 border-gray-800 p-4 relative">
          <div className="absolute -top-3 left-4 bg-white px-2 font-bold text-gray-800 tracking-widest">CONCLUSION</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 font-bold block text-xs mb-1">CAUSE OF DEATH</span>
              <p className="text-lg font-bold text-red-700 uppercase">{forensics.causeOfDeath || 'Pending'}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block text-xs mb-1">MANNER OF DEATH</span>
              <p className="text-lg font-bold uppercase">{forensics.mannerOfDeath || 'Pending'}</p>
            </div>
          </div>
          {forensics.additionalNotes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-gray-500 font-bold block text-xs mb-1">EXAMINER NOTES</span>
              <p className="text-sm italic">{forensics.additionalNotes}</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ForensicReport;
