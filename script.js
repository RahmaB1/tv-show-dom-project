async function setup() {
  const allShows = await getAllShows();
  let urlForApi = `${allShows[0]._links.self.href}/episodes`;
  let allEpisodes = await fetchFromApi1(urlForApi);
  makePageForShows(allShows);
  //  makePageForEpisodes(allEpisodes);
  selectShow(allShows);
  selectEpisode(allEpisodes);
  // makeLiveSearch(allEpisodes); // need to make it work for both shows and episodes
  navigateToShows(allShows);
  searchInsideShows(allShows);
}
/*
Provide a free-text show search 
through show names, genres, and summary texts.
*/

function searchInsideShows(shows) {
  let searchTitleEl = document.createElement("h4");
  searchTitleEl.textContent = "Search....";
  let searchBoxEl = document.createElement("input");
  searchBoxEl.placeholder = "Search here ......";
  let headerEl = document.getElementById("header-id");
  headerEl.appendChild(searchTitleEl);
  headerEl.appendChild(searchBoxEl);
  let displayFilteredEpisodeNumberP = document.createElement("p");
  headerEl.appendChild(displayFilteredEpisodeNumberP);

  searchBoxEl.addEventListener("input", function () {
    let searchedWords = searchBoxEl.value;
    let showsAfterSearch = isShowIncludeWord(shows, searchedWords);

    displayFilteredEpisodeNumberP.innerHTML = `Displaying ${showsAfterSearch.length}/${shows.length} episodes.`;
    makePageForShows(showsAfterSearch);
  });
}

function navigateToShows(shows) {
  let headerEl = document.getElementById("header-id");
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Back To All Shows..";
  headerEl.appendChild(buttonEl);

  buttonEl.addEventListener("click", () => {
    makePageForShows(shows);
  });
}

function makePageForShows(shows) {
  const mainContentElem = document.getElementById("content");
  mainContentElem.innerHTML = "";

  for (let i = 0; i < shows.length; i++) {
    let sectionElm = document.createElement("section");
    mainContentElem.appendChild(sectionElm);
    sectionElm.className = "section-style";
    let episodeNameEl = document.createElement("h2");
    sectionElm.appendChild(episodeNameEl);
    episodeNameEl.className = "title-background";
    //will creat section for image and summary and inner suction then flex then row direciton
    let bottomSectionEl = document.createElement("section");
    bottomSectionEl.className = "bottom-section";
    sectionElm.appendChild(bottomSectionEl);
    let episodeImageEl = document.createElement("img");
    bottomSectionEl.appendChild(episodeImageEl);
    let summaryEl = document.createElement("p");
    bottomSectionEl.appendChild(summaryEl);
    let innerSection = document.createElement("section");
    innerSection.className = "inner-section";
    bottomSectionEl.appendChild(innerSection);
    let ratingEl = document.createElement("p");
    innerSection.appendChild(ratingEl);
    let genresEl = document.createElement("p");
    innerSection.appendChild(genresEl);
    let statusEl = document.createElement("p");
    innerSection.appendChild(statusEl);
    let runtimeEl = document.createElement("p");
    innerSection.appendChild(runtimeEl);
    episodeNameEl.textContent = shows[i].name;
    let fallbackImageUrl =
      "https://img.freepik.com/free-vector/gradient-no-photo-sign_23-2149263898.jpg?w=900&t=st=1684774054~exp=1684774654~hmac=f3127a286c175ffe2bb944611dec67f8ad4a14fd3acee082901e168742c6a008";
    episodeImageEl.src = shows[i].image?.medium ?? fallbackImageUrl;
    episodeImageEl.style.height = "10rem";
    summaryEl.innerHTML = shows[i].summary;
    ratingEl.innerHTML = `<strong>Rated: </strong> ${shows[i].rating.average}`;
    genresEl.innerHTML = `<strong>Genres: </strong> ${shows[i].genres}`;
    statusEl.innerHTML = `<strong>Status: </strong> ${shows[i].status}`;
    runtimeEl.innerHTML = `<strong>Runtime: </strong> ${shows[i].runtime}`;

    sectionElm.dataset.showId = i;

    sectionElm.addEventListener("click", function (event) {
      let showId = event.currentTarget.dataset.showId;
      let urlOfApi = `${shows[showId]._links.self.href}/episodes`;
      getEpisodesFromSelectedShow(urlOfApi);
    });
  }
}

function selectShow(shows) {
  let headerEl = document.getElementById("header-id");
  let selectShowDivEl = document.createElement("div");
  selectShowDivEl.id = "select-show-el";
  headerEl.appendChild(selectShowDivEl);
  let selectTitleEl = document.createElement("h4");
  selectTitleEl.textContent = "Select Show...";
  selectShowDivEl.appendChild(selectTitleEl);
  let selectEl = document.createElement("select");
  selectShowDivEl.appendChild(selectEl);

  for (let i = 0; i < shows.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = shows[i].name;
    selectEl.appendChild(option);
  }

  selectEl.addEventListener("click", function (event) {
    console.log("You clicked option " + event.target.value);
    let urlOfApi = `${shows[event.target.value]._links.self.href}/episodes`;
    getEpisodesFromSelectedShow(urlOfApi, shows);
  });
}

