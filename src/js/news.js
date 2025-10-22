// fetch news from API and render template
import { renderListWithTemplate } from "./utils.mjs";

export default class News {
  constructor(listElement) {
    this.listElement = listElement;
    this.apiKey = import.meta.env.VITE_NEWS_API_KEY;
    this.apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=music&apiKey=${this.apiKey}`;
  }
  async init() {
    try {
      const newsData = await this.fetchNewsData();
      this.renderNewsList(newsData.articles);
    } catch (err) {
      console.error("Error initializing News:", err);
    }
  }
  async fetchNewsData() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // return first 8 articles
    const data = await response.json();
    const returnedData = { ...data, articles: data.articles.slice(0, 8) };
    return returnedData;
  }
  renderNewsList(articles) {
    renderListWithTemplate(
      this.newsArticleTemplate,
      this.listElement,
      articles,
    );
  }
  newsArticleTemplate(article) {
    return `<li class="news-item">
                <img src="${article.urlToImage || "https://shorturl.at/GKBnr"}" alt="Image for ${article.title}" />
                <article class="news-article">
                    <h2 class="news-title">${article.title}</h2>
                    <span>By ${article.author || "Unknown"}</span>
                    <p class="news-summary">
                        ${article.description}   
                    </p>
                    <p class="news-date">Published on ${new Date(article.publishedAt).toLocaleDateString()}</p>
                    <a href="${article.url}" class="read-more" target="_blank" rel="noopener">Read More</a>
                </article>
            </li>`;
  }
}
