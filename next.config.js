/** @type {import('next').NextConfig} */
// next.config.js

// Определяем имя репозитория. Замените 'aggregator-demo' на ваше.
const repo = 'aggregatorsite'; 
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем статический экспорт
  output: 'export',

  // Устанавливаем префикс для всех ресурсов (CSS, JS, картинки)
  assetPrefix: assetPrefix,
  
  // Устанавливаем базовый путь для роутинга
  basePath: basePath,

  // Отключаем оптимизацию изображений для статического экспорта
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

