import axios from 'axios';
import { BASE_SEASON_URL, BASE_SEASON_POSTERS_URL } from './Constants'
import EpisodeService from './Episode';
class SeasonService {
    /**
     * Lists all available seasons
     * @returns {Promise<Array>} The list of all seasons
     * @throws {Error} The error from the http request
     */
    listAllSeasons = async () => {
        const seasonList = await axios.get(BASE_SEASON_URL + '/list');
        return seasonList.data || [];
    }

    /**
     * Creates a new season
     * @param {String} showId The show's id to which the season belongs
     * @param {String} title The title of the season
     * @param {String} trailerUrl The trailer of the season
     * @param {String} resume The season's resume
     * @param {Number} rating The season's rating
     * @param {Date} releaseDate The season's release date
     * @param {Array<Object>} writtenBy Array of writer objects
     * @param {Array<Object>} producedBy Array of producer objects
     * @param {Array<Object>} directedBy Array of director objects
     * @param {Array<Object>} episodes Array of the season's episodes
     * @returns {Promise<Object>} The created season
     * @throws {Error} The error from the http request
     */
    createSeason = async (showId, title, trailerUrl, resume, releaseDate, writtenBy, producedBy, directedBy, episodes) => {
        const newSeason = await axios.post(BASE_SEASON_URL, { showId, title, trailerUrl, resume, releaseDate, writtenBy, producedBy, directedBy, episodes });
        return newSeason.data || {};
    }

    /**
     * Updates an existing object
     * @param {String} id The season's id
     * @param {String} showId The show's id to which the season belongs
     * @param {String} title The title of the season
     * @param {String} trailerUrl The trailer of the season
     * @param {String} resume The season's resume
     * @param {Number} rating The season's rating
     * @param {Date} releaseDate The season's release date
     * @param {Array<Object>} writtenBy Array of writer objects
     * @param {Array<Object>} producedBy Array of producer objects
     * @param {Array<Object>} directedBy Array of director objects
     * @param {Array<Object>} episodes Array of the season's episodes
     * @returns {Promise<Object>} The updated season
     * @throws {Error} The error from the http request
     */
    updateSeason = async (id, showId, title, trailerUrl, resume, rating, releaseDate, writtenBy, producedBy, directedBy, episodes) => {
        const updateSeason = await axios.put(BASE_SEASON_URL, { id, showId, title, trailerUrl, resume, rating, releaseDate, writtenBy, producedBy, directedBy, episodes });
        return updateSeason.data || {};
    }

    /**
     * Gets a season by its id
     * @param {String} id The id of the season
     * @returns {Promise<Object>} The season with the specified id
     * @throws {Error} The error from the http request
     */
    getSeason = async (id) => {
        const getSeason = await axios.get(BASE_SEASON_URL + `?id=${id}`);
        return getSeason.data || {};
    }

    /**
     * Gets a list of seasons by showId
     * @param {String} showId The id of the show
     * @returns {Promise<Array>} The show's seasons
     * @throws {Error} The error from the http request
     */
    getShowSeasons = async (showId) => {
        const seasons = await axios.get(BASE_SEASON_URL + `/list?showId=${showId}`);
        return seasons.data || {};
    }

    /**
     * 
     * @param {FormData} formData The formData with the uploaded images
     * @returns {Promise<Object>} The object with the updated postersPath
     * @throws {Error} The error from the http request
     */
    uploadPosters = async (formData) => {
        const config = { headers: { 'Content-type': 'multipart/form-data' } }
        const resp = await axios.post(BASE_SEASON_POSTERS_URL, formData, config);
        return resp.data || {};
    }

    /**
     * Calculates the average length of the season's episodes and returns a Length object with the hours and the minutes
     * @param {String} seasonId 
     * @returns {Object{hours,minutes}} The length object returned from the function
     */
    getAverageLength = async (seasonId) => {
        let resp = await EpisodeService.listSeasonEpisodes(seasonId);
        let hours = 0;
        let minutes = 0;
        resp.forEach(element => {
            hours += element.length.hours;
            minutes = minutes + element.length.minutes;
        });
        hours = parseInt(hours / resp.length);
        minutes = parseInt(minutes / resp.length);
        return { hours, minutes }
    }
}



export default new SeasonService();