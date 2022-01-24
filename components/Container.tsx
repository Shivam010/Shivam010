import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.svg';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import Footer from './Footer';

export type Metadata = {
    title?: string;
    description?: string;
    image?: string;
    ogType?: 'website' | 'article';
    publishedOn?: Date;
};

export function Container({
    metadata,
    children,
    hideLogo,
    hideThemeButton,
}: PropsWithChildren<{
    metadata?: Metadata;
    hideLogo?: boolean;
    hideThemeButton?: boolean;
}>) {
    const { forcedTheme, resolvedTheme, setTheme } = useTheme();
    const router = useRouter();

    // After mounting, we have access to the theme
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    let strictDarkMode: boolean;
    if (mounted && forcedTheme) {
        strictDarkMode = true;
    }

    const meta: Metadata = {
        title: 'Shivam Rathore – Shivam010',
        description: `Software Developer • Free Time Doodler • Paper Plane Enthusiast • Rubik's Cuber • Potterhead • Marvel Fan`,
        image: 'https://shivamrathore.com/banner.png',
        ogType: 'website',
        ...metadata,
    };

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
                    content={`https://shivamrathore.com${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://shivamrathore.com${router.asPath}`}
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
            <div className="flex flex-col justify-center px-8">
                <nav className="flex items-center justify-between w-full relative max-w-[64rem] mx-auto md:px-2 pt-8 pb-10 bg-opacity-60">
                    {Logo(strictDarkMode || hideLogo)}
                    {ToggleDarkModeButton(
                        strictDarkMode,
                        mounted,
                        resolvedTheme,
                        setTheme,
                        hideThemeButton,
                    )}
                </nav>
            </div>
            <main id="skip" className="flex flex-col justify-center px-8 ">
                {children}
                <Footer />
            </main>
        </>
    );
}

