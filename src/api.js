import axios from "axios";
import { Loading } from 'notiflix/build/notiflix-loading-aio';


axios.defaults.baseURL = 'https://pixabay.com/api/';



async function fetchImages(searchQuery, currentPage) {
    const params = new URLSearchParams({
        key: '38443406-02e0c7b1b947ca24dc39fc963',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: 40,
    });

    Loading.hourglass();
   

    return await axios.get((`?${params}`))
        .then(async resp => {
            if (resp.status !== 200) {
                throw new Error(resp.status);
            }
            return await resp.data;
    })
}
export { fetchImages };