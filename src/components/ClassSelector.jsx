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
    <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center items-center">
      {classes.map((cls) => {
        const isActive = currentClass === cls.id;
        return (
          <button
            key={cls.id}
            onClick={() => handleClassChange(cls.id)}
            className={`
              px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold 
              text-xs sm:text-sm md:text-base
              transition-all duration-300 transform active:scale-95
              ${
                isActive
                  ? 'bg-white text-winter-dark shadow-lg scale-105 sm:hover:scale-110'
                  : 'bg-white/20 text-white sm:hover:bg-white/30 sm:hover:scale-105'
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

