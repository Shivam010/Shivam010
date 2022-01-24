/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    swcMinify: true,
    trailingSlash: false,
    reactStrictMode: true,
    headers,
    rewrites: async () => {
        return [
            {
                source: '/favicon.ico',
                destination: '/favicons/favicon.ico',
            },
        ];
    },
    redirects: async () => {
        return [
            {
                source: '/resume',
                destination: '/resume.pdf',
                permanent: true,
            },
            {
                source: '/me',
                destination: '/me.png',
                permanent: true,
            },
        ];
    },
};

async function headers() {
    const res = [
        {
            source: '/:slug*',
            headers: [
                {
                    key: 'x-author',
                    value: 'Shivam Rathore',
                },
            ],
        },
        {
            source: '/license',
            headers: [
                {
                    key: 'content-type',
                    value: 'text/plain; charset=utf-8',
                },
            ],
        },
    ];
    const cachedSources = [
        '/me.png',
        '/license',
        '/logo.svg',
        '/banner.png',
        '/resume.pdf',
        '/fonts/:slug*',
        '/images/:slug*',
        '/favicons/:slug*',
    ];
    res.push(
        ...cachedSources.map((s) => ({
            source: s,
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        })),
    );
    return res;
}
