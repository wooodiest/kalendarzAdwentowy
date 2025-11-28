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
      className="fixed inset-0 z-50 flex items-center justify-center bg-winter-dark/70 backdrop-blur-sm px-1 sm:px-2 md:px-4"
      onClick={onClose}
    >
      <div 
        className="inline-block bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl border border-winter-light"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-winter-blue to-winter-dark text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center justify-between gap-2">
          <span className="text-base sm:text-lg md:text-xl font-bold truncate pr-2">
            {task.title}
          </span>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white active:text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 hover:bg-white/10 active:bg-white/20 rounded transition-colors flex items-center justify-center shrink-0"
            aria-label="Zamknij"
          >
            <XMarkIcon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>
        <div className="bg-white p-2 sm:p-3 md:p-4">
          <div className="flex justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px] items-center">
            {imageLoading ? (
              <div className="px-4 sm:px-6 py-6 sm:py-10 text-center text-gray-400">
                <p className="font-medium text-sm sm:text-base">Ładowanie obrazka...</p>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={`Zadanie dla dnia ${day}`}
                className="max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg bg-white"
                onError={() => {
                  setImageUrl(null);
                  setImageLoading(false);
                }}
              />
            ) : (
              <div className="px-4 sm:px-6 py-6 sm:py-10 text-center text-gray-600">
                <p className="font-semibold mb-2 text-sm sm:text-base">
                  Brak obrazka z zadaniem dla tego dnia.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

