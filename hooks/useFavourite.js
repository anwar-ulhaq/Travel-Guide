import {doFetch} from './doFetch';
import {baseUrl} from '../utils/variables';

export const useFavourite = () => {
  const postFavourite = async (token, fileId) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('Post Favourite: ' + error.message);
    }
  };
  const getFavouriteById = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId);
    } catch (error) {
      throw new Error('Get favourite by Id:  ' + error.message);
    }
  };

  const deleteFavourite = async (token, fileId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('Delete favourite:  ' + error.message);
    }
  };
  return {postFavourite, getFavouriteById, deleteFavourite};
};