export function Logo(hideLogo: boolean) {
    return hideLogo ? (
        <span></span>
    ) : (
        <Link href={'/'}>
            <a className=" inline-block font-bold font-logo text-3xl select-none hover:scale-125 -rotate-6 duration-700">
                <svg
                    version="1.2"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20"
                    viewBox="0 0 1024 1024"
                >
                    <g id="Sh">
                        <path
                            id="Path 0"
                            className="fill-rang-0 dark:fill-rang-900"
                            d="M509.75.13c20.72-.1 32.1.35 47.5 1.89 11.14 1.11 26.1 2.94 33.25 4.07 7.15 1.13 20.42 3.59 29.5 5.46 9.07 1.87 24.15 5.62 33.5 8.34 9.35 2.72 21.05 6.35 26 8.06 4.95 1.72 15.97 5.9 24.5 9.29 8.52 3.39 25.85 11.38 38.5 17.74 12.65 6.37 29.89 15.84 38.31 21.05 8.42 5.21 20.79 13.4 27.5 18.19 6.71 4.79 16.92 12.49 22.69 17.09 5.77 4.61 17.47 14.67 26 22.36 8.52 7.69 20.53 19.35 26.68 25.91 6.15 6.56 16.22 17.99 22.39 25.42 6.16 7.42 15.29 19.13 20.27 26 4.98 6.88 12.27 17.45 16.19 23.5 3.92 6.05 10.08 16.17 13.69 22.5 3.6 6.32 9.7 17.8 13.55 25.5 3.85 7.7 10.02 20.97 13.72 29.5 3.7 8.52 9.79 24.72 13.55 36 3.75 11.27 8.41 26.57 10.34 34 1.93 7.42 4.66 19.13 6.05 26 1.4 6.88 3.43 18.35 4.53 25.5 1.1 7.15 2.91 22 4.02 33 1.46 14.35 2.03 27.07 2.02 45 0 14.42-.64 31.77-1.51 41-.83 8.8-2.43 22.75-3.56 31s-3.4 21.75-5.04 30c-1.64 8.25-4.59 21.07-6.54 28.5-1.96 7.42-5.58 19.8-8.06 27.5-2.48 7.7-6.21 18.5-8.3 24-2.09 5.5-6.15 15.4-9.02 22-2.87 6.6-8.37 18.3-12.21 26-3.85 7.7-9.95 19.17-13.57 25.5-3.62 6.32-9.93 16.67-14.03 23-4.1 6.32-11.73 17.35-16.95 24.5-5.22 7.15-14.93 19.52-21.58 27.5-6.65 7.97-19.52 21.94-28.61 31.02-9.09 9.09-22.3 21.46-29.37 27.5-7.07 6.04-17.89 14.8-24.04 19.48-6.15 4.67-16.12 11.86-22.15 15.97-6.03 4.11-17.26 11.24-24.96 15.85-7.7 4.61-23.9 13.26-36 19.22-12.1 5.96-29.43 13.74-38.5 17.28-9.08 3.55-19.43 7.44-23 8.66-3.58 1.21-14.15 4.43-23.5 7.15-9.35 2.72-24.65 6.52-34 8.44-9.35 1.93-22.63 4.37-29.5 5.43-6.88 1.06-21.61 2.84-32.75 3.97-14.49 1.46-27.36 2.04-45.25 2.04-17.61 0-30.98-.59-45.25-2-11.14-1.1-24.75-2.71-30.25-3.56-5.5-.86-18.1-3.15-28-5.11-9.9-1.95-24.3-5.31-32-7.47-7.7-2.16-18.95-5.53-25-7.49-6.05-1.96-18.43-6.47-27.5-10.03-9.08-3.56-26.4-11.34-38.5-17.29-12.1-5.95-28.53-14.76-36.5-19.58-7.98-4.82-18.55-11.48-23.5-14.81-4.95-3.33-15.08-10.63-22.5-16.22-7.43-5.59-19.35-15.27-26.5-21.5-7.15-6.23-19.98-18.33-28.5-26.88-8.53-8.55-20.95-22.08-27.61-30.05-6.66-7.98-16.37-20.35-21.6-27.5-5.22-7.15-12.85-18.18-16.95-24.5-4.1-6.33-10.41-16.68-14.03-23-3.62-6.33-9.73-17.8-13.58-25.5-3.85-7.7-10.02-20.98-13.72-29.5-3.7-8.53-9.79-24.73-13.55-36-3.75-11.28-8.41-26.58-10.34-34-1.93-7.43-4.66-19.13-6.05-26-1.4-6.88-3.43-18.35-4.53-25.5-1.1-7.15-2.91-22-4.02-33-1.46-14.35-2.03-27.07-2.02-45 0-14.42.64-31.77 1.51-41 .83-8.8 2.43-22.75 3.56-31s3.39-21.75 5.02-30c1.63-8.25 4.56-21.08 6.51-28.5 1.95-7.43 6.62-22.73 10.38-34 3.76-11.28 9.58-26.91 12.93-34.75 3.35-7.84 9.52-21.11 13.71-29.5 4.19-8.39 10.57-20.43 14.17-26.75 3.6-6.33 9.91-16.68 14.02-23 4.11-6.33 11.75-17.35 16.97-24.5 5.23-7.15 14.95-19.53 21.61-27.5 6.66-7.98 19.08-21.51 27.61-30.07 8.53-8.56 20.9-20.27 27.5-26.01 6.6-5.74 16.01-13.59 20.92-17.43s14.81-11.13 22-16.2c7.19-5.07 20.28-13.55 29.08-18.86 8.8-5.31 25.9-14.52 38-20.47 12.1-5.95 29.42-13.73 38.5-17.27 9.07-3.55 19.42-7.44 23-8.66 3.57-1.21 14.15-4.43 23.5-7.15 9.35-2.72 24.42-6.47 33.5-8.35 9.07-1.87 21-4.15 26.5-5.06 5.5-.91 19.45-2.69 31-3.94C477.56.81 488.91.24 509.75.14z"
                        />
                        <path
                            id="Path 1"
                            className="fill-rang-900 dark:fill-rang-0"
                            d="M710.02 102c2.73-.04 9.15.47 14.27 1.13 6.03.78 12.15 2.59 17.38 5.16 4.44 2.18 10.9 6.79 14.35 10.25 3.46 3.46 7.73 9.36 9.5 13.11 1.77 3.75 3.89 10.18 4.71 14.27.99 4.92 1.28 14.82.88 29.17-.4 14.16-1.54 26.91-3.26 36.62-1.46 8.19-4.65 23.55-7.1 34.14-2.45 10.58-8.05 31.53-12.46 46.55-4.4 15.02-12.65 41.27-18.33 58.34-5.78 17.38-15.34 42.5-21.72 57.1-6.27 14.34-21.73 46.18-34.36 70.75-12.63 24.58-29.71 58.37-52.9 105.51l.63 27.93c.44 19.82 1.14 29.37 2.41 32.89.98 2.73 1.6 7.34 1.38 10.24-.23 2.9-.13 5.28.21 5.28.34 0 1.46-1.68 2.48-3.72 1.02-2.05 3.54-9.73 5.6-17.07 2.06-7.34 3.73-14.32 3.72-15.52-.01-1.38-.69-1.94-1.87-1.55-1.02.34-2.12.2-2.43-.31-.31-.51.24-2.19 1.24-3.72 1.21-1.87 2.63-2.59 4.29-2.17 2.21.55 2.41.14 1.86-3.72-.35-2.48-.09-4.34.62-4.34.68 0 2.01-1.54 2.96-3.41.95-1.88 5.37-13.19 9.82-25.14 4.46-11.95 10.03-26.19 12.38-31.65 2.35-5.46 7.22-15.8 10.81-22.96 3.59-7.17 8.8-16.94 11.58-21.72 2.78-4.78 7.66-11.48 10.86-14.9 3.5-3.74 8.72-7.55 13.11-9.58 4.01-1.86 10.65-3.73 14.75-4.17 4.27-.46 9.7-.21 12.72.58 3.65.95 6.43 2.81 9.01 6.03 2.05 2.56 4.82 8.01 6.15 12.1 1.33 4.1 2.72 9.4 3.1 11.79.38 2.39 1.54 21.38 2.59 42.2 1.04 20.82 2.73 45.4 3.74 54.62 1.01 9.22 2.69 21.78 3.74 27.93 1.05 6.14 2.81 14.52 3.92 18.62 1.11 4.1 2.95 9.68 4.09 12.41 1.14 2.73 3.14 5.99 4.44 7.25 1.68 1.62 3.27 2.04 5.47 1.42 1.71-.47 6.18-2.98 9.93-5.56 3.75-2.59 10.08-7.7 14.05-11.35 3.97-3.66 12.69-14.47 19.38-24.03 6.69-9.56 13.07-17.52 14.19-17.69 1.33-.2 2.31.88 2.81 3.1.43 1.88.08 6.77-.76 10.86-.85 4.1-3.47 13.31-5.83 20.48s-6.45 17.5-9.08 22.96c-2.63 5.46-7.2 12.41-10.15 15.44-2.95 3.03-7.88 6.65-10.95 8.05-4.14 1.88-8.16 2.54-15.52 2.54-7 0-12.31-.81-18-2.75-4.44-1.51-11.57-4.86-15.85-7.43-4.28-2.57-10.63-7.47-14.12-10.89-4.16-4.07-7.99-9.62-11.13-16.14-2.63-5.46-6.2-15.52-7.94-22.34-1.74-6.83-3.98-18.7-4.99-26.38-1.01-7.68-2.43-25-3.16-38.48-.73-13.48-1.71-31.5-3.02-55.55l-2.79 4.65c-1.54 2.56-4.05 5.14-5.59 5.73-1.97.75-3.04 2.49-3.64 5.9-.47 2.65-1.82 5.66-3 6.69-1.18 1.02-3.75 4.1-5.7 6.83-2.74 3.82-3.54 6.32-3.52 10.86.03 5.18-.56 6.53-4.9 11.17-3.55 3.8-4.94 4.67-4.97 3.1-.02-1.19 1.4-5.94 3.15-10.55s8.45-19.41 14.9-32.89c6.44-13.48 11.44-24.93 11.1-25.45-.34-.51-.84-.65-1.1-.31-.26.34-3.69 7.04-7.61 14.9-3.92 7.85-10.46 21.82-14.54 31.03-4.07 9.22-10.5 24.3-14.28 33.52-3.78 9.22-8.5 21.51-10.49 27.31-1.99 5.8-3.37 11.11-3.08 11.79.29.68 2.05-2.11 3.9-6.21s5.57-13.31 8.27-20.48c2.69-7.17 5.44-13.59 6.1-14.27.79-.82 1.2-.39 1.19 1.24-.01 1.37-6.17 27.34-13.69 57.72-7.64 30.84-14.51 61.54-15.57 69.51-1.04 7.85-2.72 18.46-3.73 23.58-1.01 5.12-2.67 11.96-3.68 15.21-1.11 3.55-3.2 6.9-5.25 8.42-1.88 1.39-5.09 2.5-7.14 2.47-2.05-.03-6.52-1.35-9.93-2.94-3.41-1.59-8.02-4.65-10.24-6.82-3.42-3.33-4.04-4.83-4.06-9.83-.02-3.24-1.13-8.27-2.48-11.17-1.35-2.9-3.01-5.55-3.7-5.9-.68-.34-1.79.36-2.46 1.55-1.06 1.9-1.38 1.93-2.49.31-.7-1.02-2.61-6.05-4.24-11.17-1.64-5.12-4.67-17.13-6.75-26.69-2.08-9.56-4.62-23.24-5.66-30.41-1.04-7.17-2.44-19.74-3.11-27.93-.68-8.19-1.6-26.63-2.06-40.96-.46-14.57-.19-43.31.62-65.17.8-21.51 2.53-51.39 3.85-66.41 1.32-15.02 3.54-35.97 4.95-46.55 1.41-10.58 4.48-30.41 6.83-44.07 2.35-13.65 6.49-34.88 9.19-47.17 2.71-12.29 7.5-32.12 10.65-44.07 3.15-11.95 8.55-30.94 12-42.2 3.45-11.26 10.18-31.65 14.95-45.31 4.77-13.65 11.07-29.57 13.99-35.38 2.92-5.8 7.79-13.9 10.81-18 3.02-4.1 8.25-10.19 11.62-13.54 3.37-3.35 7.79-6.79 9.84-7.65 2.05-.85 5.4-1.28 7.45-.94 2.41.39 4.38-.08 5.59-1.34 1.02-1.07 3.54-2.46 5.59-3.09 2.05-.63 5.96-1.18 8.69-1.22z"
                        />
                        <path
                            id="Path 2"
                            fillRule="evenodd"
                            className="fill-rang-0 dark:fill-rang-900"
                            d="M719.09 119.19c1.84-.02 4.89 1.09 6.76 2.48 1.88 1.39 4.47 4.62 5.76 7.18 1.29 2.56 3.03 7.17 3.87 10.24.83 3.07 1.59 11.54 1.68 18.83.09 7.28.59 13.71 1.1 14.27.51.57 1.35.57 1.86-.01.51-.57 1.07-4.62 1.24-9 .17-4.38.87-7.96 1.55-7.96s1.6 1.54 2.04 3.41c.44 1.88.48 8.44.08 14.59-.4 6.14-2.71 25.42-5.14 42.82-2.43 17.41-5.06 33.61-5.83 36-.78 2.39-2.04 5.13-2.8 6.09-.76.96-1.48 4.87-1.58 8.69-.11 3.82-2.25 13.93-4.77 22.46-2.51 8.53-6.68 20.82-9.25 27.31-2.57 6.49-6.46 14.59-8.63 18-3.13 4.92-3.55 6.27-2.03 6.52 1.05.17 1.91 1.29 1.91 2.48s-.59 4.41-1.31 7.14c-.71 2.73-9.45 21.72-19.4 42.2-9.96 20.48-27.47 56.23-38.92 79.44-11.45 23.21-21.69 43.32-22.76 44.69-1.85 2.37-1.94 2.25-1.97-2.48-.02-2.73.8-16.42 1.82-30.41 1.02-14 2.7-34.1 3.74-44.69 1.04-10.58 3.28-30.13 4.99-43.45 1.71-13.31 4.54-32.86 6.29-43.45 1.75-10.58 5.08-28.74 7.4-40.34 2.32-11.61 6.49-30.04 9.26-40.96 2.77-10.92 7.6-28.24 10.74-38.48 3.13-10.24 8.21-25.32 11.27-33.52 3.06-8.19 8.89-22.44 12.94-31.65 4.05-9.22 11.28-23.88 16.05-32.58 7.76-14.16 9.03-15.83 12.03-15.87zm15.14 1.28c.68 0 2.69 3.21 4.45 7.14 1.77 3.93 3.58 8.69 4.03 10.58.45 1.89.4 3.43-.11 3.41-.51-.02-2.89-4.08-5.28-9.03-2.39-4.95-4.35-9.7-4.34-10.55 0-.85.57-1.55 1.25-1.55z"
                        />
                        <path
                            id="Path 3"
                            className="fill-rang-900 dark:fill-rang-0"
                            d="M498.96 121.74c1.39.01 5.04 1.7 8.11 3.76 3.07 2.05 6.7 3.74 8.07 3.74s4.72 1.09 7.45 2.41c2.73 1.32 6.64 2.41 8.69 2.43 2.15.02 4.64 1.08 5.9 2.52 1.19 1.37 3.43 2.48 4.97 2.46 1.54-.02 5.03 1.56 7.76 3.51 2.73 1.95 8.32 6.94 12.41 11.09 4.1 4.15 10.24 12.18 13.65 17.86s7.98 15.09 10.14 20.91 4.82 14.92 5.9 20.21c1.08 5.29 1.96 14.51 1.96 20.48 0 5.97-.87 16.17-1.92 22.65-1.05 6.49-2.74 13.47-3.75 15.52-1.01 2.05-2.71 6.8-3.79 10.55-1.08 3.75-4.75 13.81-8.15 22.34-3.41 8.53-9.55 22.5-13.65 31.03-4.1 8.53-12.85 25.52-19.44 37.74-6.93 12.86-14.33 24.82-17.56 28.38-4.97 5.48-6.27 6.23-11.79 6.8-6.19.64-6.23.63-15.52-7.58-5.12-4.52-9.73-8.23-10.24-8.23-.51-.01-2.02-1.83-3.35-4.04-1.33-2.22-4.42-11.3-6.88-20.17-2.46-8.88-5.57-18.65-6.93-21.72-1.35-3.07-2.44-6.14-2.41-6.83.03-.68-1.36-3.2-3.09-5.59-1.73-2.39-3.13-4.76-3.12-5.28.01-.51.58-.93 1.26-.93s4.31 3.21 8.06 7.14c3.75 3.93 6.82 7.84 6.83 8.69 0 .85 1.12 1.55 2.49 1.55 1.56 0 4.68-2.79 8.38-7.5 3.24-4.13 7.57-10.46 9.62-14.09 2.05-3.62 4.56-7.54 5.59-8.7 1.22-1.39 2.08-1.64 2.48-.72.34.77 2.37-1.3 4.5-4.59s6.28-10.17 9.22-15.29c2.94-5.12 9.19-17.97 13.89-28.55 4.7-10.58 10.51-24.83 12.9-31.65 2.39-6.83 5.42-16.88 6.74-22.34 1.32-5.46 2.4-12.03 2.4-14.59 0-2.56-.55-5.77-1.23-7.14-.68-1.37-3.34-3.41-5.9-4.55-3.59-1.6-9.76-2.2-27-2.63-13.35-.34-26.84.02-33.52.89-6.14.8-19.55 3.13-29.79 5.18-11.66 2.33-22.57 5.39-29.17 8.19-5.8 2.45-15.58 6.21-21.72 8.34-6.14 2.14-12.99 5.41-15.21 7.27-2.22 1.86-4.73 3.37-5.59 3.35-.85-.02-7.94 3.47-15.76 7.76-7.81 4.29-17.31 10.66-21.1 14.15-3.79 3.49-9.41 7.62-12.48 9.17-3.07 1.55-8.1 4.52-11.17 6.58-3.07 2.07-19 17.21-35.4 33.66-16.4 16.44-33.37 34.36-37.73 39.83-4.35 5.46-10.55 13.84-13.77 18.62-3.22 4.78-10.07 16.51-15.23 26.07-5.16 9.56-10.58 21.57-12.05 26.69-1.57 5.47-2.95 14.68-3.35 22.34-.49 9.35-.1 16.19 1.38 24.21 1.16 6.3 3.76 14.69 5.96 19.24 2.63 5.43 6.78 10.91 12.7 16.76 4.83 4.78 15.2 13.51 23.04 19.39 7.84 5.89 19.84 14.35 26.67 18.8 6.83 4.45 29.73 18 50.89 30.09 21.16 12.1 41.69 24.17 45.62 26.82 3.93 2.65 7.14 5.66 7.14 6.68 0 1.02.62 2.28 1.38 2.79.76.51 1.74.18 2.17-.74.61-1.3 1.42-1.37 3.59-.31 1.54.75 7.68 5.49 13.65 10.53 5.97 5.04 14.31 12.72 18.51 17.07 4.21 4.35 8.89 10.13 10.4 12.87 1.51 2.73 7.33 10.83 12.93 18s13.17 17.5 16.83 22.96c3.65 5.46 8.49 13.84 10.75 18.62 2.82 5.98 4.69 12.56 5.97 21.1 1.03 6.83 1.87 15.07 1.88 18.31 0 3.24-.86 9.95-1.92 14.9-1.06 4.95-3.61 13.19-5.67 18.31-2.06 5.12-5.47 12.38-7.57 16.14-2.1 3.75-6.91 11.02-10.69 16.14-3.78 5.12-12.07 15.59-18.44 23.27-6.36 7.68-11.98 13.94-12.5 13.92-.51-.03-4.84 3.2-9.62 7.16-4.78 3.97-15.67 11.87-24.21 17.57-8.53 5.7-20.54 12.76-26.69 15.7-7.1 3.39-14.34 5.82-19.86 6.67-4.78.73-14.55 1.9-21.72 2.59-7.17.69-17.36 1.26-22.65 1.25-7.89-.01-12.36-.91-24.83-5.03-8.36-2.76-17.58-6.39-20.48-8.07-2.9-1.68-5.69-3.95-6.21-5.06-.51-1.1-3.72-3.71-7.14-5.8-3.41-2.09-7.78-5.51-9.71-7.62-1.93-2.1-4.83-6.06-6.45-8.79-1.62-2.73-4.97-9.99-7.43-16.14-2.46-6.14-4.8-14.24-5.19-18-.54-5.18-.18-7.87 3.73-15.52l3.22 9.72c1.77 5.34 4.93 11.77 7.03 14.27 2.65 3.17 5.86 5.22 10.55 6.74 3.71 1.2 10.93 2.72 16.05 3.38 5.12.66 13.22 1.2 18 1.21 4.78 0 10.64-.49 13.03-1.1 2.39-.61 11.33-3.58 19.86-6.6 8.53-3.02 21.94-8.26 29.79-11.64 7.85-3.38 20.14-10.02 27.31-14.75 7.17-4.73 16.39-11.35 20.48-14.7 4.1-3.35 11.55-10.07 16.56-14.92 5.01-4.85 12.3-12.73 16.19-17.51 3.89-4.78 8.84-11.48 10.99-14.9 2.15-3.41 5.27-9.28 6.94-13.03 1.66-3.75 4.3-11.02 5.85-16.14 1.89-6.21 2.85-12.61 2.89-19.24.04-6.12-.63-11.53-1.75-14.09-1.1-2.52-4.2-5.7-7.89-8.07-3.34-2.15-6.55-5.17-7.14-6.7-.59-1.56-2.56-3.16-4.47-3.62-1.88-.46-5.93-2.59-9-4.74-3.07-2.15-6.28-5.41-7.14-7.24-.85-1.83-3.37-4.44-5.59-5.8-2.22-1.36-5.01-2.48-6.21-2.48-1.19 0-2.59-.76-3.1-1.69-.51-.92-2.19-2.32-3.72-3.1-1.54-.78-3.77-1.43-4.97-1.43-1.19 0-4.27-.56-6.83-1.24-2.56-.68-7.17-3.47-10.24-6.2-4.26-3.78-7.21-5.26-12.41-6.21-4.78-.87-7.2-1.99-8.07-3.72-.92-1.84-2.45-2.47-5.9-2.43-2.76.03-5.29-.73-6.21-1.86-1.07-1.32-1.17-2.49-.31-3.78.99-1.48-.08-2.62-5.28-5.58-3.58-2.04-8.47-4.01-10.86-4.37-2.39-.36-6.58-1.34-9.3-2.18-3.36-1.04-5.96-3-8.07-6.1-2.62-3.85-3.43-4.34-5.15-3.1-1.7 1.22-3.11.58-8.38-3.81-4.53-3.77-6.34-6.16-6.34-8.38 0-2.44-3.36-5.97-15.83-16.57-8.7-7.41-20.54-18.44-26.3-24.52-5.76-6.08-15.16-16.91-20.89-24.08-5.73-7.17-11.85-15.83-13.59-19.24-1.75-3.41-5.55-12.35-8.45-19.86-2.9-7.51-6.21-16.73-7.35-20.48-1.14-3.75-2.91-11.3-3.93-16.76-1.02-5.46-2.18-19.15-2.56-30.41-.59-17.3-.36-21.73 1.51-28.55 1.22-4.44 4.56-13.93 7.42-21.1 2.87-7.17 7.6-17.78 10.51-23.58 2.91-5.8 7.81-14.46 10.88-19.24 3.07-4.78 9.08-13.16 13.35-18.62 4.27-5.46 13.44-16.07 20.38-23.58 6.94-7.51 13.29-13.88 14.11-14.16.82-.28 5.41-4.44 10.19-9.25 4.78-4.81 13.72-12.91 19.86-18.02 6.14-5.1 14.24-11.22 18-13.6 3.75-2.38 10.42-7.17 14.82-10.65 4.4-3.48 13.89-9.54 21.1-13.46 7.21-3.92 19.81-10.56 28.01-14.75 8.19-4.19 21.88-10.35 30.41-13.69 8.53-3.35 21.38-7.74 28.55-9.76 7.17-2.02 18.62-4.81 25.45-6.2 6.83-1.39 18.84-3.08 26.69-3.77 9.52-.83 14.88-1.86 16.09-3.07 1-1 2.95-1.82 4.34-1.8z"
                        />
                        <path
                            id="Path 4"
                            fillRule="evenodd"
                            className="fill-rang-0 dark:fill-rang-900"
                            d="M443.68 146.06c.39.27.43.76.09 1.11-.34.34-8.72 2.81-18.62 5.49-9.9 2.67-24.7 7.73-32.89 11.24-8.19 3.51-20.48 8.91-27.31 11.99-6.83 3.08-17.44 8.57-23.58 12.19-6.14 3.62-13.41 8.34-16.14 10.49-2.73 2.15-8.04 6.29-11.79 9.21-3.75 2.92-11.44 8.48-17.07 12.38-5.63 3.89-11.08 7.07-12.1 7.07-1.02 0-6.15 4.89-11.4 10.86s-11.53 12.19-13.96 13.82c-2.43 1.63-7.64 6.09-11.58 9.93-3.93 3.84-7.14 7.81-7.13 8.84.01 1.02-1.1 2.56-2.47 3.41-1.37.85-7.05 7.28-12.63 14.27-5.58 7-13.24 17.47-17.03 23.27-3.78 5.8-9.85 16.97-13.48 24.83-3.63 7.85-6.94 14.55-7.35 14.9-.42.34-.35-1.06.15-3.1.5-2.05 3.66-9.87 7.02-17.38 3.37-7.51 9.04-18.27 12.62-23.9 3.57-5.64 10.85-15.69 16.18-22.34s17.89-20.96 27.93-31.79c10.03-10.83 19.92-20.86 21.97-22.28 2.05-1.43 7.54-6.25 12.2-10.72 7.21-6.91 9.07-8.08 12.41-7.81 2.26.18 5.65-.74 7.97-2.17 2.52-1.55 3.8-3.19 3.41-4.35-.39-1.18.74-2.54 3.1-3.72 2.05-1.02 3.72-2.42 3.72-3.1 0-.68 1.12-.96 2.48-.62 1.84.46 2.97-.34 4.34-3.1 1.38-2.77 3.38-4.19 7.76-5.52 3.24-.99 6.73-2.68 7.76-3.76 1.02-1.08 3.4-2.22 5.28-2.54 1.88-.32 3.61-1 3.86-1.52.24-.51 4.29-2.81 9-5.11 4.71-2.3 15.26-6.94 23.45-10.3 8.19-3.37 18.25-7.31 22.34-8.77 4.1-1.45 14.95-4.71 24.12-7.25 9.17-2.53 16.99-4.39 17.38-4.12zm62.46 10.61c6.21-.11 11.13.33 11.48 1.04.34.68-.64 1.49-2.17 1.79-1.54.3-4.89.86-7.45 1.24-3 .45-4.65 1.35-4.65 2.55 0 1.02-.7 2.24-1.55 2.7-.85.46-6.44 1.16-12.41 1.55-5.97.39-10.88.33-10.9-.15-.02-.47.67-1.23 1.55-1.68 1.06-.55 1.18-1.23.35-2.02-.79-.76-3.92-.64-8.69.34-5.57 1.15-8.5 2.58-11.6 5.67-3.21 3.19-5.19 4.13-13.22 4.08l3.1-2.37c1.71-1.3 2.68-2.83 2.16-3.39s-3.31.07-6.21 1.4c-2.9 1.33-5.55 2.57-5.89 2.76-.34.19.08 1.2.93 2.24 1.33 1.62.79 2.09-3.72 3.27-2.9.76-8.17 1.74-11.71 2.17-3.54.43-7.17 1.45-8.07 2.26-1.26 1.13-2.12 1.13-3.73 0-1.62-1.14-2.81-1.12-5.28.08-1.75.85-3.18 2.39-3.18 3.41s-.28 1.86-.62 1.86c-.34 0-1.74-.56-3.1-1.24-1.81-.9-3.33-.73-5.59.62-1.71 1.02-3.1 2.7-3.1 3.72 0 1.16-5.86 4.68-15.52 9.31-11.89 5.71-16.02 7.17-17.69 6.24-1.19-.66-2.59-.8-3.11-.31-.51.49.04 1.96 1.24 3.26 2.11 2.29 2.06 2.34-1.55 1.59-3.11-.64-3.98-.27-5.28 2.29-.85 1.68-3.37 4.18-5.59 5.54-2.22 1.36-4.73 2.48-5.59 2.48-.99 0-1.33-1.11-.93-3.1.34-1.71.38-3.1.09-3.1-.29 0-1.41.84-2.48 1.86s-1.95 3.26-1.95 4.97c0 2.06-1.57 4.44-4.65 7.06-2.56 2.17-7.17 5.53-10.24 7.47-3.07 1.93-6 3.5-6.52 3.5-.51-.01-.93-.86-.93-1.88s-.56-1.58-1.24-1.24c-.68.34-1.24 2.3-1.24 4.34 0 2.05-.62 4.14-1.38 4.65-.76.51-1.74.18-2.17-.74-.61-1.3-1.42-1.37-3.59-.31-1.54.75-2.79 2.48-2.79 3.85s-.7 2.9-1.55 3.41c-.85.51-3.79 1.49-6.52 2.17-4.74 1.19-4.98 1.48-5.28 6.52-.25 4.31-1.05 5.84-4.34 8.34-2.22 1.69-4.73 3.08-5.59 3.1-.85.02-1.27-.52-.93-1.21.34-.68.06-1.24-.62-1.24-.68 0-3.34 1.91-5.9 4.25-2.56 2.33-4.25 4.71-3.75 5.28.49.57 2.87-.51 5.28-2.38 2.41-1.88 4.39-2.99 4.4-2.48.01.51-4.25 5.4-9.49 10.86-9.14 9.54-9.47 9.76-8.51 5.59.82-3.52.67-4.21-.75-3.61-.97.4-2.07 2.36-2.44 4.34-.37 1.99-2.05 5.8-3.72 8.48-1.67 2.68-4.5 6.03-6.27 7.45-1.77 1.42-4.99 5.24-7.14 8.48-2.15 3.24-4.53 6.32-5.29 6.83-.76.51-1.89.09-2.51-.93-.96-1.59-1.39-1.51-2.99.62-1.02 1.37-1.86 3.88-1.87 5.59 0 1.71-1.11 5.48-2.46 8.38-1.35 2.9-3.01 5.55-3.7 5.9-.68.34-1.22.2-1.2-.31.02-.51.84-2.33 1.82-4.03.98-1.71 1.77-3.94 1.77-4.97 0-1.08-1.87.22-8.88 8.07l2.8-5.59c1.54-3.07 5.61-9.78 9.05-14.9 3.43-5.12 12.49-17.13 20.13-26.69 7.64-9.56 16.34-19.77 19.34-22.7 3-2.92 9.36-9.13 14.14-13.79 4.78-4.66 10.36-9.53 12.41-10.81 2.05-1.29 4.84-3.7 6.21-5.35 1.37-1.66 6.95-6.48 12.41-10.71s14.4-10.58 19.86-14.1c5.46-3.52 10.78-6.39 11.82-6.37 1.04.02 4.11-2.2 6.83-4.94 2.72-2.74 5.64-4.98 6.49-4.97.85.01 7.28-3.01 14.27-6.7 7-3.7 17.47-8.39 23.27-10.43 5.8-2.04 15.58-4.67 21.72-5.85 7.09-1.36 13.89-3.62 18.62-6.2 4.1-2.23 12.48-5.2 18.62-6.59 6.14-1.39 17.04-3.39 24.21-4.44 7.17-1.06 14.99-2.12 17.38-2.37 2.39-.24 9.23-.53 15.21-.64zm250.19 22.77c.21 3.41-.22 10.95-.96 16.76-.74 5.8-1.61 10.83-1.93 11.17-.32.34-.85.34-1.18 0-.32-.34-.05-6.49.61-13.65.66-7.17 1.62-14.71 2.14-16.76.85-3.35.98-3.11 1.32 2.48zM297.6 228.52c.51-.03.93.51.93 1.19 0 .68-2.37 2.91-5.28 4.95-2.9 2.04-5.55 3.43-5.9 3.1-.34-.33 1.61-2.54 4.34-4.9 2.73-2.36 5.38-4.32 5.9-4.34zm-14.38 12.83c.23.43-2.8 3.8-6.72 7.49-3.93 3.69-7.42 6.44-7.76 6.12-.34-.33 2.68-3.69 6.72-7.49 4.04-3.79 7.53-6.55 7.76-6.12zm464.32.15c.24.68-1.02 7.11-2.8 14.27-1.78 7.17-7.04 24.48-11.67 38.48-4.64 14-13.33 38.29-19.33 54-5.99 15.7-11.94 31.06-13.22 34.14-1.28 3.07-2.6 5.17-2.93 4.65-.33-.51 3.64-11.68 8.83-24.83 5.19-13.14 13.79-37.02 19.12-53.07 5.33-16.04 12.04-37.55 14.91-47.79 2.88-10.24 5.55-19.18 5.94-19.86.47-.83.86-.83 1.15 0zm-487.6 22.28c.4.32-4.33 6.05-10.5 12.73-6.17 6.68-13.1 14.39-15.39 17.12-2.29 2.73-6.04 7.06-8.33 9.62-2.29 2.56-4.46 4.52-4.83 4.34-.37-.17 2.81-4.78 7.08-10.24 4.26-5.46 13.04-15.38 19.5-22.04 6.46-6.66 12.08-11.85 12.47-11.53zM681.6 423.04c.27.85-.36 3.23-1.38 5.28-1.02 2.05-2.17 3.58-2.54 3.41-.37-.17.25-2.54 1.38-5.28 1.13-2.73 2.27-4.27 2.54-3.41zm-6.14 13.34c.29.68-4.31 11.3-10.22 23.58-5.91 12.29-11.01 21.51-11.34 20.48-.33-1.02 4.27-11.64 10.22-23.58 5.95-11.95 11.06-21.16 11.34-20.48zm32.17 53.08c.17.16-5.11 11.19-11.74 24.5-6.62 13.31-16.02 34.26-20.89 46.55-4.86 12.29-11.91 31.28-15.65 42.2-3.74 10.92-10.78 32.29-15.63 47.48-4.85 15.19-9.49 28.04-10.31 28.55-1.12.7-1.26-.44-.56-4.65.51-3.07 3.11-13.69 5.79-23.58 2.67-9.9 8.27-28.89 12.43-42.2 4.16-13.31 10.66-32.03 14.44-41.58 3.78-9.56 10.62-25.2 15.2-34.76 4.58-9.56 11.01-21.57 14.29-26.69 3.28-5.12 7.39-10.84 9.14-12.71 1.75-1.87 3.32-3.27 3.49-3.1zm-60.96 5.16c.07.37-.55 3.05-1.39 5.97-.84 2.92-2.41 6.14-3.49 7.17-1.08 1.02-2.23 1.44-2.55.93-.33-.51 1.18-4.04 3.36-7.83 2.17-3.8 4.01-6.6 4.08-6.23zm86.41 68.99c.56 5.8 1.64 18.09 2.42 27.31.77 9.22 2.18 21.23 3.13 26.69.95 5.46 2.13 11.89 2.64 14.27.56 2.68.46 4.05-.27 3.58-.65-.42-2.42-5.17-3.93-10.55-1.51-5.38-3.32-14.53-4.04-20.33-.71-5.8-1.22-19.77-1.13-31.03.15-18.94.24-19.69 1.18-9.93zM450.1 727.46c.61 0 1.09.98 1.08 2.17-.01 1.19-1.39 7.48-3.07 13.96-1.67 6.49-4.72 15.14-6.78 19.24-2.05 4.1-6.26 10.8-9.35 14.9s-5.62 8.15-5.61 9c0 .85-1.93 3.65-4.29 6.21-2.36 2.56-4.32 5.35-4.34 6.21-.03.85-4.94 6.37-10.91 12.25-5.97 5.89-15.05 13.83-20.17 17.66-5.12 3.83-14.34 9.92-20.48 13.54-6.14 3.62-15.64 8.31-21.1 10.42-5.46 2.11-14.96 4.87-21.1 6.13-6.14 1.26-18.15 2.84-26.69 3.51-9.2.73-19.31.79-24.83.16-5.12-.59-11.68-1.67-14.59-2.42-3.26-.84-5.28-2.06-5.28-3.21 0-1.36.92-1.69 3.41-1.22 1.88.35 6.49.97 10.24 1.37 4.5.48 12.33-.2 22.96-2.02 8.88-1.51 21.72-4.7 28.55-7.09 6.83-2.39 18-7.03 24.83-10.31 6.83-3.28 15.76-8.15 19.86-10.8 4.1-2.66 13.31-9.61 20.48-15.44 7.17-5.84 17.15-15.02 22.18-20.41 5.03-5.39 9.92-11.34 10.86-13.21 1.08-2.15 1.26-3.64.47-4.03-.68-.34-6.41 4.75-12.72 11.3-6.32 6.56-15.67 15.3-20.79 19.42-5.12 4.12-14.06 10.7-19.86 14.61-5.8 3.91-15.02 9.35-20.48 12.09-5.46 2.74-11.19 5.32-12.72 5.74-1.54.42-2.79.21-2.79-.48 0-.68 1.91-2.78 4.25-4.65 2.34-1.88 10.02-6.89 17.07-11.15 7.05-4.25 17.1-10.96 22.34-14.9 5.24-3.94 14.37-11.35 20.28-16.47 7.15-6.19 12.22-11.81 15.12-16.76 2.4-4.1 7.38-11.22 11.06-15.83 3.68-4.61 7.26-8.38 7.94-8.38.68 0 1.24 1.26 1.23 2.79-.01 1.54-1.41 5.87-3.12 9.62-1.71 3.75-2.79 7.11-2.4 7.45.39.34 1.09.04 1.57-.67.47-.71 3.42-5.18 6.55-9.93 4.37-6.63 6.37-8.64 8.61-8.64 2.55 0 3.29-1.18 5.83-9.31 1.6-5.12 3.51-10.01 4.25-10.86.74-.85 1.84-1.55 2.45-1.55zm-97.02 83.16c.31 0 .03.52-.62 1.16-.65.63-7.04 5.37-14.21 10.54-10.6 7.63-15.59 10.29-26.69 14.22-7.51 2.66-17.84 5.52-22.96 6.34-5.12.82-15.54 1.31-23.15 1.07-11.75-.36-14.24-.8-16.53-2.91-2.12-1.96-2.87-2.13-3.54-.81-.68 1.34-1.73 1.39-5.2.28-2.39-.77-6.3-3.04-8.69-5.06-3.61-3.04-3.93-3.66-1.86-3.67 1.37-.01 5.83.87 9.93 1.95 6.14 1.62 11.15 1.8 28.55 1.05 19.6-.84 20.97-.76 19.24 1.15-1.02 1.13-1.41 2.46-.86 2.96.55.5 6.13-.89 12.41-3.09 6.28-2.19 14.77-4.91 18.86-6.03 4.1-1.12 8.84-3.31 10.55-4.85 1.71-1.54 5.62-4.22 8.69-5.95 3.07-1.73 7.82-4.32 10.55-5.75 2.73-1.43 5.22-2.6 5.52-2.6z"
                        />
                    </g>
                </svg>
            </a>
        </Link>
    );
}

