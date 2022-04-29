/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    swcMinify: true,
    trailingSlash: false,
    reactStrictMode: true,
    headers: async () => {
        return [
            ...otherHeaders(),
            ...securityHeaders(),
            ...cacheControlHeaders(),
        ];
    },
    rewrites: async () => {
        return [
            {
                source: '/favicon.ico',
                destination: '/favicons/favicon.ico',
            },
            {
                source: '/resume',
                destination: '/resume.v3.pdf',
            },
            {
                source: '/resume.pdf',
                destination: '/resume.v3.pdf',
            },
        ];
    },
    redirects: async () => {
        return [
            {
                source: '/me',
                destination: '/me.png',
                permanent: true,
            },
        ];
    },
};

function otherHeaders() {
    return [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'X-Author',
                    value: 'Shivam Rathore',
                },
                {
                    key: 'X-Got-Some-Interesting-Idea',
                    value: 'Contact me@shivam010.in',
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
}

function securityHeaders() {
    // Headers are set based on https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    return [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'origin-when-cross-origin',
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=31536000; includeSubDomains; preload',
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN',
                },
                {
                    key: 'Permissions-Policy',
                    value: 'camera=(), microphone=(), geolocation=()',
                },
                {
                    key: 'Content-Security-Policy',
                    // https://developers.google.com/web/fundamentals/security/csp
                    value: [
                        'upgrade-insecure-requests; ',
                        "default-src 'self' shivam010.in shivam010.in *.shivam010.in *.shivam010.in; ",
                        "base-uri 'self'; ",
                        "child-src 'self' *.shivam010.in; ",
                        'connect-src *; ',
                        "form-action 'self'; ",
                        "frame-ancestors 'self'; ",
                        'img-src * blob: data:; ',
                        "style-src 'self' 'unsafe-inline'; ",
                        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://gc.zgo.at; ",
                    ].join(' '),
                },
            ],
        },
    ];
}

function cacheControlHeaders() {
    // These pages and resources are cached as immutable
    const cachedSources = [
        '/me.png',
        '/license',
        '/logo.svg',
        '/banner.png',
        '/resume.:version.pdf',
        '/fonts/:slug*',
        '/images/:slug*',
        '/favicons/:slug*',
    ];
    return cachedSources.map((s) => ({
        source: s,
        headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
            },
        ],
    }));
}
