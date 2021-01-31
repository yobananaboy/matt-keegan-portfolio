import Head from 'next/head'
import { fetchEntries } from '@utils/contentfulPosts'
import { Container, Grid } from 'semantic-ui-react'
import SiteHeader from '@components/SiteHeader'
import Footer from '@components/Footer'
import PostPreview from '@components/PostPreview'
import { useWindowSize } from '../utils/getWindowSize' 

export default function Home({ posts }) {

  const size = useWindowSize();

  return (
    <>
      <Head>
        <title>Matt Keegan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SiteHeader />
        <Container>
          <Grid>
            <Grid.Row columns={size.width > 800 ? 3 : 1}>
              {posts.map((p) => {
                return (
                  <Grid.Column>
                    <PostPreview key={p.date} date={p.date} image={p.image.fields} title={p.title} slug={p.slug} />
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

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
    },
  }
}
