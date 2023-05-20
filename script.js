async function setup() {
  let allShows = getAllShows();
  let urlForApi = `${allShows[0]._links.self.href}/episodes`;
  let allEpisodes = await fetchFromApi1(urlForApi); //this line might be usfule when passing url to make it general ...let urlOfApi = `${shows[event.target.value]._links.self.href}/episodes`;
  makePageForShows(allShows, allEpisodes);
  // selectShow(allShows);
  // selectEpisode(allEpisodes);
  // makePageForEpisodes(allEpisodes);
  // makeLiveSearch(allEpisodes);
}

function makePageForShows(shows, episodes) {
  /*When your app starts, present a listing of all shows ("shows listing")
For each show, you must display at least
name, image, summary, genres, status, rating, and runtime.*/

  const mainContentElem = document.getElementById("content");

  //clear everything before we start
  mainContentElem.innerHTML = " ";

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
    // summaryEl.style.padding="0rem"
    // summaryEl.style.topMargin="50px";
    bottomSectionEl.appendChild(summaryEl);

    let innerSection = document.createElement("section");
    innerSection.className = "inner-section";
    bottomSectionEl.appendChild(innerSection);

    // genres, status, rating, and runtime.*/

    let ratingEl = document.createElement("p");
    innerSection.appendChild(ratingEl);

    let genresEl = document.createElement("p");
    innerSection.appendChild(genresEl);

    let statusEl = document.createElement("p");
    innerSection.appendChild(statusEl);

    let runtimeEl = document.createElement("p");
    innerSection.appendChild(runtimeEl);

    // let epiName = shows[i].name;
    // let seasonNumber = shows[i].season;
    // let episodeNumber = shows[i].number;
    episodeNameEl.textContent = shows[i].name;
    episodeImageEl.src = shows[i].image.medium;
    episodeImageEl.style.height = "10rem";

    summaryEl.innerHTML = shows[i].summary;

    ratingEl.innerHTML = `<strong>Rated: </strong> ${shows[i].rating.average}`;
    genresEl.innerHTML = `<strong>Genres: </strong> ${shows[i].genres}`;
    statusEl.innerHTML = `<strong>Status: </strong> ${shows[i].status}`;
    runtimeEl.innerHTML = `<strong>Runtime: </strong> ${shows[i].runtime}`;

    /*

    When a show name is clicked, your app should:
    fetch and present episodes from that show (enabling episode search and selection as before)
    hide the "shows listing" view.

    */

    sectionElm.addEventListener("click", (event) => {
      // when this show clicked I want to call makepages for episodes using the id maybe
      // let showId= shows[i].id;
      // let clickedShow = episodes.filter((episode) => {
      //   return episode.id === shows[i].id;
      // });
      // console.log(clickedShow);
      // let urlOfApi = `${shows[event.id]._links.self.href}/episodes`;
      // getEpisodesFromSelectedShow(urlOfApi);
      console.log(`http://api.tvmaze.com/episodes/${shows[i].id}`);
      // getEpisodesFromSelectedShow(`"http://api.tvmaze.com/episodes/"${shows[i].id}`);
      // );
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
solved = 1- duplication in header when selecting show =solved 
2- the default episodes are gameOf thrones from level 100 


*/
