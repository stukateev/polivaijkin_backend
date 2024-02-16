const Product = require('../models/catalogs');
const { handleError, FORBIDDEN } = require('../utils/errors');
const validator = require("validator");


async function generateSitemap() {
    try {
        const products = await Product.find({}, { _id: 1 }); // Получаем только _id каждого продукта
        const pages = [
            { url: '/', changefreq: 'daily', priority: 1.0 },
            { url: '/market', changefreq: 'weekly', priority: 0.8 },
            { url: '/uslugi/landscape-light', changefreq: 'weekly', priority: 0.8 },
            { url: '/uslugi/landscape-design', changefreq: 'weekly', priority: 0.8 },
            { url: '/uslugi/irrigation', changefreq: 'weekly', priority: 0.8 },
            { url: '/uslugi/bath', changefreq: 'weekly', priority: 0.8 },
            ...products.map(product => ({
                url: `/market/product-card/${product._id}`,
                changefreq: 'daily',
                priority: 0.8
            }))
        ];

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages.map(
            page => `
            <url>
              <loc>${page.url}</loc>
              <changefreq>${page.changefreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `).join('')}
        </urlset>`;

        return sitemapXml;
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return null;
    }
}

module.exports = generateSitemap;