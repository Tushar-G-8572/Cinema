import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/tmdb",
  withCredentials: true
});


// ✅ Fetch Movies / TV (popular, top_rated etc)
export async function getMoviesAndTv(type, changes = "popular") {
  try {
    const response = await api.get("/fetch", {
      params: {
        type,
        changes
      }
    });

    return response.data.results;

  } catch (err) {
    console.log(err);
    return [];
  }
}



// ✅ Discover Movies / TV (Filter Based)
export async function discoverContent({
  type,
  genre,
  rating,
  year,
  language,
  sort
}) {
  try {
    const response = await api.get("/discover", {
      params: {
        type,
        genre,
        rating,
        year,
        language,
        sort
      }
    });

    return response.data.results;

  } catch (err) {
    console.log(err);
    return [];
  }
}



// ✅ Search Movies / TV by Title
export async function searchMovies(title) {
  try {
    const response = await api.get("/search", {
      params: {
        title
      }
    });

    return response.data.results;

  } catch (err) {
    console.log(err);
    return [];
  }
}



// ✅ Get Movie / TV Details Page
export async function getDetails(type, id) {
  try {
    const response = await api.get(`/details/${type}/${id}`);

    return response.data;

  } catch (err) {
    console.log(err);
    return null;
  }
}