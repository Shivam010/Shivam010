import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type OgInfoProps = {
    dest: string;
    domain: string;
    title: string;
    description: string;
    image: string;
};

export const ogInfo: { [key: string]: OgInfoProps } = {
    '/': {
        dest: 'https://www.threads.net/@shivam010.in',
        domain: 'shivamrathore.com',
        title: 'Shivam Rathore (shivam010.in) | Threads.net',
        description:
            "I quit my job to live and work for myself on my own terms. Let's grow together! My Projects: divity.app, esmile.app",
        image: '/og/threads.png',
    },
    '/threads': {
        dest: 'https://www.threads.net/@shivam010.in',
        domain: 'shivamrathore.com',
        title: 'Shivam Rathore (shivam010.in) | Threads.net',
        description:
            "I quit my job to live and work for myself on my own terms. Let's grow together! My Projects: divity.app, esmile.app",
        image: '/og/threads.png',
    },
    '/tw': {
        dest: 'https://twitter.com/intent/follow?user_id=701765134574817280',
        domain: 'shivamrathore.com',
        title: 'Shivam Rathore (@010Shivam) | Twitter',
        description:
            "I quit my job to live and work for myself on my own terms. Let's grow together! My Projects: divity.app, esmile.app",
        image: '/og/twitter.png',
    },
    '/twitter': {
        dest: 'https://twitter.com/intent/follow?user_id=701765134574817280',
        domain: 'shivamrathore.com',
        title: 'Shivam Rathore (@010Shivam) | Twitter',
        description:
            "I quit my job to live and work for myself on my own terms. Let's grow together! My Projects: divity.app, esmile.app",
        image: '/og/twitter.png',
    },
};

export const config = {
    matcher: ['/', '/tw', '/twitter', '/threads'],
};

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
    const path = req.nextUrl.pathname;
    const info = ogInfo[path];

    console.log(path, info);
    if (!info) return NextResponse.next();

    const isBot = detectBot(req);

    if (isBot) {
        return NextResponse.rewrite(new URL('/_ogp' + path, req.url), {
            headers: [['Cache-Control', 'public, max-age=31536000, immutable']],
        });
    }

    return NextResponse.redirect(new URL(info.dest, req.url), {
        status: 308,
        headers: [['Cache-Control', 'public, max-age=31536000, immutable']],
    });
}

// Copied from https://github.com/steven-tey/dub/blob/37634e5c1fdfb8a614e1f634c20447451370fc0d/lib/middleware/utils.ts#L37
export const detectBot = (req: NextRequest) => {
    const url = req.nextUrl;
    if (url.searchParams.get('bot')) return true;
    const ua = req.headers.get('User-Agent');
    if (ua) {
        /* Note:
         * - bot is for most bots & crawlers
         * - ChatGPT is for ChatGPT
         * - facebookexternalhit is for Facebook crawler
         * - WhatsApp is for WhatsApp crawler
         * - MetaInspector is for https://metatags.io/
         */
        return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
            ua,
        );
    }
    return false;
};
