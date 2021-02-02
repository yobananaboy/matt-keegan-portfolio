import Link from 'next/link'
import { Container, Image, Header } from 'semantic-ui-react'

function Post({ date, image, title, description, slug }) {
  let { file, alt } = image

  return (
    <Container className="post">
      <Image alt={alt} src={`https:${file.url}`} className="preview-image" />
        <Container className="link-container">
          <Header as="h2">
            <Link href={`/post/${encodeURIComponent(slug)}`}>
              <a>{title}</a>
            </Link>
          </Header>
          <Header as="h3">
            <Link href={`/post/${slug}`}>
              <a>{date.substring(0, 10)}</a>
            </Link>
          </Header>  
        </Container>
      <div className="description">{description}</div>
    </Container>
  )
}

export default Post
