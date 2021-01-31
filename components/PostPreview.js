import Link from 'next/link'
import { Container, Image, Header } from 'semantic-ui-react'

function Post({ date, image, title, slug }) {
  let { file, description } = image

  return (
    <Container className="post">
      <Image alt={description} src={`https:${file.url}`} className="preview-image" />
        <Container className="link-container">
          <Link href={`/post/${slug}`}>
            <Header as="h2"><a>{title}</a></Header>
          </Link>
          <Link href={`/post/${slug}`}>
            <Header as="h3"><a>{date.substring(0, 10)}</a></Header>
          </Link>
        </Container>
      <div className="description">{description}</div>
    </Container>
  )
}

export default Post