function ToggleDarkModeButton(
    strictDarkMode: boolean,
    mounted: boolean,
    resolvedTheme: string,
    setTheme: (theme: string) => void,
    hideButton: boolean,
) {
    return (
        !strictDarkMode &&
        !hideButton && (
            <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="w-9 h-9 bg-rang-200 rounded-lg dark:bg-rang-600 flex items-center justify-center  hover:ring-2 ring-rang-300 transition-all"
                onClick={() =>
                    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
            >
                {mounted && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        stroke="currentColor"
                        className="w-5 h-5 text-rang-800 dark:text-rang-200"
                    >
                        <path
                            d={
                                resolvedTheme === 'dark'
                                    ? /* sun */ 'M128 56a72 72 0 1 0 72 72a72.1 72.1 0 0 0-72-72zm0 120a48 48 0 1 1 48-48a48 48 0 0 1-48 48zM116 28v-8a12 12 0 0 1 24 0v8a12 12 0 0 1-24 0zm74.2 37.8a12 12 0 0 1 0-17l5.7-5.7a12 12 0 0 1 17 17l-5.7 5.7a12 12 0 0 1-8.5 3.5a12.2 12.2 0 0 1-8.5-3.5zM248 128a12 12 0 0 1-12 12h-8a12 12 0 0 1 0-24h8a12 12 0 0 1 12 12zm-35.1 67.9a12.2 12.2 0 0 1 0 17a12.4 12.4 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5l-5.7-5.7a12 12 0 0 1 17-17zM140 228v8a12 12 0 0 1-24 0v-8a12 12 0 0 1 24 0zm-74.2-37.8a12 12 0 0 1 0 17l-5.7 5.7a12 12 0 0 1-8.5 3.5a12.4 12.4 0 0 1-8.5-3.5a12.2 12.2 0 0 1 0-17l5.7-5.7a12 12 0 0 1 17 0zM40 128a12 12 0 0 1-12 12h-8a12 12 0 0 1 0-24h8a12 12 0 0 1 12 12zm3.1-67.9a12 12 0 0 1 17-17l5.7 5.7a12 12 0 0 1 0 17a12.2 12.2 0 0 1-8.5 3.5a12 12 0 0 1-8.5-3.5z'
                                    : /* moon */ 'M228.1 149.1a12 12 0 0 0-11.6-8.5a11.4 11.4 0 0 0-3.3.6a80 80 0 0 1-98.3-98.4a13.5 13.5 0 0 0 .4-2.8a12 12 0 0 0-7.5-11.8a12.6 12.6 0 0 0-7.9-.4A104 104 0 1 0 228.2 156a12.5 12.5 0 0 0-.1-6.9zM128 208A80 80 0 0 1 88.1 58.6a104.2 104.2 0 0 0 109.3 109.3A80.4 80.4 0 0 1 128 208z'
                            }
                            fill="currentColor"
                        ></path>
                    </svg>
                )}
            </button>
        )
    );
}
