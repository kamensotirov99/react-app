import axios from "axios";
import { BASE_EPISODE_URL } from "./Constants";

class EpisodeService {
  /**
   * Creates a new episode
   * @param {String} seasonId
   * @param {String} title
   * @param {String} trailerUrl
   * @param {Object} length
   * @param {String} resume
   * @param {Array<Object>} writtenBy
   * @param {Array<Object>} directedBy
   * @param {Array<Object>} producedBy
   * @param {Array<Object>} starring
   * @returns {Promise<Object>} The created episode
   * @throws {Error} The error from the http request
   */

  createEpisode = async (
    seasonId,
    title,
    trailerUrl,
    length,
    resume,
    writtenBy,
    directedBy,
    producedBy,
    starring
  ) => {
    const resp = await axios.post(BASE_EPISODE_URL, {
      seasonId,
      title,
      trailerUrl,
      length,
      resume,
      writtenBy,
      directedBy,
      producedBy,
      starring,
    });
    return resp.data || [];
  };

  /**
   * Gets an episode by id
   * @param {String} id The id of the episode
   * @returns {Promise<Object>} The episode with the specified id
   * @throws {Error} The error from the http request
   */
  getEpisode = async (id) => {
    const resp = await axios.get(BASE_EPISODE_URL + `?id=${id}`);
    return resp.data || {};
  };

  /**
   * Updates an existing episode
   * @param {String} id
   * @param {String} seasonId
   * @param {String} title
   * @param {String} trailerUrl
   * @param {Object} length
   * @param {String} resume
   * @param {Array<Object>} writtenBy
   * @param {Array<Object>} directedBy
   * @param {Array<Object>} producedBy
   * @param {Array<Object>} starring
   * @returns {Promise<Object>} The created episode
   * @throws {Error} The error from the http request
   */
  updateEpisode = async (
    id,
    seasonId,
    title,
    trailerUrl,
    length,
    resume,
    writtenBy,
    directedBy,
    producedBy,
    starring
  ) => {
    const resp = await axios.put(BASE_EPISODE_URL, {
      id,
      seasonId,
      title,
      trailerUrl,
      length,
      resume,
      writtenBy,
      directedBy,
      producedBy,
      starring,
    });
    return resp.data || {};
  };

  /**
   * Lists all available episodes
   * @returns {Promise<Array>} The list of all episodes
   * @throws {Error} The error from the http request
   */
  listEpisodes = async () => {
    const resp = await axios.get(BASE_EPISODE_URL + "/list");
    return resp.data || [];
  };


  /**
   * List all episodes from a specific season
   * @param {String} seasonId 
   * @returns 
   */
  listSeasonEpisodes = async (seasonId) => {
    const resp = await axios.get(
      BASE_EPISODE_URL + `/list?seasonId=${seasonId}`
    );
    return resp.data || [];
  };

  /**
   * Uploads posters for an episode
   * @param {FormData} formData contains the images we're uploading, as well as the corresponding ids 
   * @returns 
   */
  uploadPosters = async (formData) => {
    const config = {
      headers: { 'Content-type': 'multipart/form-data' }
    }
    const resp = await axios.post(BASE_EPISODE_URL + `/posters`, formData, config);
    return resp.data || {};
  }
}

export default new EpisodeService();
