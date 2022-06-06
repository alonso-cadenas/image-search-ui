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
    const data = await fetch(
      `https://api.imgur.com/3/gallery/search/?q=${searchTerm}`,
      {
        headers: new Headers({
          Authorization: 'Client-ID b067d5cb828ec5a',
        }),
      }
    );
    return data.json();
  } catch (e) {
    console.error('Unable to fetch images: ', e);
    return [];
  }
};
