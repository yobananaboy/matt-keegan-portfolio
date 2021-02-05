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
    title: fields.title,
    slug: fields.slug,
    date: fields.date,
    body: fields.body,
    image: fields.image.fields,
    description: fields.description,
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
    content_type
  })
  if (entries.items) return entries.items
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function getAllPostsWithSlug(preview = false) {
  const client = getClient(preview)

  const entries = await client.getEntries({
    content_type: 'post',
    select: 'fields.slug',
  })
  console.log(entries);
  return parsePostEntries(entries, (post) => post.fields)
}

export async function getPostAndMorePosts(slug, preview = false) {
  const client = getClient(preview)
  
  const entry = await client.getEntries({
    content_type: 'post',
    limit: 1,
    'fields.slug[in]': slug,
  })
  const entries = await client.getEntries({
    content_type: 'post',
    limit: 2,
    order: '-fields.date',
    'fields.slug[nin]': slug,
  })

  return {
    post: parsePostEntries(entry)[0],
    morePosts: parsePostEntries(entries),
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
