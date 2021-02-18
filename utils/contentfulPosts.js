function getClient (preview = false) {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  const accessToken = preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  const host = preview ? "preview.contentful.com" : "cdn.contentful.com"

  const client = require('contentful').createClient({
    space: space,
    accessToken: accessToken,
    host
  })

  return client
}

function parsePost({ fields }) {
  return {
    title: fields.title ? fields.title : null,
    slug: fields.slug ? fields.slug : null,
    date: fields.date ? fields.date : null,
    body: fields.body ? fields.body : null,
    image: fields.image.fields ? fields.image.fields : null,
    description: fields.description ? fields.description : null,
  }
}

function parseIntro({ fields }) {
  return {
    title: fields.title,
    intro: fields.intro,
  }
}

function parsePostEntries(entries, cb = parsePost) {
  return entries?.items?.map(cb)
}

export async function fetchEntries(content_type, preview = false) {
  const client = getClient(preview)

  const entries = await client.getEntries({
    content_type,
    order: '-fields.date'
  })
  if (entries.items) return entries.items
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function getAllPostsWithSlug({preview = false, type = "post"}) {
  const client = getClient(preview)

  const entries = await client.getEntries({
    content_type: type,
    select: 'fields.slug',
    order: 'fields.date'
  })
  return parsePostEntries(entries, (post) => post.fields)
}

export async function getPostAndMorePosts({slug, preview = false, type = "post"}) {
  const client = getClient(preview)

  // get the entry based on its slug
  const entry = await client.getEntries({
      content_type: type,
      limit: 1,
      'fields.slug[in]': slug,
    })

  // then we try and get the previous and next posts
  let prevPost
  let nextPost

  try {
    prevPost = await client.getEntries({
      content_type: type,
      order: '-fields.date',
      'fields.date[lt]': entry.items[0].fields.date,
      limit: 1,
    })
  } catch(e) {
    // if its the first post there wont be any previous posts
    prevPost = null
  }
  
  try {
    nextPost = await client.getEntries({
      content_type: type,
      order: 'fields.date',
      'fields.date[gt]': entry.items[0].fields.date,
      limit: 1,
    })
  } catch(e) {
    // if its last there wont be any next posts
    nextPost = null
  }
  
  return {
    post: parsePostEntries(entry)[0],
    prevPost: prevPost.total >= 1 ? parsePostEntries(prevPost)[0] : null,
    nextPost: nextPost.total >= 1 ? parsePostEntries(nextPost)[0] : null,
  }
}

export async function getSiteInfoById(id, preview = false) {
  const client = getClient(preview)
  
  const entry = await client.getEntry(id)
  return parseIntro(entry);
}

export async function getSinglePostWithSlug(slug, preview = false, content_type = "post") {
  const client = getClient(preview)

  const entry = await client.getEntries({
    content_type,
    'fields.slug[in]': slug
  })
  
  return entry.items[0].fields
}

export default { fetchEntries, getAllPostsWithSlug, getPostAndMorePosts, getSiteInfoById, getSinglePostWithSlug }
