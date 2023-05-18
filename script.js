async function setup() {
  let allShows = getAllShows();
  let urlForApi = `${allShows[0]._links.self.href}/episodes`;
  let allEpisodes = await fetchFromApi1(urlForApi); //this line might be usfule when passing url to make it general ...let urlOfApi = `${shows[event.target.value]._links.self.href}/episodes`;
  selectShow(allShows);
  selectEpisode(allEpisodes);
  makePageForEpisodes(allEpisodes);
  makeLiveSearch(allEpisodes);
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
    getEpisodesFromSelectedShow(urlOfApi);
  });
}

async function getEpisodesFromSelectedShow(url) {
  //this function will fetch episodes based on the selected show
  let episodesFromShow = await fetchFromApi1(url);
  console.log(episodesFromShow);
  makePageForEpisodes(episodesFromShow);
  selectEpisode(episodesFromShow);
  makeLiveSearch(episodesFromShow);
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

    //to display number of results from the search
    let lengthOfFilteredEpisodes =
      episodesAfterSearch.length > 0 ? episodesAfterSearch.length : 0;
    displayFilteredEpisodeNumberP.innerHTML = `Displaying ${lengthOfFilteredEpisodes}/${allEpisodes.length} episodes.`;

    makePageForEpisodes(episodesAfterSearch);
  });

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
}

function makePageForEpisodes(episodeList) {
  const mainContentElem = document.getElementById("content");
  const footerEl = document.getElementById("footer-id");
  footerEl.innerHTML =
    '<a href="https://tvmaze.com/"> Data is from: Tvmaze.com </a>';

  //clear everything before we start
  mainContentElem.innerHTML = " ";

  for (let i = 0; i < episodeList.length; i++) {
    let sectionElm = document.createElement("section");
    mainContentElem.appendChild(sectionElm);
    sectionElm.className = "section-style";

    let episodeNameEl = document.createElement("h4");
    sectionElm.appendChild(episodeNameEl);
    episodeNameEl.className = "title-background";

    let episodeImageEl = document.createElement("img");
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

/*
two main issues here 
1- duplication in header when selecting show =solved 
2- the default episodes are gameOf thrones from level 100 


*/
