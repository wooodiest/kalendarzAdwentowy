import ClassSelector from './ClassSelector';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-winter-light via-white to-winter-light">
      <header className="bg-gradient-to-r from-winter-blue via-winter-blue to-winter-dark text-white shadow-xl">
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

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {children}
      </main>

      <footer className="mt-16 py-8 text-center border-t border-gray-200 bg-white/50">
        <p className="text-gray-600 text-sm">
          © 2025 Kalendarz Adwentowy - Matematyka dla Klas 1 i 4
        </p>
      </footer>
    </div>
  );
}

