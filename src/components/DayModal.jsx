import { useState, useEffect } from 'react';
import { getTaskImage } from '../utils/imageRegistry';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function DayModal({ show, onClose, task, day, classId }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!show || !task || !classId || !day) {
      setImageUrl(null);
      setImageLoading(false);
      return;
    }

    async function loadImage() {
      setImageLoading(true);
      const url = await getTaskImage(classId, day);
      setImageUrl(url);
      setImageLoading(false);
    }

    loadImage();
  }, [show, task, classId, day]);

  if (!show || !task) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-winter-dark/70 backdrop-blur-sm px-2 sm:px-4"
      onClick={onClose}
    >
      <div 
        className="inline-block bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl border border-winter-light"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-winter-blue to-winter-dark text-white px-4 sm:px-2 py-3 sm:py-2 flex items-center justify-between">
          <span className="text-xl font-bold">
            {task.title}
          </span>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white w-10 h-10 hover:bg-white/10 rounded transition-colors flex items-center justify-center shrink-0"
            aria-label="Zamknij"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white p-3 sm:p-4">
          <div className="flex justify-center min-h-[200px] items-center">
            {imageLoading ? (
              <div className="px-6 py-10 text-center text-gray-400">
                <p className="font-medium">Ładowanie obrazka...</p>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={`Zadanie dla dnia ${day}`}
                className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg bg-white"
                onError={() => {
                  setImageUrl(null);
                  setImageLoading(false);
                }}
              />
            ) : (
              <div className="px-6 py-10 text-center text-gray-600">
                <p className="font-semibold mb-2">
                  Brak obrazka z zadaniem dla tego dnia.
                </p>
                <p className="text-sm text-gray-500">
                  Upewnij się, że w folderze <code>public/data/{classId}</code> istnieje plik <code>{day}.png</code> lub <code>{day}.jpg</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

