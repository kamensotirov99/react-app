import axios from 'axios';
import { BASE_ARTICLE_URL, BASE_ARTICLE_POSTERS_URL } from './Constants'

class ArticleService {
    /**
     * Creates a new article
     * @param {String} title The title of the article
     * @param {String} releaseDate The release date of the article
     * @param {String} description The description of the article
     * @param {String} journalistName The name of the journalist of the article
     * @returns {Promise<Object>} The created article
     * @throws {Error} The error from the http request
     */
    createArticle = async (title, releaseDate, description, journalistName) => {
        const newArticle = await axios.post(BASE_ARTICLE_URL, { title, releaseDate, description, journalistName });
        return newArticle.data || {};
    }

    /**
     * Updates an existing article
     * @param {String} id The id of the article
     * @param {String} title The title of the article
     * @param {String} releaseDate The release date of the article
     * @param {String} description The description of the article
     * @param {Object} journalist The object of the journalist id of the article
     * @returns {Promise<Object>} The updated article
     * @throws {Error} The error from the http request
     */
    updateArticle = async (id, title, releaseDate, description, journalist) => {
        const updatedArticle = await axios.put(BASE_ARTICLE_URL, { id, title, releaseDate, description, journalist });
        return updatedArticle.data || {};
    }

    /**
     * Gets an article by id
     * @param {String} id The id of the article
     * @returns {Promise<Object>} The article with the specified id
     * @throws {Error} The error from the http request
     */
    getAricle = async (id) => {
        const article = await axios.get(BASE_ARTICLE_URL + `?id=${id}`);
        return article.data || {};
    }

    /**
     * Returns the latest articles by the elementCount parameter
     * @param {Number} elementCount 
     * @returns {Promise<Array>} The list of all articles
     * @throws {Error} The error from the http request
     */
    listArticlesByCount = async (elementCount = 0) => {
        const articleList = await axios.get(BASE_ARTICLE_URL + `/list?elementCount=${elementCount}`);
        return articleList.data || [];
    }

    /**
     * Lists all available articles
     * @param {String} journalistId The id of the journalist
     * @returns {Promise<Array>} The list of all articles
     * @throws {Error} The error from the http request
     */
    listArticles = async (journalistId) => {
        const url = journalistId ? `/list?journalistId=${journalistId}` : '/list';
        const articleList = await axios.get(BASE_ARTICLE_URL + url);
        return articleList.data || [];
    }

    /**
     * 
     * @param {FormData} formData The formData with the uploaded images
     * @returns {Promise<Object>} The object with the updated postersPath
     * @throws {Error} The error from the http request
     */
    uploadPosters = async (formData) => {
        const config = { headers: { 'Content-type': 'multipart/form-data' } }
        const resp = await axios.post(BASE_ARTICLE_POSTERS_URL, formData, config);
        return resp.data || {};
    }
}

export default new ArticleService();