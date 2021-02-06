import { getSinglePostWithSlug } from '../../utils/contentfulPosts'

export default async function handler (req, res) {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !req.query.slug) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    
    // Fetch the headless CMS to check if the provided `slug` exists
    // getSinglePostWithSlug would implement the required fetching logic to the headless CMS
    let post = await getSinglePostWithSlug(req.query.slug, true, req.query.content)    
    
  
    // If the slug doesn't exist prevent preview mode from being enabled, unless it's the homepage
    if (!post) {
      return res.status(401).json({ message: 'Invalid slug' })
    }
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})
  
    let contentTypeSlug = req.query.content === "siteInfo" ? "" : `/${req.query.content}`
    let postSlug = req.query.content === "siteInfo" ? "/" : `/${req.query.slug}`

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(`${contentTypeSlug}${postSlug}`)
}