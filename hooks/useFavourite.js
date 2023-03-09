// import {doFetch} from './doFetch';
// import {baseUrl} from '../utils/variables';
import {
  appId,
  baseUrl,
  doFetch,
  favouritesPath,
  filePath,
  HTTP_METHOD,
  mediaPath,
} from '../utils';
import {useTag} from './useTag';

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

  const getUserFavorites = async (userId) => {
    try {
      const json = await useTag().getFilesByTag(appId);
      const listOfUserFavorites = [];
      const listOfUserFavoriteFiles = [];
      await Promise.all(
        json.map(async (item) => {
          await getFavouriteById(item.file_id).then((fileFavorites) => {
            fileFavorites
              .filter((singleFavorite) => singleFavorite.user_id === userId)
              .forEach((item) => listOfUserFavorites.push(item));
          });
        })
      );

      await Promise.all(
        listOfUserFavorites.map(async (item) => {
          try {
            await doFetch(baseUrl + mediaPath + item.file_id).then(
              (mediaFile) => listOfUserFavoriteFiles.push(mediaFile)
            );
          } catch (error) {
            console.error('getMediaById', error);
          }
        })
      );

      return listOfUserFavoriteFiles;
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * This function returns number of favorites, no actual favorites.
   *
   **/
  const getOtherUserFavorites = async (otherUserId) => {
    let otherUserFavoriteCount = 0;
    try {
      const json = await useTag().getFilesByTag(appId);
      await Promise.all(
        json.map(async (item) => {
          await getFavouriteById(item.file_id).then((fileFavorities) => {
            fileFavorities.forEach((singleFavorite) => {
              if (singleFavorite.user_id === otherUserId) {
                otherUserFavoriteCount++;
              }
            });
          });
        })
      );
      return otherUserFavoriteCount;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    postFavourite,
    getFavouriteById,
    deleteFavourite,
    getAllFavourite,
    getUserFavorites,
    getOtherUserFavorites,
  };
};
