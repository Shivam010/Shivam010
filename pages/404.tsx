import {
    BigButton,
    ExternalLink,
    ImageWithDescription,
} from 'components/Others';
import { Container } from 'components/Container';
import drongoBird from 'public/images/A_flying_greater_racket-tailed_drongo.jpeg';

export default function NotFound() {
    return (
        <Container metadata={{ title: "418 - i'm a teapot" }}>
            <div className="mt-16 pt-6 pb-8 mx-auto mb-16 max-w-3xl flex flex-col justify-center items-center">
                <h1 className="font-logo text-5xl leading-relaxed mx-auto mb-12">
                    <span className="text-pink-700">418</span> - i'm a teapot
                </h1>
                <blockquote className="mb-14">
                    <div className="mb-5">
                        Why stick with a generic 404 Not Found page, when you
                        could just{' '}
                        <ExternalLink href="https://www.natureinfocus.in/environment/unraveling-the-mysteries-of-nature-s-symphony">
                            <span className="md:underline underline-offset-4">
                                Unraveling The Mysteries Of Nature's Symphony
                            </span>
                        </ExternalLink>{' '}
                        ? – hence{' '}
                        <span className="font-logo align-middle tracking-wider text-sm">
                            418 - i'm a teapot
                        </span>
                    </div>
                    <div className="mb-5">
                        It seems you've found something that used to exist, or
                        you spelled something wrong. I'm guessing you{' '}
                        <span className="md:underline underline-offset-4">
                            spelled something wrong
                        </span>
                        . Can you double check that URL?
                    </div>
                    <div>
                        So, any attempt to brew coffee or milk with a teapot
                        should result in the error code "418 I'm a teapot". The
                        resulting entity body may be short and stout.{' '}
                        <ExternalLink href="https://httpstatuses.com/418">
                            <span className="md:underline underline-offset-4">
                                More info.
                            </span>
                        </ExternalLink>
                    </div>
                </blockquote>
                <BigButton href="/" className="w-64 mx-auto mb-16">
                    Home Page
                </BigButton>
                <div className="-mb-8">
                    <ImageWithDescription
                        src={drongoBird}
                        placeholder="blur"
                        alt="A Flying Great Racket-tailed Drongo by Md Shahanshah Bappy"
                        width={800}
                        height={450}
                        description="The Great Racket-tailed Drongo is a beautiful songster and an excellent mimic. Photograph courtesy Md Shahanshah Bappy under the CC BY-SA 4.0 license."
                    />
                </div>
            </div>
        </Container>
    );
}
