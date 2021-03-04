import Link from 'next/link';
import { Grid } from 'semantic-ui-react';

export default function Footer({ nextPost, prevPost, itemType, slugRoot }) {
  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          {nextPost &&
            <> 
              <h4>{`Next ${itemType}`}</h4>
              <h3>{nextPost.title}</h3>
              <Link href={`/${slugRoot}/${nextPost.slug}`}>
                {`View ${itemType}`}
              </Link>
            </>
          }
        </Grid.Column>
        <Grid.Column>
          {prevPost &&
            <> 
              <h4>{`Previous ${itemType}`}</h4>
              <h3>{prevPost.title}</h3>
              <Link href={`/${slugRoot}/${prevPost.slug}`}>
                {`View ${itemType}`}
              </Link>
            </>
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}