import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import { wrapper } from '../src/store/store';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: 'dark',
                primaryColor: 'violet'
            }}
        >
            <Component {...pageProps} />
        </MantineProvider>
    );
};

export default wrapper.withRedux(App);
