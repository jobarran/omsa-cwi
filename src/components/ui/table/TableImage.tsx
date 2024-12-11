import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width: number;
  height: number;
  priority?: boolean;

}

export const TableImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  priority = false,  // default to false unless explicitly set
}: Props) => {

  const localSrc = (src)
    ? src.startsWith('http') // full image URL
      ? src
      : `/imgs/tools/${src}` // relative path for local assets
    : '/imgs/placeholder.jpg'; // fallback image

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      style={ style }
      sizes="100vw"
    />
  );
};
