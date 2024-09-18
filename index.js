const button = document.getElementById("btnGenerate");
const API_URL = "https://programming-quotesapi.vercel.app/api/random";
const content = document.getElementById("quote-content");
const author = document.getElementById("author");
const updateLoadingState = () => {
  document.getElementById("quote-content").innerText = "Loading...";
  document.getElementById("author").innerText = "- Author";
};

const processQuote = () => {
  return new Promise((resolve, reject) => {
    updateLoadingState();
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => {
          resolve(response.json());
        })
        .catch((e) => {
          reject(e);
        });
    }, 1000);
  });
};

function displayQuote(data) {
  content.innerText = `"${data.quote}"`;
  author.innerText = `-${data.author}`;
}

button.addEventListener("click", function () {
  getQuote();
});

function getQuote() {
  processQuote()
    .then((response) => {
      displayQuote(response);
    })
    .catch((e) => {
      console.log(e);
    });
}

function shareToTwitter() {
  window.open(
    `https://twitter.com/intent/tweet?text=${content.innerText} ${author.innerText}`,
    "Tweet Window",
    "width=600, height=300"
  );
}

document.getElementById("btnTwitter").onclick = shareToTwitter;
getQuote();
