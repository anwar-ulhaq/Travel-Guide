// import {doFetch} from './doFetch';
// import {baseUrl} from '../utils/variables';
import {
  baseUrl,
  doFetch,
  favouritesPath,
  filePath,
  HTTP_METHOD,
} from '../utils';

export const useFavourite = () => {
  const postFavourite = async (token, fileId) => {
    const options = {
      method: HTTP_METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + favouritesPath, options);
    } catch (error) {
      throw new Error('Post Favourite: ' + error.message);
    }
  };
  const getFavouriteById = async (fileId) => {
    try {
      return await doFetch(baseUrl + favouritesPath + filePath + fileId);
    } catch (error) {
      throw new Error('Get favourite by Id:  ' + error.message);
    }
  };

  const deleteFavourite = async (token, fileId) => {
    const options = {
      method: HTTP_METHOD.DELETE,
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(
        baseUrl + favouritesPath + filePath + fileId,
        options
      );
    } catch (error) {
      throw new Error('Delete favourite:  ' + error.message);
    }
  };
  const getAllFavourite = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };

    try {
      const json = await doFetch(baseUrl + 'favourites', options);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      media.reverse();
      return media;
    } catch (error) {
      console.error(error);
    }
  };

  // Backend returns user's favorites only because of token
  const getUserFavorites = async (token) => {
    console.log('TOKEN_FAVORITES: ' + token);
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'favourites', options);
  };

  return {
    postFavourite,
    getFavouriteById,
    deleteFavourite,
    getAllFavourite,
    getUserFavorites,
  };
};
