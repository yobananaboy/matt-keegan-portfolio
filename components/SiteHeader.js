import Link from 'next/link'
import { Header, Container } from 'semantic-ui-react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function SiteHeader({ info }) {

  const Bold = ({ children }) => <strong>{children}</strong>;
    
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
          let { file, alt } = node.data.target.fields;
          return <Image className="header-image" src={file.url} alt={alt} />
      }
    }
  }

  return (
    <Container>
      <Header as="h1" className="title">
        <Link href="/">
          <a>{info.title}</a>
        </Link>
      </Header>
      <Container>
        {documentToReactComponents(info.intro)}
      </Container>
    </Container>
  )
}