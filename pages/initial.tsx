import {
    BigButton,
    ExternalLink,
    ImageWithDescription,
} from 'components/Others';
import me from 'public/me.png';
import { Container } from 'components/Container';
import Link from 'next/link';

export default function Home() {
    const externalLink = (text: string, href: string) => {
        return (
            <ExternalLink href={href}>
                <span className="font-bold text-pink-700 hover:underline underline-offset-4">
                    {text}
                </span>
            </ExternalLink>
        );
    };

    return (
        <Container>
            <div className="mx-auto mb-16 max-w-3xl flex flex-col justify-center items-center">
                <h1 className="font-logo text-[2.5rem] 2xs:text-5xl xs:text-6xl sm:text-7xl my-2 mx-auto">
                    {/* <h1 className="font-logo text-[2.75rem] xs:text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-8xl mb-2 mx-auto"> */}
                    <Link href="/">
                        <a>
                            <span className="text-pink-700 leading-relaxed">
                                Shivam
                            </span>{' '}
                            Rathore
                        </a>
                    </Link>
                </h1>
                <h2 className="text-center mb-14 italic">
                    "Software Developer • Cube Solver • Free Time Doodler •
                    Paper Plane Pilot"
                </h2>
                <div className="mb-10">
                    <p className="mb-6">
                        <span className="text-5xl -ml-2 -mt-6 pr-2 float-left animate-hi">
                            👋
                        </span>{' '}
                        Hi, I am Shivam Rathore, a Software Developer at{' '}
                        {externalLink(
                            'Appointy IT Pvt Ltd',
                            'https://appointy.com',
                        )}
                        , but as the night gathers, my watch begins either as an{' '}
                        <ExternalLink href="https://github.com/Shivam010">
                            <span className="font-bold text-pink-700 hover:underline underline-offset-4">
                                Open-Source Developer
                            </span>
                        </ExternalLink>{' '}
                        or as a <i>serial binge - watcher</i>.
                    </p>
                    <blockquote className="mb-6" title="Shivam010">
                        <div title="Belief" className="cursor-default">
                            I believe in{' '}
                            <span className="text-pink-700 font-bold">
                                Loyalty.
                            </span>{' '}
                            For me, Loyalty is a two-way street. If I'm asking
                            for it from you then you're getting it from me.
                            <br />I also, believe in{' '}
                            <span className="text-pink-700 font-bold">
                                Equality
                            </span>{' '}
                            because Even the smallest creatures like Ants can
                            kill, so we can not underestimate anyone. We all are
                            equal.
                        </div>
                    </blockquote>
                    <p className="mb-5">
                        I love to experiment with different: ideas,
                        technologies, and paper planes. Also, I doodle nuisance,
                        sometimes, mostly when I am borred and/or in some long
                        meetings :P
                    </p>
                    <p className="mb-5">
                        You can find me Flying different-different kinds of
                        Paper Planes a lot. At any point of time, I'll have at
                        least one paper plane ready to fly at my desk.
                    </p>
                    <p className="mb-5">
                        Also, I can solve{' '}
                        <ExternalLink href="https://en.wikipedia.org/wiki/Rubik's_Cube">
                            <span className="font-bold text-pink-700 hover:underline underline-offset-4">
                                2x2, 3x3, 4x4 and even 5x5 Rubik's Cube
                            </span>
                        </ExternalLink>
                        , with 3x3 cube, on an average in roughly around{' '}
                        <i>~2 minutes.</i>
                    </p>
                    <h2
                        id="why"
                        className="w-full font-logo text-3xl sm:text-4xl mt-14 mb-7"
                    >
                        why Open Source ?
                    </h2>
                    <p className="mb-5">
                        Contributing to open source has taught me many things
                        and is still teaching me. And that is the main reason, I
                        am inclined to it. Today, I maintain three projects and
                        contribute to a number of them.
                    </p>
                    <p className="mb-5">
                        It has also, introduced me the world of freelancing, one
                        of my first independent contract was due to the same. I
                        also, work as a freelancer and ghost worker, helping
                        individuals and organisations create and/or solve their
                        problems {'&'} challenges.
                        <br />
                        <span className="text-xs text-rang-300 italic">
                            * professionally speaking, both type of jobs exist
                        </span>
                    </p>
                    <div className="mx-auto mt-8 items-center w-11/12 sm:w-3/4">
                        <ImageWithDescription
                            src={me}
                            placeholder="blur"
                            description="Shivam Rathore at Vagator Beach, Goa, India"
                        />
                    </div>
                </div>
                <BigButton
                    isExternal
                    href="https://9works.tk"
                    className="w-64 mx-auto"
                >
                    Explore 9works
                </BigButton>
            </div>
        </Container>
    );
}

export function getStaticProps() {
    return {
        props: {
            strictDarkMode: true,
        },
    };
}
