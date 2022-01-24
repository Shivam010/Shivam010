import { PropsWithChildren, ReactNode } from 'react';
import { Container, Metadata } from './Container';

export default function Layout({
    heading,
    metadata,
    children,
}: PropsWithChildren<{
    metadata?: Metadata;
    heading?: ReactNode;
}>) {
    return (
        <Container metadata={metadata}>
            <div className="pt-6 pb-8 mx-auto mb-16 max-w-3xl flex flex-col justify-center items-center">
                {Heading(heading)}
                {children}
            </div>
        </Container>
    );
}

function Heading(children: ReactNode) {
    return (
        children && (
            <h1 className="font-logo text-5xl leading-relaxed mx-auto mb-12">
                {children}
            </h1>
        )
    );
}
