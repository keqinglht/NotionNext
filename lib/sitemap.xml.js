
import fs from 'fs'
import BLOG from '@/blog.config'

export async function generateSitemapXml({ allPages }) {
  const urls = [{
    loc: `${BLOG.LINK}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily'
  }, {
    loc: `${BLOG.LINK}/archive`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily'
  }, {
    loc: `${BLOG.LINK}/category`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily'
  }, {
    loc: `${BLOG.LINK}/tag`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily'
  }]

  allPages?.forEach(post => {
    urls.push({
      loc: `${BLOG.LINK}/${post.slug}`,
      lastmod: new Date(post?.publishTime || post?.createdTime).toISOString().split('T')[0],
      changefreq: 'daily'
    })
  })
  const xml = createSitemapXml(urls)
  try {
    fs.writeFileSync('sitemap.xml', xml)
    fs.writeFileSync('./public/sitemap.xml', xml)
  } catch (error) {
    console.warn('无法写入文件', error)
  }
}
function createSitemapXml(urls) {
  let urlsXml = ''
  urls.forEach(u => {
    urlsXml += `<url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    </url>
    `
  })

  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${urlsXml}
    </urlset>
    `
}
