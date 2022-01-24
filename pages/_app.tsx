import 'styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useAnalytics } from 'lib/analytics';

function MyApp({ Component, pageProps }: AppProps) {
    useAnalytics();
    return (
        <ThemeProvider
            attribute="class"
            forcedTheme={pageProps.strictDarkMode ? 'dark' : null}
        >
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
