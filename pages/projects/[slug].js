import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import { getAllPostsWithSlug, getPostAndMorePosts, getSiteInfoById } from '../../utils/contentfulPosts'
import PostBody from '../../components/PostBody';

export default function Project({ post, prevPost, nextPost, info, preview }) {
    const router = useRouter()

    if (!router.isFallback && !post) {
        return <Custom404 />
    }

    return (
      <>
        {router.isFallback ? (
          <Head>Loading…</Head>
        ) : (
          <>
            <Head>
              <title>{post.title} | Matt Keegan</title>
            </Head>
            <SiteHeader info={info} />
            <Container>
              <PostBody title={post.title} image={post.image} body={post.body} />
              {nextPost && <p>{nextPost.title}</p>}
              {prevPost && <p>{prevPost.title}</p>}
              <Link href='/projects'>
                <p>
                  <a>View all projects</a>
                </p>
              </Link>
              <Link href="/">
                <p>
                  <a>Back to home</a>
                </p>
              </Link>
            </Container>
            <Footer />
          </>
        )}
      </>
    );
};

  export async function getStaticProps({ params, preview = false }) {

    const data = await getPostAndMorePosts({slug: params.slug, preview, type: 'portfolioItem'})
    const infoData = await getSiteInfoById(process.env.CONTENTFUL_SITE_INFO_ID, preview)

    return {
      props: {
        preview,
        info: infoData,
        post: data?.post ?? null,
        nextPost: data?.nextPost ?? null,
        prevPost: data?.prevPost ?? null,
      },
    }
  }
  
  export async function getStaticPaths({preview = false}) {
    const allPosts = await getAllPostsWithSlug({preview, type: 'portfolioItem'})
    return {
      paths: allPosts?.map(({ slug }) => `/projects/${slug}`) ?? [],
      fallback: false,
    }
  }