import Image from 'next/image';
import type { FC } from 'react';
import { ImgurGallery } from '../models/imgur-gallery';
import { ImgurImage } from '../models/imgur-image';

type Props = {
  gallery: ImgurGallery;
};

const Gallery: FC<Props> = ({ gallery }: Props): JSX.Element | null => {
  const images =
    gallery?.images?.filter(({ type }: ImgurImage) => type.includes('image')) ||
    [];

  if (!images.length) {
    return null;
  }

  return (
    <section
      className="border rounded-md w-full sm:max-w-lg mx-auto my-2 p-4"
      id={`gallery-${gallery?.id}`}
    >
      <h2 className="mb-2 text-2xl font-semibold tracking-tight">
        {gallery?.title}
      </h2>

      <section>
        {images.map((image: ImgurImage, i: number) => (
          <Image
            alt={image.title}
            height={image.height}
            key={i}
            layout="responsive"
            src={image.link}
            width={image.width}
          />
        ))}
      </section>
    </section>
  );
};

export default Gallery;
