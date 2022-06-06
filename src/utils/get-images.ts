import { ImgurGallery } from '../models/imgur-gallery';

/**
 * Fetches a list of galleries from the Imgur API.
 * @param searchTerm the query search term
 * @returns an array of image galleries
 */
export const getImages = async (
  searchTerm: string
): Promise<Array<ImgurGallery>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IMGUR_HOSTNAME}/gallery/search/?q=${searchTerm}`,
      {
        headers: new Headers({
          Authorization: `${process.env.NEXT_PUBLIC_IMGUR_AUTH_HEADER}`,
        }),
      }
    );
    const { data } = await response.json();
    return data;
  } catch (e) {
    console.error('Unable to fetch images: ', e);
    return [];
  }
};
