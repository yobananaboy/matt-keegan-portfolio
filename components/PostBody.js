import Link from 'next/link'
import { Container, Header, Image, Divider } from 'semantic-ui-react'

export default function PostBody({ title, image }) {
    return (
        <Container>
            <Header as="h1">{title}</Header>
            <Image src={image.file.url} alt={image.file.description} />
            <Divider horizontal />
            <Link href="/">Back to home</Link>
        </Container>
    )
  }