async function setup() {
  // const allEpisodes = getAllEpisodes();
  //fetch allEpisodes from API
  let allEpisodes = await fetchFromApi();
  makePageForEpisodes(allEpisodes);
  makeLiveSearch(allEpisodes);
  selectEpisode(allEpisodes);
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
  let selectDivEl = document.createElement("div");
  headerEl.appendChild(selectDivEl);

  let selectTitleEl = document.createElement("h3");
  selectTitleEl.textContent = "Select...";
  selectDivEl.appendChild(selectTitleEl);
  let selectEl = document.createElement("select");
  selectDivEl.appendChild(selectEl);

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
