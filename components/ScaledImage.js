import Image from 'next/image'
import { useWindowSize } from '../utils/useWindowSize'

const imageLoader = ({ src, width, quality }) => {
  return `https://${src}?w=${width}&q=${quality || 75}`
}

const ScaledImage = ({image, className, maxWidth = 1000 }) => {

  const size = useWindowSize()

  const width = size.width < maxWidth ? size.width: maxWidth // max image width 1000

  const aspectRatio = image.file.details.image.height / image.file.details.image.width // get aspect ratio by dividing original height by original width

  return (
    <Image
      loader={() => imageLoader({ src: image.file.url, width })}
      src={image.file.url}
      alt={image.description}
      width={width}
      height={width * aspectRatio}
      className={className}
    />
  )
}

export default ScaledImage