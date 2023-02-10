
import { Footer } from '@/component/Footer';
import { Header } from '@/component/Header';
import '@/styles/globals.css'



import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { useMemo } from 'react';

function createApolloClient() {
  
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: 'https://headless.fc9.sandbox.net.nz/graphql',
      //uri: process.env.WORDPRESS_END_POINT,
    }),
    cache: new InMemoryCache(),
  });
  
}


export default function App({ Component, pageProps }) {

  const apolloClient = useMemo(() => createApolloClient(), [])

  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  
  )
}


