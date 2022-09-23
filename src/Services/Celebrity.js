import axios from "axios";
import { BASE_CELEBRITY_URL, BASE_CELEBRITY_POSTERS_URL } from "./Constants";

class CelebrityService {
    /**
     * Creates a new celebrity
     * @param {String} name The name of the celebrity we're creating
     * @param {String[]} occupation The occupations of the celebrity
     * @param {String} dateOfBirth The date of birth of the celebrity
     * @param {String} dateOfDeath The date of death of the celebrity
     * @param {String} placeOfBirth The palce of birth of the celebrity
     * @param {String} gender The gender of the celebrity
     * @param {String} bio The biography of the celebrity
     * @returns {Promise<Object>} The created celebrity
     * @throws {Error} The error from the http request
     */
    createCelebrity = async (name, occupation, dateOfBirth, dateOfDeath, placeOfBirth, gender, bio) => {
        const resp = await axios.post(BASE_CELEBRITY_URL, { name, occupation, dateOfBirth, dateOfDeath, placeOfBirth, gender, bio });
        return resp.data || [];
    }

    /**
     * Gets a celebrity by id
     * @param {String} id The id of the celebrity
     * @returns {Promise<Object>} The celebrity with the specified id
     * @throws {Error} The error from the http request
     */
    getCelebrity = async (id) => {
        const resp = await axios.get(BASE_CELEBRITY_URL + `?id=${id}`);
        return resp.data || {};
    }

    /**
     * Updates an existing celebrity
     * @param {String} id The id of the celebrity
     * @param {String} name The name of the celebrity we're creating
     * @param {String[]} occupation The occupations of the celebrity
     * @param {String} dateOfBirth The date of birth of the celebrity
     * @param {String} dateOfDeath The date of death of the celebrity
     * @param {String} placeOfBirth The place of birth of the celebrity
     * @param {String} gender The gender of the celebrity
     * @param {String} bio The biography of the celebrity
     * @returns {Promise<Object>} The created celebrity
     * @throws {Error} The error from the http request
     */
    updateCelebrity = async (id, name, occupation, dateOfBirth, dateOfDeath, placeOfBirth, gender, bio) => {
        const resp = await axios.put(BASE_CELEBRITY_URL, { id, name, occupation, dateOfBirth, dateOfDeath, placeOfBirth, gender, bio });
        return resp.data || {};
    }

    /**
     * Lists all available celebrities
     * @returns {Promise<Array>} The list of all celebrities
     * @throws {Error} The error from the http request
     */
    listCelebrities = async () => {
        const resp = await axios.get(BASE_CELEBRITY_URL + '/list');
        return resp.data || [];
    }

    /**
    * 
    * @param {FormData} formData The formData with the uploaded images
    * @returns {Promise<Object>} The object with the updated postersPath
    * @throws {Error} The error from the http request
    */
    uploadPosters = async (formData) => {
        const config = { headers: { 'Content-type': 'multipart/form-data' } }
        const resp = await axios.post(BASE_CELEBRITY_POSTERS_URL, formData, config);
        return resp.data || {};
    }
}

export default new CelebrityService();