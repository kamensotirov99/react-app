import axios from "axios";
import { BASE_SHOW_URL, BASE_MOVIE_POSTERS_URL, BASE_SERIES_POSTERS_URL, MOVIE_TYPE } from "./Constants";

class ShowService {
    /**
     * Creates a new show
     * @param {String} title The name of the show
     * @param {String} type The type of the show
     * @param {String} releaseDate The release date of the show
     * @param {String} endDate The end date of the show
     * @param {Object} length The length of the show
     * @param {String} trailerUrl The trailer URL of the show
     * @param {Array[]} genres The genres of the show
     * @param {Array[]} directedBy The directors of the show
     * @param {Array[]} producedBy The producers of the show
     * @param {Array[]} writtenBy The writers of the show
     * @param {Array[]} starring The starrings of the show
     * @param {String} description The description of the show
     * @param {Array[]} seasons The seasons of the show
     * @returns {Promise<Object>} The created show
     * @throws {Error} The error from the http request
     */
    createShow = async (title, type, releaseDate, endDate, length, trailerUrl, genres, directedBy, producedBy, writtenBy, starring, description, seasons) => {
        const resp = await axios.post(BASE_SHOW_URL, { title, type, releaseDate, endDate, length, trailerUrl, genres, directedBy, producedBy, writtenBy, starring, description, seasons });
        return resp.data || [];
    }

    /**
     * Gets a show by id
     * @param {String} id The id of the show
     * @returns {Promise<Object>} The show with the specified id
     * @throws {Error} The error from the http request
     */
    getShow = async (id) => {
        const resp = await axios.get(BASE_SHOW_URL + `?id=${id}`);
        return resp.data || {};
    }

    /**
     * Updates an existing show
     * @param {String} id The id of the show
     * @param {String} title The name of the show
     * @param {String} type The type of the show
     * @param {String} releaseDate The release date of the show
     * @param {String} endDate The end date of the show
     * @param {Number} rating The rating of the show
     * @param {Object} length The length of the show
     * @param {String} trailerUrl The trailer URL of the show
     * @param {Array[]} genres The genres of the show
     * @param {Array[]} directedBy The directors of the show
     * @param {Array[]} producedBy The producers of the show
     * @param {Array[]} writtenBy The writers of the show
     * @param {Array[]} starring The starrings of the show
     * @param {String} description The description of the show
     * @param {Array[]} seasons The seasons of the show
     * @returns {Promise<Object>} The created show
     * @throws {Error} The error from the http request
     */
    updateShow = async (id, title, type, releaseDate, endDate, rating, length, trailerUrl, genres, directedBy, producedBy, writtenBy, starring, description, seasons) => {
        const resp = await axios.put(BASE_SHOW_URL, { id, title, type, releaseDate, endDate, rating, length, trailerUrl, genres, directedBy, producedBy, writtenBy, starring, description, seasons });
        return resp.data || {};
    }

    /**
     * Lists all available shows
     * @returns {Promise<Array>} The list of all shows
     * @throws {Error} The error from the http request
     */
    listShows = async () => {
        const resp = await axios.get(BASE_SHOW_URL + '/list');
        return resp.data || [];
    }

    /**
     * 
     * @param {string} showType The type of the show
     * @param {FormData} formData The formData with the uploaded images
     * @returns {Promise<Object>} The object with the updated postersPath
     * @throws {Error} The error from the http request
     */
    uploadPosters = async (showType, formData) => {
        const config = {
            headers: { 'Content-type': 'multipart/form-data' }
        }
        const resp = await axios.post(`${showType === MOVIE_TYPE ? BASE_MOVIE_POSTERS_URL : BASE_SERIES_POSTERS_URL}`, formData, config);
        return resp.data || {};
    }
}

export default new ShowService();