import axios from "axios";
import { API_KEY } from "../../config/APIkey";

export default async function fetchNews() {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  return res.data.articles
}
