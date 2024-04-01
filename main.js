import { buttonsData, menu } from "./db.js";
import { elements } from "../helpers.js";
import { calculatePrice } from "./helpers.js";

document.addEventListener("DOMContentLoaded", () => {
    renderMenuItems(menu);
    renderButtons();
});
elements.buttonsArea.addEventListener("click", searchCategory);

function renderMenuItems(menuItems) {
    let menuHTML = menuItems.map((item) => {
        return `
    <a
    href="productDetail.html?id=${item.id}"
    class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
    id="card"
  >
    <img src=${item.img} alt="" class="rounded shadow" />
    <div>
      <div class="d-flex justify-content-between">
        <h5>${item.title}</h5>
        <p class="text-success">${calculatePrice(item.price)}$</p>
      </div>
      <p class="lead">
      ${item.desc}
      </p>
    </div>
  </a>
    `;
    });
    menuHTML = menuHTML.join("");
    elements.mainArea.innerHTML = menuHTML;
}

function searchCategory(e) {
    const category = e.target.dataset.category;
    const fitredMenu = menu.filter((item) => item.category === category);

    if (category === "all") {
        renderMenuItems(menu);
    } else {
        renderMenuItems(fitredMenu);
    }
    renderButtons(category);
}

function renderButtons(active) {
    elements.buttonsArea.innerHTML = "";
    buttonsData.forEach((btn) => {
        const buttonEl = document.createElement("button");
        buttonEl.className = "btn btn-outline-dark filter-btn";
        buttonEl.textContent = btn.text;
        buttonEl.dataset.category = btn.value;

        if (btn.value === active) {
            buttonEl.classList.add("bg-dark", "text-light");
        }

        elements.buttonsArea.appendChild(buttonEl);
    });
}
