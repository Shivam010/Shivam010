import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import Footer from './Footer';

export type Metadata = {
    title?: string;
    description?: string;
    image?: string;
    ogType?: 'website' | 'article';
    publishedOn?: Date;
    canonicalUrlPath?: string;
    canonicalUrlDomain?: string;
};

export function Container({
    metadata,
    children,
}: PropsWithChildren<{ metadata?: Metadata }>) {
    const router = useRouter();

    const meta: Metadata = {
        title: 'Shivam Rathore • Shivam010 • ᕦ(ツ)ᕤ • A Weird Enthusiastic Programmer',
        description: `Hello, I'm Shivam Rathore - a weird but enthusiastic programmer. I work as a Sr. Software Engineer at Appointy`,
        image: 'https://shivam010.in/banner.webp',
        ogType: 'website',
        canonicalUrlPath: router.asPath,
        canonicalUrlDomain: 'https://shivam010.in',
        ...metadata,
    };
    if (meta.canonicalUrlDomain.endsWith('/'))
        meta.canonicalUrlDomain = meta.canonicalUrlDomain.slice(0, -1);
    if (!meta.canonicalUrlPath.startsWith('/'))
        meta.canonicalUrlPath = '/' + meta.canonicalUrlPath;

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="author" content="Shivam Rathore" />
                <meta name="creator" content="Shivam Rathore" />
                <meta name="publisher" content="Shivam Rathore" />
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta name="color-scheme" content="dark light" />
                <meta
                    property="og:url"
                    content={meta.canonicalUrlDomain + meta.canonicalUrlPath}
                />
                <link
                    rel="canonical"
                    href={meta.canonicalUrlDomain + meta.canonicalUrlPath}
                />
                <meta property="og:type" content={meta.ogType} />
                <meta property="og:site_name" content="Shivam Rathore" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@010shivam" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.publishedOn && (
                    <meta
                        property="article:published_time"
                        content={meta.publishedOn.toISOString()}
                    />
                )}
            </Head>
            <main id="skip" className="flex flex-col justify-center px-8 ">
                {children}
                <Footer />
            </main>
        </>
    );
}
