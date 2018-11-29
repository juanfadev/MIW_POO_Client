import NetworkService from './NetworkService.mjs'


const phpURL = "https://miwpoophp.herokuapp.com/index.php";
const nodeURL = "http://localhost:3000";
const pythonURL = "https://miwpooflask.herokuapp.com";

NetworkService.baseUrl = phpURL;

document.addEventListener("DOMContentLoaded", () => {
    loadEntities();
});

document.getElementById("serverSelect").addEventListener("change", () => {
    switch (document.getElementById("serverSelect").value) {
        case "php":
            NetworkService.baseUrl = phpURL;
            break;
        case "node":
            NetworkService.baseUrl = nodeURL;
            break;
        case "python":
            NetworkService.baseUrl = pythonURL;
            break;
        default:
            NetworkService.baseUrl = phpURL;
            break;
    }
    removeCSSClassCurrent();
    loadEntities();
    document.getElementById("entitiesNav").parentNode.classList.add('current');
});


document.getElementById("entitiesNav").addEventListener("click", () => {
    removeCSSClassCurrent();
    loadEntities();
    document.getElementById("entitiesNav").parentNode.classList.add('current');
});

document.getElementById("landmarksNav").addEventListener("click", () => {
    removeCSSClassCurrent();
    loadLandmarks();
    document.getElementById("landmarksNav").parentNode.classList.add('current');

});

document.getElementById("placesNav").addEventListener("click", () => {
    removeCSSClassCurrent();
    loadPlaces();
    document.getElementById("placesNav").parentNode.classList.add('current');
});

function loadLandmarks() {
    console.log("Fetching data");
    NetworkService.getAllLandmarks()
        .then(data => {
            console.log(data);
            let articles = document.getElementById("articles");
            removeChildren(articles);
            try {
                data.forEach(j => loadArticle(j, data.indexOf(j)));
            } catch{
                loadArticle(data);
            }
        })
        .catch(reason => alert("Error on loading landmarks " + reason.message));

}

function loadPlaces() {
    console.log("Fetching data");
    NetworkService.getAllPlaces()
        .then(data => {
            console.log(data);
            let articles = document.getElementById("articles");
            removeChildren(articles);
            try {
                data.forEach(j => loadArticle(j, data.indexOf(j)));
            } catch{
                loadArticle(data);
            }
        })
        .catch(reason => alert("Error on loading landmarks " + reason.message));
}

function loadEntities() {
    console.log("Fetching data");
    NetworkService.getTemplates().then(data => {
        console.log(data);
        let articles = document.getElementById("articles");
        removeChildren(articles);
        data.forEach(j => loadEntity(j));
    }).catch(reason => alert("Error on loading entities " + reason.message))
}

function loadEntity(json) {
    let articles = document.getElementById("articles");
    let article = document.createElement('article');
    article.classList.add('box');
    article.classList.add('post');
    article.classList.add('post-excerpt');
    article.innerHTML = `<header>
    <h2><a href="#">${json['@type']}</a></h2><p>JSON-LD</p></header>`
    let text = document.createElement('textarea');
    text.value = JSON.stringify(json, undefined, 2);
    let button = document.createElement('input');
    button.type = "button";
    button.value = "Create";
    button.id = `create${json["@type"]}`
    article.appendChild(text);
    article.appendChild(button);
    articles.appendChild(article);
}

function loadArticle(json, id) {
    console.log("LoadArticles");
    console.log(json);
    console.log("ID:" +id);
    let articles = document.getElementById("articles");
    let article = document.createElement('article');
    article.classList.add('box');
    article.classList.add('post');
    article.classList.add('post-excerpt');
    article.innerHTML = `<header>
    <h2><a href="#">${json.name}</a></h2>
    <p>${json['@type']}</p>
    </header>
    <a href="#" class="image featured"><img src="${json.photo}" alt="${json.name}" /></a>
    <h3>Address: </h3>
    <ul>
        <li>
            Locality: ${json.address.addressLocality}
        </li>
        <li>
            Region: ${json.address.addressRegion}
        </li>
        <li>
            Country: ${json.address.addressCountry}
        </li>
    </ul>`
    let button = document.createElement('input');
    button.type = "button";
    button.value = "Edit";
    button.id = `edit${json["@type"]}`
    button.addEventListener("click", () => {
        loadEditForm(id);
    });
    let button2 = document.createElement('input');
    button2.type = "button";
    button2.value = "Delete";
    button2.id = `delete${json["@type"]}`
    button2.addEventListener("click", () => {
        deleteEntity(json, id);
    });
    article.appendChild(button);
    article.appendChild(button2);
    articles.appendChild(article);
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function removeCSSClassCurrent() {
    document.querySelector("nav > ul > li.current").classList.remove('current');
}

function loadEditForm(id) {
    NetworkService.getLandMark(id).then(json => {
        console.log(json);
        let articles = document.getElementById("articles");
        removeChildren(articles);
        let article = document.createElement('article');
        article.classList.add('box');
        article.classList.add('post');
        article.classList.add('post-excerpt');
        article.innerHTML = `<header>
        <h2><a href="#">Edit ${json['@type']} ${id}</a></h2><p>JSON-LD</p></header>`
        let text = document.createElement('textarea');
        text.id = `updateTextArea`;
        text.value = JSON.stringify(json, undefined, 2);
        let button = document.createElement('input');
        button.type = "button";
        button.value = "Update";
        button.id = `update${json["@type"]}`;
        button.addEventListener("click", () => {
            updateEntity(id);
        });
        article.appendChild(text);
        article.appendChild(button);
        articles.appendChild(article);
    }).catch(reason => alert("Error on loading entities " + reason.message))
}

function deleteEntity(json, id) {
    if (window.confirm(`Do you really want to update ${json["@type"]}/${id}?`)) {
        switch (json["@type"]) {
            case "LandmarksOrHistoricalBuildings":
                NetworkService.deleteLandMark(json, id).then((a) => {
                    alert("Deleted landmark.");
                    removeCSSClassCurrent();
                    loadLandmarks();
                    document.getElementById("landmarksNav").parentNode.classList.add('current');
                });
                break;
            case "Places":
                NetworkService.deletePlace(json, id)
                break;
            default:
                alert("No entity could be deleted.");
                break;
        }
    }
}

function updateEntity(id) {
    let json = JSON.parse(document.getElementById("updateTextArea").value);
    switch (json["@type"]) {
        case "LandmarksOrHistoricalBuildings":
            NetworkService.putLandMark(json, id);
            alert("Updated landmark.");
            removeCSSClassCurrent();
            loadLandmarks();
            document.getElementById("landmarksNav").parentNode.classList.add('current');
            break;
        case "Places":
            NetworkService.putPlace(json, id)
            break;
        default:
            alert(`No entity ${json["@type"]} could be updated.`);
            break;
    }
}
