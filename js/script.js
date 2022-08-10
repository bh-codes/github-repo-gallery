// div where profile information will appear
const overview = document.querySelector(".overview");
const username = "bh-codes";
// ul to display the repos list
const repoList = document.querySelector(".repo-list");

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
    const getRepo = await fetch (`https://api.github.com/users/${username}/repos`);
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