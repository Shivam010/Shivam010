import { BigButton, ExternalLink } from 'components/Others';
import { Container } from 'components/Container';

export default function Index() {
    return (
        <Container>
            <div className="mt-16 mx-auto mb-16 max-w-3xl flex flex-col justify-center items-center">
                <h1 className="font-logo text-4xl 2xs:text-[2.8rem] sm:text-6xl xl:text-8xl">
                    <ExternalLink href="https://shivamrathore.com">
                        Hello, I'm{' '}
                        <span className="text-pink-700 leading-relaxed">
                            Shivam
                        </span>
                    </ExternalLink>
                </h1>
                <h2 className="mb-10 sm:mb-12 pr-12 sm:pr-16 italic text-rang-300 text-xs xs:text-base sm:text-2xl">
                    A weird - but - enthusiastic programmer{' '}
                    <span className="char anim px-1 absolute font-bold" />
                </h2>
                <div className="sm:px-6">
                    <p className="mb-5">
                        <span className="text-5xl -ml-2 pr-2 float-left animate-hi">
                            👋
                        </span>{' '}
                        By the day, I work as a Sr. Software Engineer in a
                        startup and, as the night gathers, my watch begins
                        either as a{' '}
                        {externalLinkWrapper(
                            'https://twitter.com/intent/follow?user_id=701765134574817280',
                            '#build-in-public',
                        )}{' '}
                        developer on Twitter or as a serial binge-watcher. And
                        Just to make it clear, I am a die-hard Harry Potter and
                        Marvel fan.
                    </p>
                    <p className="mb-5">
                        I also contribute to open source projects. Contributing
                        to open source has taught me many things and is still
                        teaching me. Today, I maintain{' '}
                        {externalLinkWrapper(
                            'https://github.com/Shivam010',
                            'few projects',
                        )}{' '}
                        and contribute to a number of them.
                    </p>
                    <p className="mb-5">
                        Sometimes, I take freelancing and ghost work, as well.
                        Helping individuals and organisations create and/or
                        solve their problems and challenges.
                    </p>
                    <p>
                        Got something to discuss, any project idea, any other
                        help you need? or maybe wanna just say Hello! 👋 Feel
                        free to{' '}
                        {externalLinkWrapper(
                            'mailto:hello@shivam010.in',
                            'Reach out to me!',
                        )}{' '}
                        Also, do Checkout my new website:
                    </p>
                </div>
                <BigButton
                    isExternal
                    href="https://shivamrathore.com"
                    className="w-64 mx-auto mt-14"
                >
                    New web Presense
                </BigButton>
            </div>
        </Container>
    );
}

function externalLinkWrapper(href: string, child: string) {
    return (
        <ExternalLink href={href}>
            <span className="relative -bottom-[1px] font-bold text-pink-700 italic hover:underline underline-offset-4">
                {child}
            </span>
        </ExternalLink>
    );
}
