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
      className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
      id={`gallery-${gallery?.id}`}
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        {gallery?.title}
      </h2>

      <section>
        {images.map((image: ImgurImage, i: number) => (
          <Image
            src={image.link}
            alt={image.title}
            layout="responsive"
            width={700}
            height={475}
            key={i}
          />
        ))}
      </section>
    </section>
  );
};

export default Gallery;
