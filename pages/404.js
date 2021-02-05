import Head from 'next/head'
import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import { Container, Header } from 'semantic-ui-react'
import { getSiteInfoById } from '../utils/contentfulPosts'


export default function Custom404({ info }) {
    return(
    <>
        <Head>
            <title>Whoops! | Matt Keegan</title>
        </Head>
        <SiteHeader info={info} />
        <Container text>
            <Header as="h3">Whoops! Something went wrong...</Header>
            <Link href="/"><p>Go back home</p></Link>
        </Container>
    </>
    )
}

export async function getStaticProps({ preview }) {

    const infoData = await getSiteInfoById(process.env.CONTENTFUL_SITE_INFO_ID, preview)
    
    return {
      props: {
        info: infoData,
      },
    }
  }