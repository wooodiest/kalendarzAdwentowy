import ClassSelector from './ClassSelector';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-winter-light-soft via-white to-winter-light">
      <header className="bg-gradient-to-r from-winter-blue via-winter-blue-dark to-winter-dark text-white shadow-xl">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">
              Kalendarz Adwentowy
            </h1>
            <p className="text-winter-light text-sm sm:text-base md:text-lg font-medium">
              Zadania Matematyczne
            </p>
          </div>
          <ClassSelector />
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-6">
        {children}
      </main>

      <footer className="mt-16 py-8 text-center border-t border-winter-light bg-winter-light-soft/30">
        <p className="text-gray-600 text-sm">
          © 2025 Matematyczny Kalendarz Adwentowy
        </p>
      </footer>
    </div>
  );
}

