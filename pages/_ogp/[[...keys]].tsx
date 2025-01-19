import { OgInfoProps, ogInfo } from 'middleware-deprecated';
import Head from 'next/head';
import Link from 'next/link';

const GOOGLE_FAVICON_URL =
    'https://www.google.com/s2/favicons?sz=64&domain_url=';

export default function LinkPage({
    dest: link,
    domain,
    title,
    description,
    image,
}: OgInfoProps) {
    return (
        <>
            <Head>
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={domain} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta
                    property="og:image:alt"
                    content={`OG image for ${title} (${link})`}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={domain} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta
                    property="twitter:image:alt"
                    content={`OG image for ${title} (${link})`}
                />
                <meta charSet="utf-8" />
                <link rel="icon" href={`${GOOGLE_FAVICON_URL}${domain}`} />
            </Head>
            <main className="flex h-screen w-screen items-center justify-center">
                <Link
                    href={link}
                    className={
                        'mx-5 w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 sm:mx-0 hover:brightness-110'
                    }
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full object-cover"
                    />
                    <div className="flex space-x-3 bg-gray-100 p-5">
                        <img
                            src={`${GOOGLE_FAVICON_URL}${domain}`}
                            alt={title}
                            className="mt-1 h-6 w-6"
                        />
                        <div className="flex flex-col space-y-3">
                            <h1 className="font-bold text-gray-700">{title}</h1>
                            <p className="text-sm text-gray-500">
                                {description}
                            </p>
                        </div>
                    </div>
                </Link>
            </main>
        </>
    );
}

export async function getStaticPaths() {
    const paths = Object.keys(ogInfo).map((key) => ({
        params: { keys: key.split('/').filter((k) => k) },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps({
    params,
}: {
    params: { keys: string[] };
}) {
    let key = '';
    if (params.keys?.length > 0) {
        key = params.keys.join('/');
    }

    const info = ogInfo['/' + key];

    return {
        props: info,
    };
}
