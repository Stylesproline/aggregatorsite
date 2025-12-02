import { useState, useEffect } from 'react';
import AdCard from '../components/AdCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({ ads }) {
  const [filteredAds, setFilteredAds] = useState(ads);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;

  useEffect(() => {
    let result = ads;

    if (searchTerm) {
      result = result.filter(ad =>
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(ad => ad.category === selectedCategory);
    }

    if (sortOrder === 'price-asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'date-new') {
      result = result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredAds(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOrder, ads]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const categories = [...new Set(ads.map(ad => ad.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold text-center my-6">Агрегатор объявлений</h1>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Поиск:</label>
            <input
              type="text"
              placeholder="Поиск по названию или описанию"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Фильтр по категории:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Все категории</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Сортировка:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Без сортировки</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="date-new">Новизна</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAds.length > 0 ? (
            currentAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))
          ) : (
            <p className="text-center col-span-full">Объявлений не найдено</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'public', 'ads.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const ads = JSON.parse(data);

  return {
    props: {
      ads,
    },
  };
}
