// div where profile information will appear
const overview = document.querySelector(".overview");
const username = "bh-codes";
// ul to display the repos list
const repoList = document.querySelector(".repo-list");
//section where all repo info appears
const  repoInfoSection = document.querySelector(".repos");
//section where individual repo data will appear
const repoData = document.querySelector(".repo-data");


const profileInfo = async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayInfo(data);
};

profileInfo();

const displayInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);
  repos();
};

const repos = async function() {
    const getRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await getRepo.json();
    console.log(data)
    displayRepo(data);
};

const displayRepo = function(repo) {
    for (const item of repo) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(li);
    };
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepo(repoName);
    };
});

const specificRepo = async function(repoName) {
    const data = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await data.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    
    const languages = [];
    for (const key in languageData) {
        languages.push(key);
    };
    displaySpecificRepo(repoInfo, languages)
};

const displaySpecificRepo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoInfoSection.classList.add("hide");
};