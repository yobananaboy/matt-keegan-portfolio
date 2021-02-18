import ScaledImage from './ScaledImage'
import { Header, Divider } from 'semantic-ui-react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function PostBody({ title, image, description, body }) {

    const Bold = ({ children }) => <strong>{children}</strong>;
    
    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            let image = node.data.target.fields;
            return <ScaledImage className="body-image" image={image} maxWidth={500} />
        }
      }
    }

    const postBody = documentToReactComponents(body, options)

    return (
        <>
          <Header as="h1">{title}</Header>
          <ScaledImage image={image} className="post-header__image" maxWidth={600} />
          <Divider horizontal />
          {postBody}
          <Divider horizontal />
        </>
    )
  }