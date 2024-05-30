const scriptContent = `
function getTimeSince(dateString) {
  const then = new Date(dateString);
  const now = new Date();
  const diffMs = now - then;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return \`Il y a \${days} jours \`;
  } else {
    return "Moins d'une journée";
  }
}

async function createFromSearch(string) {
  let searchResult = [];
  let Url = \`https://job-board-app-03c25eea5937.herokuapp.com/api/search/\${string}\`
  let body = document.body;
  body.style.padding = "40px";
  let ul = document.createElement("ul");
  ul.classList.add("jobOffers-container");
  //LINKER AVEC LE CSS FILE
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://job-board-app-sd.netlify.app/assets/index-DA_RiWcr.css";
  head.appendChild(link);
  try {
    const response = await fetch(Url);
    if (!response.ok) {
      let li = document.createElement("li");
      li.innerText = "No offers corresponding to that query";
      ul.appendChild(li);
      body.appendChild(ul);
    } else {
      let data = await response.json();
      searchResult = data;
      console.log(searchResult);
      for (let i = 0; i < searchResult.length; i++) {
        let li = document.createElement("li");
        li.classList.add("jobOffers");
        let a = document.createElement("a");
        a.classList.add("jobOffers_link");
        a.setAttribute(
          "href",
          \`https://job-board-app-sd.netlify.app/offers/\${searchResult[i]._id}\`
        );
        let divImg = document.createElement("div");
        divImg.classList.add("jobOffers_imageContainer");
        companyImg = document.createElement("img");
        companyImg.src = searchResult[i].image;
        companyImg.classList.add("jobOffers_image");
        divImg.appendChild(companyImg);
        let divLogo = document.createElement("div");
        divLogo.classList.add("logoContainer", "logoContainer-middle");
        let logoImg = document.createElement("img");
        logoImg.classList.add("logo");
        logoImg.src = searchResult[i].logo;
        divLogo.appendChild(logoImg);
        divImg.append(divLogo);
        a.appendChild(divImg);
        let divText = document.createElement("div");
        divText.classList.add("jobOffers-textContainer");
        let h2 = document.createElement("h2");
        h2.classList.add("company");
        h2.innerText = searchResult[i].company;
        divText.appendChild(h2);
        let h3 = document.createElement("h3");
        h3.classList.add("title", "title--underline");
        h3.innerText = searchResult[i].title;
        divText.appendChild(h3);
        /* TAGS  */
        let ulTags = document.createElement("ul");
        ulTags.classList.add("tagsContainer");
        //First
        let liFirstTag = document.createElement("li");
        liFirstTag.classList.add("tags");
        let liFirstImg = document.createElement("img");
        liFirstImg.src =
          "https://asset.cloudinary.com/dqhxldctm/e74ce5eb84e930f7cdd20966e2b205df";
        liFirstImg.classList.add("tag-img");
        liFirstTag.appendChild(liFirstImg);
        let liFirstP = document.createElement("p");
        liFirstP.innerText = "CDI";
        liFirstTag.appendChild(liFirstP);
        //SECOND
        let liSecondTag = document.createElement("li");
        liSecondTag.classList.add("tags");
        let liSecondImg = document.createElement("img");
        liSecondImg.src =
          "https://res.cloudinary.com/dqhxldctm/image/upload/fl_preserve_transparency/v1716911311/hrsjmqwrwyntu7kfeafh.jpg?_s=public-apps";
        liSecondImg.classList.add("tag-img");
        liSecondTag.appendChild(liSecondImg);
        let liSecondP = document.createElement("p");
        liSecondP.innerText = "Junior position";
        liSecondTag.appendChild(liSecondP);
        ulTags.appendChild(liSecondTag);
        //THIRD
        let liThirdTag = document.createElement("li");
        liThirdTag.classList.add("tags");
        let liThirdImg = document.createElement("img");
        liThirdImg.src =
          "https://res.cloudinary.com/dqhxldctm/image/upload/fl_preserve_transparency/v1716911292/doe8vjhhqig4x9u7bbim.jpg?_s=public-apps";
        liThirdImg.classList.add("tag-img");
        liThirdTag.appendChild(liThirdImg);
        let liThirdP = document.createElement("p");
        liThirdP.innerText = getTimeSince(searchResult[i].createdAt);
        liThirdTag.appendChild(liThirdP);
        ulTags.appendChild(liThirdTag);

        //ADDING THE TAGS
        divText.appendChild(ulTags);
        a.appendChild(divText);
        //Ajouter btn apply
        let buttonApply = document.createElement("button");
        buttonApply.classList.add("mobile-hidden", "btn-tuile");
        buttonApply.innerText = "Postuler";
        a.appendChild(buttonApply);

        //Ajouter icone leaf
        let imgLeaf = document.createElement("img");
        imgLeaf.src =
          "https://res.cloudinary.com/dqhxldctm/image/upload/fl_preserve_transparency/v1717061606/wa0bnp2yvzpsurus4h5w.jpg?_s=public-apps";
        imgLeaf.classList.add("mobile-hidden", "leaf-tuile");
        a.appendChild(imgLeaf);
        li.appendChild(a);
        ul.appendChild(li);
      }
      body.appendChild(ul);
    }
  } catch (error) {
    console.error(error);
  }
}

createFromSearch("${this.searchTerm}");

  `;
const blob = new Blob([scriptContent], { type: "text/javascript" });
const url = window.URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = "custom_script.js"; // Adjust filename as needed
link.click();

// Remove temporary URL after download (optional)
window.URL.revokeObjectURL(url);
