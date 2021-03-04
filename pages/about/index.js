import Head from 'next/head';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import { Container } from 'semantic-ui-react';
import { getSiteInfoById } from '../../utils/contentfulPosts';

export default function About({info}) {

  return (
    <>
      <Head>
        <title>Matt Keegan | About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SiteHeader info={info} />
        <Container>
          <h1>About</h1>
          <p>This page is a work in progress.</p>
        </Container>      
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps({preview = false}) {

  const info = await getSiteInfoById(process.env.CONTENTFUL_SITE_INFO_ID, preview)

  return {
    props: {
      info,
    },
  }
}
