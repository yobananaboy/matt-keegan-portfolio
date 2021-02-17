import Head from 'next/head'
import { Header, Container, Grid } from 'semantic-ui-react'
import SiteHeader from '@components/SiteHeader'
import ProjectPreview from '@components/ProjectPreview'
import { fetchEntries, getSiteInfoById } from '../../utils/contentfulPosts'
import { useWindowSize } from '../../utils/useWindowSize'

export default function Projects({ info, projects }) {   

    const size = useWindowSize()

    return(
        <>
            <Head>
                <title>Projects | Matt Keegan</title>
            </Head>
            <SiteHeader info={info} />
            <Container>
              <Header as="h2">Projects</Header>
              <p>Here are a selection of projects I've made:</p>
              <Grid>
                <Grid.Row columns={size.width > 800 ? 3 : 1}>
                  {projects.map((p, i) => {
                    return ( 
                      <Grid.Column key={`project-index-column-${i}`}>
                        <ProjectPreview
                          key={p.title}
                          image={p.image.fields}
                          title={p.title}
                          slug={p.slug}
                          description={p.description}
                          feaured={p.featured}
                        />
                      </Grid.Column>
                    )
                  })}
                </Grid.Row>
              </Grid>
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