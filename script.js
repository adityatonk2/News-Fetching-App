const apiKey = "YOUR KEY";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById('search-input');

const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.log(err + " is Error");
    return [];
  }
}

searchButton.addEventListener('click',async ()=>{
    const query = searchField.value.trim();
    if(query !== ''){
      try{
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
      }
      catch(err){
        console.log("Name of Eror is " + err);
      }
    }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.log(err + " is Error");
    return [];
  }
};

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + '....' : article.title ;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDesc = article.description.length > 30 ? article.description.slice(0,120) + '....' : article.description ;
    description.textContent = truncatedDesc;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click',()=>{
      window.open(article.url, '_blank');
    })
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
    console.log(articles);
  } catch (err) {
    console.log("Error fetching Random news", err);
  }
})();
