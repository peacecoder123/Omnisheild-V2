import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { api } from '../utils/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function QRScanner({ onPatientScanned }) {
  const { user } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [scannedPatient, setScannedPatient] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);

  useEffect(() => {
    return () => {
      if (html5QrRef.current && scanning) {
        html5QrRef.current.stop().catch(() => {});
      }
    };
  }, [scanning]);

  async function startScanner() {
    setError('');
    setScannedPatient(null);
    setScanning(true);

    html5QrRef.current = new Html5Qrcode('qr-reader');

    try {
      await html5QrRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScan,
        () => {}
      );
    } catch (err) {
      setError('Camera access denied or not available.');
      setScanning(false);
    }
  }

  async function stopScanner() {
    if (html5QrRef.current) {
      await html5QrRef.current.stop().catch(() => {});
    }
    setScanning(false);
  }

  async function handleScan(decodedText) {
    await stopScanner();
    setLoading(true);
    setError('');

    try {
      let data;
      try {
        data = JSON.parse(decodedText);
      } catch (_) {
        setError('Invalid QR code. Could not parse data.');
        setLoading(false);
        return;
      }

      if (data.type !== 'OMNISHIELD_PATIENT') {
        setError('Invalid QR code. Not an OmniShield patient QR.');
        setLoading(false);
        return;
      }

      let geolocation = null;
      if (navigator.geolocation) {
        geolocation = await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => resolve(null),
            { timeout: 3000 }
          );
        });
      }

      const result = await api.post('/patients/scan', {
        patientId: data.patientId,
        scannedBy: user?.name || user?.id || 'Unknown',
        timestamp: new Date().toISOString(),
        geolocation,
      });

      setScannedPatient(result.patient);
      if (onPatientScanned) onPatientScanned(result.patient);
    } catch (err) {
      setError(err.message || 'Failed to process QR code.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Scan Patient QR Code</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>
      )}

      {!scannedPatient && (
        <>
          <div id="qr-reader" ref={scannerRef} className="w-full rounded-lg overflow-hidden" />
          <div className="flex gap-3">
            {!scanning ? (
              <button
                onClick={startScanner}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Start Scanner
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Stop Scanner
              </button>
            )}
          </div>
        </>
      )}

      {loading && (
        <div className="text-center text-gray-500 text-sm">Loading patient data…</div>
      )}

      {scannedPatient && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 text-lg">{scannedPatient.name}</h3>
            <p className="text-sm text-green-700">ID: {scannedPatient.id} · ABHA: {scannedPatient.abhaId}</p>
            <p className="text-sm text-green-700">{scannedPatient.age} y/o {scannedPatient.gender} · Blood: {scannedPatient.blood}</p>
            <p className="text-sm font-semibold mt-1">{scannedPatient.condition} — <span className={scannedPatient.status === 'Critical' ? 'text-red-600' : 'text-green-700'}>{scannedPatient.status}</span></p>
          </div>

          {scannedPatient.vitals && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Current Vitals</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><span className="text-gray-500">BP</span><br /><span className="font-medium">{scannedPatient.vitals.bp}</span></div>
                <div><span className="text-gray-500">HR</span><br /><span className="font-medium">{scannedPatient.vitals.hr} bpm</span></div>
                <div><span className="text-gray-500">SpO₂</span><br /><span className="font-medium">{scannedPatient.vitals.spo2}%</span></div>
              </div>
            </div>
          )}

          {scannedPatient.labTests?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Recent Lab Tests</h4>
              <div className="space-y-1">
                {scannedPatient.labTests.slice(0, 3).map((t) => (
                  <div key={t.id} className="flex justify-between text-sm bg-gray-50 rounded p-2">
                    <span>{t.test}</span>
                    <span className={`font-medium ${t.status === 'Complete' ? 'text-green-600' : t.status === 'Urgent' ? 'text-red-600' : 'text-yellow-600'}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {scannedPatient.prescriptions?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Active Prescriptions</h4>
              <div className="space-y-1">
                {scannedPatient.prescriptions.slice(0, 3).map((rx) => (
                  <div key={rx.id} className="flex justify-between text-sm bg-gray-50 rounded p-2">
                    <span>{rx.drug}</span>
                    <span className="text-gray-500">{rx.dosage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => { setScannedPatient(null); setError(''); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Scan Another Patient
          </button>
        </div>
      )}
    </div>
  );
}
