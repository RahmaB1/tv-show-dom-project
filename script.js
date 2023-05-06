//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const mainContentElem = document.getElementById("content");

  // declare classes to style the whole view of the page

  for (let i = 0; i < 1; i++) {
    //Creating all the elements needed for each episode + append them
    // console.log(allEpisodesVar);
    let sectionElm = document.createElement("section");
    mainContentElem.appendChild(sectionElm);

    let episodeNameEl = document.createElement("h3");
    sectionElm.appendChild(episodeNameEl);

    //let seasonNumberEl = ;
    //episodeNumberEl = ;
    //will get it then add it with the name in h3 ;

    let episodeImageEl = document.createElement("img");
    sectionElm.appendChild(episodeImageEl);

    let summaryEl = document.createElement("p");
    sectionElm.appendChild(summaryEl);

    //episode title
    let epiName = episodeList[i].name;
    let seasonNumber = episodeList[i].season;
    let episodeNumber = episodeList[i].number;

    episodeNameEl.textContent = `${epiName} - 0${seasonNumber}0${episodeNumber}`;

    //episode image
    episodeImageEl.src = episodeList[i].image.medium;

    //episode summary
    summaryEl.innerHTML = episodeList[i].summary;
  }

  //   the episode's name
  // the season number
  // the episode number
  // the episode's medium-sized image
  // the episode's summary text
}

window.onload = setup;

//from Michael

// function makePageForEpisodes(episodeList) {
// const rootElem = document.getElementById("root");
// for (let i = 0; i < 5; i++) {
// let mySectionElement = document.createElement("section");
// let myH3Element = document.createElement("h2");
// myH3Element.textContent = `My Section Title ${i + 1}`;
// mySectionElement.appendChild(myH3Element);
// rootElem.appendChild(mySectionElement);
// }
// }
