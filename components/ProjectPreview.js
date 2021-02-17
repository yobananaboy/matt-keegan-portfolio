import Link from 'next/link'
import { Container, Header } from 'semantic-ui-react'
import ScaledImage from './ScaledImage'

function Post({ image, title, description, slug, featured }) {

  return (
    <Container className="post">
      <ScaledImage image={image} className="preview-image" />
        <Container className="link-container">
          <Header as="h2">
            <Link href={`/projects/${encodeURIComponent(slug)}`}>
              <a>{title}</a>
            </Link>
          </Header>
        </Container>
      <div className="description">{description}</div>
    </Container>
  )
}

export default Post