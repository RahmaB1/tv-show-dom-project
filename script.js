/* 

DONE = Add a select input which allows you to choose which show you are interested in
When a show is selected, your app should display 
the episodes for that show as per the earlier levels of this challenge,
except that it should first fetch the episode list from the API - see below
You can get the list of shows by loading shows.js in your index.html and using the provided function: getAllShows()
Ensure that your search and episode selector controls still work correctly when you switch shows.
This show select must list shows in alphabetical order, case-insensitive.
*/

async function setup() {
  // const allEpisodes = getAllEpisodes();
  //fetch allEpisodes from API
  let allEpisodes = await fetchFromApi();
  let allShows = getAllShows();
  // let allEpisodes1 = await fetchFromApi1();
  selectShow(allShows);

  selectEpisode(allEpisodes);

  makePageForEpisodes(allEpisodes);
  makeLiveSearch(allEpisodes);
}

function selectShow(shows) {
  //preparing the elements for the container
  let headerEl = document.getElementById("header-id");
  let selectShowDivEl = document.createElement("div");
  headerEl.appendChild(selectShowDivEl);
  let selectTitleEl = document.createElement("h3");
  selectTitleEl.textContent = "Select Show...";
  selectShowDivEl.appendChild(selectTitleEl);
  let selectEl = document.createElement("select");
  selectShowDivEl.appendChild(selectEl);

  for (let i = 0; i < 10; i++) {
    // 1- create option 2-event listener 3- render the page out of for block

    let option = document.createElement("option");
    option.value = i;
    option.text = shows[i].name;

    selectEl.appendChild(option);
  }

  selectEl.addEventListener("click", function (event) {
    console.log("You clicked option " + event.target.value);
    //clear everything first
    let contentEl = document.getElementById("content");
    contentEl.innerHTML = "";
    //then show new content here
    let urlOfApi = shows[event.target.value]._links.self.href;
    contentEl.innerHTML = urlOfApi; //just to test if its working
    getEpisodesFromSelectedShow(urlOfApi); //will I need to pass the id as well
  });
}

async function getEpisodesFromSelectedShow(url) {
  //this function will fetch episodes based on the selected show
  // how can we know which show? I think ID yes and episodes from href
  let episodesFromShow = await fetchFromApi1(url);
  console.log(episodesFromShow);
  makePageForEpisodes(episodesFromShow);
  makeLiveSearch(episodesFromShow);
}

//make it for shows then try to make it general
async function fetchFromApi1(url) {
  try {
    const response = await fetch(url);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchFromApi() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function selectEpisode(episodes) {
  //preparing the elements for the container
  let headerEl = document.getElementById("header-id");
  let selectShowDivEl = document.createElement("div");
  selectShowDivEl.id = "select-div-el";
  headerEl.appendChild(selectShowDivEl);

  let selectTitleEl = document.createElement("h3");
  selectTitleEl.textContent = "Select...";
  selectShowDivEl.appendChild(selectTitleEl);
  let selectEl = document.createElement("select");
  selectShowDivEl.appendChild(selectEl);

  for (let i = 0; i < 10; i++) {
    // 1- create option 2-event listener 3- render the page out of for block
    //  1- create option = done
    let option = document.createElement("option");
    option.value = i;
    option.text = `${episodes[i].name} - S0${episodes[i].season}E0${episodes[i].number}`;

    // 2-event listener = still have issue here nothing is happened when clicking on any opiton
    //when changing to selectEl.addEventListener it is working but repeating the action xlength times

    selectEl.appendChild(option);
  }

  selectEl.addEventListener("click", function (event) {
    console.log("You clicked option " + event.target.value);
    //clear everything first
    let contentEl = document.getElementById("content");
    contentEl.innerHTML = "";
    //then show new content here

    let arrayTest = [episodes[event.target.value]];
    makePageForEpisodes(arrayTest);
  });
}

function makeLiveSearch(allEpisodes) {
  let searchBoxEl = document.createElement("input");
  searchBoxEl.placeholder = "Search here ......";
  let headerEl = document.getElementById("header-id");
  headerEl.appendChild(searchBoxEl);
  let displayFilteredEpisodeNumberP = document.createElement("p");
  headerEl.appendChild(displayFilteredEpisodeNumberP);

  searchBoxEl.addEventListener("input", function () {
    let searchedWords = searchBoxEl.value;
    // const allEpisodes = getAllEpisodes();
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
  footerEl.innerHTML = "Data is from https://tvmaze.com/"; //need to include it as a link

  //clear everything before we start - mostly for search
  mainContentElem.innerHTML = " ";

  for (let i = 0; i < episodeList.length; i++) {
    //Creating all the elements needed for each episode + append them
    // console.log(allEpisodesVar);
    let sectionElm = document.createElement("section");
    mainContentElem.appendChild(sectionElm);
    sectionElm.className = "section-style";

    let episodeNameEl = document.createElement("h3");
    sectionElm.appendChild(episodeNameEl);
    episodeNameEl.className = "title-background";

    let episodeImageEl = document.createElement("img");
    sectionElm.appendChild(episodeImageEl);

    let summaryEl = document.createElement("p");
    sectionElm.appendChild(summaryEl);

    //episode title
    let epiName = episodeList[i].name;
    let seasonNumber = episodeList[i].season;
    let episodeNumber = episodeList[i].number;

    episodeNameEl.textContent = `${epiName} - S0${seasonNumber}E0${episodeNumber}`;

    //episode image
    episodeImageEl.src = episodeList[i].image.medium;

    //episode summary
    summaryEl.innerHTML = episodeList[i].summary;
  }
}

window.onload = setup;
