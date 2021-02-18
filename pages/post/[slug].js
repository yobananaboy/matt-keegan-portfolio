import { useRouter } from 'next/router'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import { getAllPostsWithSlug, getPostAndMorePosts, getSiteInfoById } from '../../utils/contentfulPosts'
import PostBody from '../../components/PostBody';

export default function Post({ post, nextPost, prevPost, info, preview }) {
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
            <Container>
              <SiteHeader info={info} />
              <PostBody title={post.title} image={post.image} body={post.body} />
              {console.log("NEXT POST")}
              {console.log(nextPost)}
              {nextPost && <p>{nextPost.title}</p>}
              {console.log("PREV POST")}
              {console.log(prevPost)}
              {prevPost && <p>{prevPost.title}</p>}
            </Container>
            <Footer />
          </>
        )}
      </>
    );
};

  export async function getStaticProps({ params, preview = false }) {

    const data = await getPostAndMorePosts({slug: params.slug, preview})
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
    const allPosts = await getAllPostsWithSlug({preview, type: "post"})
    return {
      paths: allPosts?.map(({ slug }) => `/post/${slug}`) ?? [],
      fallback: false,
    }
  }