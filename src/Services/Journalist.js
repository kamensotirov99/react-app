import axios from 'axios';
import { BASE_JOURNALIST_URL } from './Constants';

class JournalistService {
    /**
     * Lists all available journalists
     * @returns {Promise<Array>} The list of all journalists
     * @throws {Error} The error from the http request
     */
    listAllJournalists = async () => {
        const journalistList = await axios.get(BASE_JOURNALIST_URL + '/list');
        return journalistList.data || [];
    }

    /**
     * Creates a new journalist
     * @param {String} name The name of the journalist we're creating
     * @returns {Promise<Object>} The created object
     * @throws {Error} The error from the http request
     */
    createJournalist = async (name) => {
        const newJournalist = await axios.post(BASE_JOURNALIST_URL, { name });
        return newJournalist.data || {};
    }

    /**
     * Updates an existing object
     * @param {String} id The journalist's id
     * @param {String} name The journalist's name
     * @returns {Promise<Object>} The updated object
     * @throws {Error} The error from the http request
     */
    updateJournalist = async (id, name) => {
        const updateJournalist = await axios.put(BASE_JOURNALIST_URL, { id, name });
        return updateJournalist.data || {};
    }

    /**
     * Gets a journalist by its name
     * @param {String} name The name of the journalist
     * @returns {Promise<Object>} The journalist with the specified name
     * @throws {Error} The error from the http request
     */
    getJournalistByName = async (name) => {
        const getJournalist = await axios.get(BASE_JOURNALIST_URL + `?name=${name}`);
        return getJournalist.data || {};
    }

    /**
     * Gets a journalist by its name
     * @param {String} id The id of the journalist
     * @returns {Promise<Object>} The journalist with the specified id
     * @throws {Error} The error from the http request
     */
    getJournalistById = async (id) => {
        const getJournalist = await axios.get(BASE_JOURNALIST_URL + `?id=${id}`);
        return getJournalist.data || {};
    }
}

export default new JournalistService();