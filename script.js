//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  makeLiveSearch(allEpisodes);
  selectEpisode(allEpisodes);
}

function selectEpisode(episodes) {
  //preparing the elements for the container
  let headerEl = document.getElementById("header-id");
  let selectDivEl = document.createElement("div");
  headerEl.appendChild(selectDivEl);

  //creating select
  let selectEl = document.createElement("select");
  selectDivEl.appendChild(selectEl);

  //create one option for testing

  let option1 = document.createElement("option");
  option1.text = "Option 1";
  selectEl.add(option1);

  // insert the name for the option
  for (let i = 0; i < 1; i++) {
    option1.text = `${episodes[i].name} - S0${episodes[i].season}E0${episodes[i].number}`;
  }

  //what happend when the option is clicked

  option2.addEventListener("click", () => {
    makePageForEpisodes(episodes[1]);
  });
}

function makeLiveSearch(allEpisodes) {
  let searchBoxEl = document.createElement("input");
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

  for (let i = 0; i < 6; i++) {
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
