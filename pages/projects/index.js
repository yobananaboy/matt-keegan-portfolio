import Head from 'next/head'
import { Header, Container } from 'semantic-ui-react'
import SiteHeader from '@components/SiteHeader'
import { fetchEntries, getSiteInfoById } from '../../utils/contentfulPosts'

export default function Projects({ info, projects }) {   

    return(
        <>
            <Head>
                <title>Projects | Matt Keegan</title>
            </Head>
            <SiteHeader info={info} />
            <Container>
                <Header as="h2">Projects</Header>
                <p>Here are a selection of projects I've made:</p>
                {projects.map(p => {
                    console.log(p.title)
                })}
            </Container>
        </>
    )
}

export async function getStaticProps({ preview = false }) {

    const infoData = await getSiteInfoById(process.env.CONTENTFUL_SITE_INFO_ID, preview)
    const res = await fetchEntries("portfolioItem", preview)
    const projects = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        info: infoData,
        projects,
      },
    }
  }