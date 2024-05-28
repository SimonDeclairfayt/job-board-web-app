export async function createFromSearch(string) {
  let searchResult = [];
  let Url = `http://localhost:3333/api/search/${string}`;
  let body = document.body;
  let ul = document.createElement("ul");
  try {
    const response = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      let li = document.createElement("li");
      li.innerText = "No offers corresponding to that query";
      ul.appendChild(li);
      body.appendChild(ul);
    } else {
      searchResult = [...response];
      for (let i = 0; i < searchResult.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute(
          "href",
          `http:localhost:5173/offers/${searchResult[i]._id}`
        );
        let h2 = document.createElement("h2");
        h2.innerText = searchResult[i].company;
        a.appendChild(h2);
        let p = document.createElement("p");
        p.innerText = searchResult[i].title;
        ul.appendChild(li);
      }
      body.appendChild(ul);
    }
  } catch (error) {
    console.error(error);
  }
}
