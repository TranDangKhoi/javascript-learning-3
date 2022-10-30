async function addPost(title, author) {
  try {
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const formPost = document.querySelector(".form-post");
formPost.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = this.elements["title"].value;
  const author = this.elements["author"].value;
  addPost(title, author);
});
