import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';

export default function AdDetail({ ads }) {
  const router = useRouter();
  const { id } = router.query;
  const [ad, setAd] = useState(null);

  useEffect(() => {
    if (ads && id) {
      const foundAd = ads.find(item => item.id === Number(id));
      setAd(foundAd);
    }
  }, [ads, id]);

  if (!ad) {
    return <div className="text-center py-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>

          {ad.image && (
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}

          <p className="text-gray-700 mb-4">{ad.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <strong>Цена:</strong> {ad.price} руб.
            </div>
            <div>
              <strong>Дата:</strong> {ad.date}
            </div>
            <div>
              <strong>Категория:</strong> {ad.category}
            </div>
            <div>
              <strong>Источник:</strong> {ad.source}
            </div>
          </div>

          <a
            href={ad.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Перейти к объявлению
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'public', 'ads.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const ads = JSON.parse(data);

  const paths = ads.map(ad => ({
    params: { id: ad.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
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
