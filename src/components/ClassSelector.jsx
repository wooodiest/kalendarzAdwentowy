import { useNavigate, useLocation } from 'react-router-dom';

export default function ClassSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentClass = location.pathname.replace('/', '');

  const handleClassChange = (classId) => {
    navigate(`/${classId}`);
  };

  const classes = [
    { id: 'klasa1', label: 'Klasa 1' },
    { id: 'klasa2', label: 'Klasa 2' },
  ];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center items-center">
      {classes.map((cls) => {
        const isActive = currentClass === cls.id;
        return (
          <button
            key={cls.id}
            onClick={() => handleClassChange(cls.id)}
            className={`
              px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base
              transition-all duration-300 transform
              ${
                isActive
                  ? 'bg-white text-winter-dark shadow-lg scale-105 hover:scale-110'
                  : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
              }
            `}
          >
            {cls.label}
          </button>
        );
      })}
    </div>
  );
}

