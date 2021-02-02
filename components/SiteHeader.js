import Link from 'next/link'
import { Header, Container } from 'semantic-ui-react'

export default function SiteHeader() {
  return (
    <Container>
      <Header as="h1" className="title">
        <Link href="/">
          <a>Matt Keegan's portfolio</a>
        </Link>
      </Header>    
    </Container>
  )
}