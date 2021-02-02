import Link from 'next/link'
import { Container, Header, Image, Divider } from 'semantic-ui-react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function PostBody({ title, image, body }) {

    const Bold = ({ children }) => <strong>{children}</strong>;
    
    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            let { file, alt } = node.data.target.fields;
            return <Image className="body-image" src={file.url} alt={alt} />
        }
      }
    }

    const postBody = documentToReactComponents(body, options)

    return (
        <Container id="post">
            <Header as="h1">{title}</Header>
            <Image src={image.file.url} alt={image.file.description} className="post-header__image" />
            <Divider horizontal />
            <Container>
                {postBody}
            </Container>
            <Divider horizontal />
            <Link href="/"><a>Back to home</a></Link>
        </Container>
    )
  }