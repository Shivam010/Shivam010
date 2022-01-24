import * as fs from 'fs';
import path from 'path';
import prettier from 'prettier';

console.log('VERCEL_URL', process.env.VERCEL_URL);
const BaseUrl = `https://shivamrathore.com`;

// RoutesImagesInfo is used to add image information to routes's sitemap entry
// '<route>': [
//     {
//         loc: '<image url>',
//         title: '<image title>', // optional
//         caption: '<image caption>', // optional, if not provided title will be used
//         license: '<image license>', // default will be our license
//     },
// ],
const RoutesImagesInfo = {
    '/': [
        {
            loc: '/banner.png',
            title: 'Shivam Rathore - Software Developer • Cube Solver • Free Time Doodler • Paper Plane Pilot',
        },
        {
            loc: '/logo.svg',
            title: 'Shivam Logo',
        },
    ],
    '/about': [
        {
            loc: '/me.png',
            title: 'Shivam Rathore',
        },
    ],
    '/thanks': [
        {
            loc: '/images/A_flying_greater_racket-tailed_drongo.jpeg',
            title: 'The Great Racket-tailed Drongo is a beautiful songster and an excellent mimic. Photograph courtesy Md Shahanshah Bappy under the CC BY-SA 4.0 license.',
            license: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
    ],
};

function sitemapInfoOfRoute(route) {
    route = (route[0] === '/' ? '' : '/') + route;
    const routeInfo = RoutesImagesInfo[route];
    const images = routeInfo
        ? routeInfo.map((o) => {
              if (!o.caption) o.caption = o.title;
              return `<image:image> 
                <image:loc>${BaseUrl}${o.loc}</image:loc>
                ${o.title ? `<image:title>${o.title}</image:title>` : ''}
                ${
                    o.caption
                        ? `<image:caption>${o.caption}</image:caption>`
                        : ''
                }
                ${
                    o.license
                        ? `<image:license>${o.license}</image:license>`
                        : `<image:license>${BaseUrl}/license</image:license>`
                }
            </image:image>`;
          })
        : [];
    return `
    <url>
        <loc>${BaseUrl}${route}</loc>
        ${images.length > 0 ? images.join('\n') : ``}
    </url>
  `;
}

function readDirectories(dir) {
    const pages = [];
    const reader = (dir) => {
        fs.readdirSync(dir).forEach((f) => {
            if (f[0] === '_') return;
            const fp = path.join(dir, f);
            if (fs.statSync(fp).isDirectory()) return reader(fp);
            pages.push(fp);
        });
    };
    reader(dir);
    return pages;
}

async function generate() {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

    const pages = readDirectories('pages');
    pages.push('public/license');
    console.log(pages);

    const allUrls = pages
        .map((page) => {
            // update page's file path url to corresponding route
            const route = page
                .replace('pages', '')
                .replace('public', '')
                .replace('index.tsx', '')
                .replace('.tsx', '');

            return sitemapInfoOfRoute(route);
        })
        .join('');

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">
        ${allUrls}
    </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html',
    });

    fs.writeFileSync('public/sitemap.xml', formatted);
}

generate();
