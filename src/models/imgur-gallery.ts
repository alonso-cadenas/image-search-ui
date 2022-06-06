import { ImgurImage } from './imgur-image';

export type ImgurGallery = {
  id: string;
  title: string;
  description: string;
  link: string;
  images: Array<ImgurImage>;
};
