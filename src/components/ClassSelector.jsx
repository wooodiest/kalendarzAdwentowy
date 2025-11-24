import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function ClassSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentClass = location.pathname.replace('/', '');

  const handleClassChange = (classId) => {
    navigate(`/${classId}`);
  };

  return (
    <div className="flex gap-4 justify-center items-center mb-6">
      <Button
        color={currentClass === 'class1' ? 'blue' : 'gray'}
        onClick={() => handleClassChange('class1')}
        className="px-6 py-2"
      >
        Klasa 1
      </Button>
      <Button
        color={currentClass === 'class4' ? 'blue' : 'gray'}
        onClick={() => handleClassChange('class4')}
        className="px-6 py-2"
      >
        Klasa 4
      </Button>
    </div>
  );
}

