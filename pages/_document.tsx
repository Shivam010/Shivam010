import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Count and analysis */}
                <link
                    rel="preconnect"
                    href={process.env.NEXT_PUBLIC_GOAT_COUNTER_ENDPOINT}
                    crossOrigin=""
                />
                {/* Font tags */}
                <link
                    rel="preload"
                    href="/fonts/Open_Sans.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Open_Sans_Italic.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Brightwall_Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                {/* Favicon tags */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicons/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/favicons/safari-pinned-tab.svg"
                    color="#0a0a0c"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Shivam Rathore"
                />
                <meta name="application-name" content="Shivam Rathore" />
                <link rel="shortcut icon" href="/favicons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#0a0a0c" />
                <meta
                    name="msapplication-config"
                    content="/favicons/browserconfig.xml"
                />
                <meta name="theme-color" content="#0a0a0c" />
            </Head>
            <body className="bg-rang-900 text-rang-0">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
