//json-server --watch db.json
Object.prototype.vietNamCurrencyConvert = function () {
  return this.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
/**
 * Course
 * Image
 * Title
 * Author
 * Rating
 * Price
 * bestSeller
 * buyAmount
 */
const endpoint = "http://localhost:3000/courses";
const formPost = document.querySelector(".form-post");
const courseList = document.querySelector(".course-list");
async function addCourse({
  title,
  author,
  image,
  rating,
  price,
  bestSeller,
  buyAmount,
}) {
  try {
    const res = await fetch("http://localhost:3000/courses", {
      method: "POST",
      body: JSON.stringify({
        image,
        title,
        author,
        rating,
        price,
        bestSeller,
        buyAmount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function renderItem(item) {
  const courseTemplate = `
  <div class="course-item">
            <div class="course-image">
                <img src="${item.image}" alt="" />
                <button class="course-remove" data-id=${item.id}>
                <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="course-content">
                <div class="course-title">
                    ${item.title}
                </div>
                <div class="course-author">${item.author}</div>
                <div class="course-meta">
                    <div class="course-rating">${item.rating}</div>
                    <div class="course-enroll">${item.buyAmount}</div>
                </div>
                <div className="course-price">${item.price.vietNamCurrencyConvert()}</div>
                ${
                  item.bestSeller
                    ? `<div class="course-best-seller">Best Seller</div>`
                    : ""
                }
                </div>
        </div>
  `;
  courseList.insertAdjacentHTML("afterbegin", courseTemplate);
}

async function getCourses() {
  try {
    const res = await fetch(endpoint, {
      method: "GET",
    });
    const data = await res.json();
    courseList.innerHTML = "";
    if (data.length > 0 && Array.isArray(data)) {
      data.forEach((item) => renderItem(item));
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const course = {
    image: this.elements["image"].value,
    title: this.elements["title"].value,
    author: this.elements["author"].value,
    rating: +this.elements["rating"].value,
    price: +this.elements["price"].value,
    bestSeller: this.elements["bestSeller"].checked,
    buyAmount: +this.elements["buyAmount"].value,
  };
  await addCourse(course);
  this.reset();
  await getCourses();
});

async function deleteCourse(id) {
  await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
}

courseList.addEventListener("click", async function (e) {
  if (e.target.matches(".course-remove")) {
    const id = +e.target.dataset.id;
    await deleteCourse(id);
    await getCourses();
  }
});
getCourses();
