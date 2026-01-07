import { shareChecker } from "./main.js";
import { toggleInput } from "./utils.js";

function clearInputFields(container) {
  const typeInputs = container.querySelectorAll(".type-input");
  const dataInputs = container.querySelectorAll(".data-input");
  const typeButtons = container.querySelectorAll(".btn-checker-type");
  const dataButtons = container.querySelectorAll(".btn-checker-data");
  const btnShare = container.querySelector(".btn-share-data");
  const outputData = container.querySelector(".output-data");
  const btnDropdown = container.querySelector(".btn-dropdown");
  const dropItems = container.querySelectorAll(".dropdown-item");

  typeInputs.forEach((input) => {
    input.value = "";
    input.disabled = false;
  });

  dataInputs.forEach((input) => {
    input.value = "";
    input.disabled = false;
  });

  typeButtons.forEach((btn) => {
    btn.textContent = "Salvează";
    btn.disabled = false;
  });

  dataButtons.forEach((btn) => {
    btn.textContent = "Salvează";
    btn.disabled = false;
  });

  btnShare.textContent = "Trimite datele";
  btnShare.disabled = false;
  outputData.textContent = "";
  btnDropdown.textContent = "Tipul graficului";

  dropItems.forEach((item, index) => {
    item.classList.remove("active", "disabled");
    if (index === 0) {
      item.classList.add("active", "disabled");
    }
  });
}

function setupContainer(container) {
  const typeButtons = container.querySelectorAll(".btn-checker-type");
  const dataButtons = container.querySelectorAll(".btn-checker-data");
  const typeInputs = container.querySelectorAll(".type-input");
  const dataInputs = container.querySelectorAll(".data-input");
  const btnShare = container.querySelector(".btn-share-data");
  const btnDropdown = container.querySelector(".btn-dropdown");
  const dropItems = container.querySelectorAll(".dropdown-item");

  dropItems.forEach((item) => {
    item.addEventListener("click", () => {
      dropItems.forEach((item) => item.classList.remove("active", "disabled"));
      item.classList.add("active", "disabled");
      btnDropdown.textContent = item.textContent;
    });
  });

  typeButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleInput(typeInputs[index], btn, container);
    });
  });

  dataButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleInput(dataInputs[index], btn, container);
    });
  });

  btnShare.addEventListener("click", () => {
    shareChecker(container);
  });
}

export { clearInputFields, setupContainer };
