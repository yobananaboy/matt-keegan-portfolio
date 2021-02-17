import Link from 'next/link'
import { Container, Header } from 'semantic-ui-react'
import ScaledImage from './ScaledImage'

function Post({ date, image, title, description, slug }) {

  return (
    <Container className="post">
      <ScaledImage image={image} className="preview-image" />
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
