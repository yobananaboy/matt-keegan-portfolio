import Head from 'next/head'
import { fetchEntries } from '@utils/contentfulPosts'
import { Container, Grid } from 'semantic-ui-react'
import SiteHeader from '@components/SiteHeader'
import Footer from '@components/Footer'
import PostPreview from '@components/PostPreview'
import { getSiteInfoById } from '../utils/contentfulPosts'
import { useWindowSize } from '../utils/useWindowSize' 

export default function Home({ posts, info }) {

  const size = useWindowSize();

  return (
    <>
      <Head>
        <title>Matt Keegan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SiteHeader info={info} />
        <Container>
          <Grid>
            <Grid.Row columns={size.width > 800 ? 3 : 1}>
              {posts.map((p, i) => {
                return (
                  <Grid.Column key={`homepage-column-${i}`}>
                    <PostPreview
                      key={p.date}
                      date={p.date}
                      image={p.image.fields}
                      title={p.title}
                      slug={p.slug}
                      description={p.description}
                    />
                  </Grid.Column>
                )
              })}
            </Grid.Row>
          </Grid> 
        </Container>      
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps({preview = false}) {

  const res = await fetchEntries("post", preview)
  const posts = await res.map((p) => {
    return p.fields
  })
  const infoData = await getSiteInfoById(process.env.CONTENTFUL_SITE_INFO_ID, preview)

  return {
    props: {
      posts,
      info: infoData,
    },
  }
}
