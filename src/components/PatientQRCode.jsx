import { QRCodeSVG } from 'qrcode.react';

export default function PatientQRCode({ patient, size = 200 }) {
  const qrData = JSON.stringify({
    type: 'OMNISHIELD_PATIENT',
    patientId: patient.id,
    name: patient.name,
    abhaId: patient.abhaId,
    blood: patient.blood,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 max-w-sm mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
        <p className="text-sm text-gray-500">ID: {patient.id}</p>
      </div>

      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
        <QRCodeSVG value={qrData} size={size} level="H" includeMargin />
      </div>

      <div className="w-full space-y-1 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">ABHA ID</span>
          <span>{patient.abhaId || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Age / Gender</span>
          <span>{patient.age} / {patient.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Blood Type</span>
          <span className="font-semibold text-red-600">{patient.blood}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Condition</span>
          <span>{patient.condition}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Status</span>
          <span className={`font-semibold ${
            patient.status === 'Critical' ? 'text-red-600' :
            patient.status === 'Stable' ? 'text-green-600' :
            'text-yellow-600'
          }`}>{patient.status}</span>
        </div>
      </div>
    </div>
  );
}
