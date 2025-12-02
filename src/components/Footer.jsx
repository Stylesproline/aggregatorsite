export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        <p>© 2025 Агрегатор объявлений. Все права защищены.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:underline">О нас</a>
          <a href="#" className="hover:underline">Политика конфиденциальности</a>
          <a href="#" className="hover:underline">Помощь</a>
        </div>
      </div>
    </footer>
  );
}
