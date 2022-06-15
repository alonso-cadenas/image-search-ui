import { ImgurImage } from './imgur-image';
import { ImgurTag } from './imgur-tag';

export type ImgurGallery = {
  id: string;
  title: string;
  description: string;
  link: string;
  images: Array<ImgurImage>;
  tags: Array<ImgurTag>;
};