async function getEpisodesFromSelectedShow(url, shows) {
  //this function will fetch episodes based on the selected show
  let episodesFromShow = await fetchFromApi1(url);
  console.log(episodesFromShow);
  makePageForEpisodes(episodesFromShow);
  selectEpisode(episodesFromShow);
  makeLiveSearch(episodesFromShow);
  navigateToShows(shows);
}

//make it for shows then I'll try to make it general
async function fetchFromApi1(url) {
  try {
    const response = await fetch(url);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function selectEpisode(episodes) {
  let headerEl = document.getElementById("header-id");
  //trying to avoid duplication in episodes by keeping show div and creating everything else here
  let selectShowDivEl = document.getElementById("select-show-el");
  headerEl.innerHTML = ""; //its not working as its already there
  headerEl.appendChild(selectShowDivEl);

  let selectEpisodeDivEl = document.createElement("div");
  selectEpisodeDivEl.innerHTML = "";
  selectEpisodeDivEl.id = "select-div-el";
  headerEl.appendChild(selectEpisodeDivEl);
  let selectTitleEl = document.createElement("h4");
  selectTitleEl.textContent = "Select Episode...";
  selectEpisodeDivEl.appendChild(selectTitleEl);
  let selectEl = document.createElement("select");
  selectEpisodeDivEl.appendChild(selectEl);

  for (let i = 0; i < episodes.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = `${episodes[i].name} - S0${episodes[i].season}E0${episodes[i].number}`;
    selectEl.appendChild(option);
  }

  selectEl.addEventListener("click", function (event) {
    console.log("You clicked option " + event.target.value);
    let arrayAfterEpisodeSelect = [episodes[event.target.value]];
    makePageForEpisodes(arrayAfterEpisodeSelect);
  });
}

function makeLiveSearch(allEpisodes) {
  let searchTitleEl = document.createElement("h4");
  searchTitleEl.textContent = "Search....";
  let searchBoxEl = document.createElement("input");
  searchBoxEl.placeholder = "Search here ......";
  let headerEl = document.getElementById("header-id");
  headerEl.appendChild(searchTitleEl);
  headerEl.appendChild(searchBoxEl);
  let displayFilteredEpisodeNumberP = document.createElement("p");
  headerEl.appendChild(displayFilteredEpisodeNumberP);

  searchBoxEl.addEventListener("input", function () {
    let searchedWords = searchBoxEl.value;
    let episodesAfterSearch = isEpisodeIncludeWord(allEpisodes, searchedWords);

    let lengthOfFilteredEpisodes = episodesAfterSearch.length;
    displayFilteredEpisodeNumberP.innerHTML = `Displaying ${lengthOfFilteredEpisodes}/${allEpisodes.length} episodes.`;

    makePageForEpisodes(episodesAfterSearch);
  });
}
function isShowIncludeWord(shows, word) {
  let filteredShows = [];
  //lowercase the genres array

  for (let show of shows) {
    let loweredGenres = show.genres.map((element) => {
      return element.toLowerCase();
    });
    if (
      show.name.toLowerCase().includes(word.toLowerCase()) ||
      show.summary.toLowerCase().includes(word.toLowerCase()) ||
      loweredGenres.includes(word.toLowerCase())
    ) {
      filteredShows.push(show);
    }
  }
  return filteredShows;
}

function isEpisodeIncludeWord(allepisodes, word) {
  let filteredEpisodes = [];

  for (let episode of allepisodes) {
    if (
      episode.name.toLowerCase().includes(word.toLowerCase()) ||
      episode.summary.toLowerCase().includes(word.toLowerCase())
    ) {
      filteredEpisodes.push(episode);
    }
  }
  return filteredEpisodes;
}

function makePageForEpisodes(episodeList) {
  const mainContentElem = document.getElementById("content");

  mainContentElem.innerHTML = " "; //clear everything

  for (let i = 0; i < episodeList.length; i++) {
    let sectionElm = document.createElement("section");
    mainContentElem.appendChild(sectionElm);
    sectionElm.className = "section-style";

    let episodeNameEl = document.createElement("h4");
    sectionElm.appendChild(episodeNameEl);
    episodeNameEl.className = "title-background";

    let episodeImageEl = document.createElement("img");
    episodeImageEl.style.width = "10rem";

    sectionElm.appendChild(episodeImageEl);

    let summaryEl = document.createElement("p");
    sectionElm.appendChild(summaryEl);

    let epiName = episodeList[i].name;
    let seasonNumber = episodeList[i].season;
    let episodeNumber = episodeList[i].number;
    episodeNameEl.textContent = `${epiName} - S0${seasonNumber}E0${episodeNumber}`;
    episodeImageEl.src = episodeList[i].image.medium;
    summaryEl.innerHTML = episodeList[i].summary;
  }
}

window.onload = setup;

//ideas:
//make show images smaller
//change color / theme
//change episodes style as it was affected by show style
