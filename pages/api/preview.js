import { getSinglePostWithSlug } from '../../utils/contentfulPosts'

export default async function handler (req, res) {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || !req.query.slug) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    
    let query = {}
    if(req.query.slug === "/") {
        query.slug = "/"
        query.contentType = "siteInfo"
    } else {
        let string = req.query.slug
        let re = /\/(.*)\/(.*)/ // regex for matching /<post>/<slug> url format
        let match = string.match(re)
        query.contentType = match[1]
        query.slug = match[2]
    }

    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    let post = "homepage"
    if(req.query.slug !== "/") {
        let post = await getSinglePostWithSlug(query.slug, true, query.contentType)    
    }
    
  
    // If the slug doesn't exist prevent preview mode from being enabled
    if (!post) {
      return res.status(401).json({ message: 'Invalid slug' })
    }
  
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})
  
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    if(query.contentType === "siteInfo") {
        res.redirect("/")
    } else {
        res.redirect(`/${query.contentType}/${post.slug}`)
    }
}