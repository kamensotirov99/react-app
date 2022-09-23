import axios from 'axios';
import { BASE_GENRE_URL } from './Constants'
class GenreService {
    /**
     * Lists all available genres
     * @returns {Promise<Array>} The list of all genres
     * @throws {Error} The error from the http request
     */
    listAllGenres = async () => {
        const genreList = await axios.get(BASE_GENRE_URL + '/list');
        return genreList.data || [];
    }

    /**
     * Creates a new genre
     * @param {String} name The name of the genre we're creating
     * @param {String} description The description of the genre
     * @returns {Promise<Object>} The created genre
     * @throws {Error} The error from the http request
     */
    createGenre = async (name, description) => {
        const newGenre = await axios.post(BASE_GENRE_URL, { name, description });
        return newGenre.data || {};
    }

    /**
     * Updates an existing object
     * @param {String} id The id of the genre we're updating
     * @param {String} name The name of the genre
     * @param {String} description The description of the genre
     * @returns {Promise<Object>} The updated genre
     * @throws {Error} The error from the http request
     */
    updateGenre = async (id, name, description) => {
        const updateGenre = await axios.put(BASE_GENRE_URL, { id, name, description });
        return updateGenre.data || {};
    }

    /**
     * Gets a genre by its name
     * @param {String} name The name of the genre
     * @returns {Promise<Object>} The genre with the specified name
     * @throws {Error} The error from the http request
     */
    getGenreByName = async (name) => {
        const getGenre = await axios.get(BASE_GENRE_URL + `?name=${name}`);
        return getGenre.data || {};
    }

    /**
     * Gets a genre by its id
     * @param {String} id The id of the genre
     * @returns {Promise<Object>} The genre with the specified id
     * @throws {Error} The error from the http request
     */
    getGenreById = async (id) => {
        const getGenre = await axios.get(BASE_GENRE_URL + `?id=${id}`);
        return getGenre.data || {};
    }
}

export default new GenreService();