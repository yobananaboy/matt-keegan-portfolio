import Head from 'next/head';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import { Container, Header } from 'semantic-ui-react';

export default function Custom404() {
    return(
    <>
        <Head>
            <title>Whoops! | Matt Keegan</title>
        </Head>
        <SiteHeader />
        <Container text>
            <Header as="h3">Whoops! Something went wrong...</Header>
            <Link href="/"><p>Go back home</p></Link>
        </Container>
    </>
    )
}