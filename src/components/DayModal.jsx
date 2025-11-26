export default function DayModal({ show, onClose, task, day }) {
  if (!show || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md mx-4 rounded-xl shadow-2xl overflow-hidden bg-winter-light">
        <div className="bg-gradient-to-r from-winter-blue to-winter-dark text-white px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            Dzień {day} - {task.title}
          </span>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none px-2"
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-6 bg-winter-light">
          <div className="text-center py-4 space-y-4">
            <p className="text-3xl font-bold text-winter-dark mb-2">
              {task.content}
            </p>
            {task.image && (
              <img
                src={task.image}
                alt={`Task for day ${day}`}
                className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
        <div className="px-6 py-4 bg-winter-light border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-winter-blue text-white rounded-lg hover:bg-winter-dark transition-colors font-semibold"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}

