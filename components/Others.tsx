import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export function ExternalLink({
    href,
    children,
    className,
}: PropsWithChildren<{ href: string; className?: string }>) {
    return (
        <a
            href={href}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
}

export function BigButton({
    href,
    title,
    children,
    className,
    isExternal,
}: PropsWithChildren<{
    href: string;
    title?: string;
    className?: string;
    isExternal?: boolean;
}>) {
    className = className ? className : 'w-64 mx-auto';
    return (
        <Link href={href}>
            <a
                title={title}
                className={
                    ' font-logo text-2xl text-center ' +
                    className +
                    ' p-6 rounded-md ' +
                    ' bg-rang-0 dark:bg-rang-800 ' +
                    ' hover:text-rang-700 hover:dark:text-rang-200 ' +
                    ' shadow-lg hover:shadow-md dark:shadow-sm hover:dark:shadow-inner ' +
                    ' shadow-rang-200 dark:shadow-rang-700' +
                    ' hover:bg-gradient-to-tl hover:from-rang-100 hover:via-rang-0 hover:to-rang-0 ' +
                    ' hover:dark:from-rang-800 hover:dark:via-rang-900 hover:dark:to-rang-800 '
                }
                rel={isExternal ? 'noopener noreferrer' : null}
                target={isExternal ? '_blank' : null}
            >
                {children}
            </a>
        </Link>
    );
}

export function ImageWithDescription({
    description,
    ...imageProps
}: { description: string } & Omit<ImageProps, 'className'>) {
    const fillProps = (desc: string) => {
        if (!description) description = desc;
        if (!imageProps.alt) imageProps.alt = desc;
        if (!imageProps.title) imageProps.title = desc;
    };
    fillProps(description);
    fillProps(imageProps.alt);
    fillProps(imageProps.title);
    return (
        <>
            <Image alt="" {...imageProps} />
            <div className="px-8 mx-auto pb-1 text-center italic text-rang-400 text-[0.7rem] leading-[1rem]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="inline mb-0.5"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"></path>
                </svg>{' '}
                {description}
            </div>
        </>
    );
}
