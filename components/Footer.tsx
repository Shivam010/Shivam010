import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { ExternalLink } from './Others';

const FooterLinks = ({
    href,
    title,
    children,
    className,
    isInternal,
}: {
    href: string;
    title?: string;
    children: ReactNode;
    className?: string;
    isInternal?: boolean;
}) => {
    className = className ? className : '';
    return (
        <div>
            {isInternal ? (
                <Link href={href}>
                    <a
                        title={title}
                        className={
                            'text-rang-500 hover:text-rang-600 transition ' +
                            className
                        }
                    >
                        {children}
                    </a>
                </Link>
            ) : (
                <ExternalLink href={href}>
                    <span
                        title={title}
                        className={
                            'text-rang-500 hover:text-rang-600 transition ' +
                            className
                        }
                    >
                        {children}
                    </span>
                </ExternalLink>
            )}
        </div>
    );
};

export default function Footer() {
    return (
        <footer className="flex flex-col justify-center items-center max-w-3xl mx-auto w-full mb-4">
            <hr className="w-full border-1 border-rang-700 mb-8" />
            <div className="w-full px-5 flex flex-row">
                <div className="grow max-w-3xl grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2">
                    <div className="flex flex-col space-y-4">
                        <FooterLinks isInternal href="/">
                            Home
                        </FooterLinks>
                        <FooterLinks
                            href="mailto:me@shivam010.in"
                            className="group"
                        >
                            Say Hello{' '}
                            <span className="opacity-30 group-hover:opacity-20">
                                👋🏻
                            </span>
                        </FooterLinks>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <FooterLinks href="https://twitter.com/010shivam">
                            Twitter
                        </FooterLinks>
                        <FooterLinks href="https://github.com/Shivam010">
                            GitHub
                        </FooterLinks>
                    </div>
                </div>
                <div className="text-right flex flex-col space-y-4">
                    <FooterLinks href="https://github.com/Shivam010/Shivam010">
                        <span className="flex flex-col font-logo text-sm xs:text-base sm:text-xl text-rang-300 hover:text-rang-600">
                            <span className="text-xs xs:text-sm pb-3 pr-1">
                                made with love by
                            </span>{' '}
                            <span>Shivam Rathore</span>
                        </span>
                    </FooterLinks>
                </div>
            </div>
            <small className="text-xs mx-auto align-middle text-rang-500 in-between-wide">
                <Link href={'/license'}>
                    Copyright © 2022 &amp; License under MIT
                </Link>
            </small>
        </footer>
    );
}
