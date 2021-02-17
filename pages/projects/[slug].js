import { useRouter } from 'next/router'
import Head from 'next/head'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import { getAllPostsWithSlug, getPostAndMorePosts, getSiteInfoById } from '../../utils/contentfulPosts'
import PostBody from '../../components/PostBody';

export default function Project({ post, morePosts, info, preview }) {
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
            <PostBody title={post.title} image={post.image} body={post.body} />
            {console.log(morePosts)}
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
        morePosts: data?.morePosts ?? null,
      },
    }
  }
  
  export async function getStaticPaths({preview = false}) {
    const allPosts = await getAllPostsWithSlug({preview, type: 'portfolioItem'})
    console.log(allPosts)
    return {
      paths: allPosts?.map(({ slug }) => `/projects/${slug}`) ?? [],
      fallback: false,
    }
  }