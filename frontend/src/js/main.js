import {
  getSelectedGraphType,
  validateInputs,
  buildPayload,
} from "./validation.js";
import { clearInputFields, setupContainer } from "./interface.js";
import { renderImage, saveImage } from "./utils.js";

const btnFirstChoice = document.querySelector("#btn-first-choice");
const btnSecondChoice = document.querySelector("#btn-second-choice");
const btnThirdChoice = document.querySelector("#btn-third-choice");
const choiceOutput = document.querySelector("#choice-output");

const firstInputContainer = document.querySelector(".first-input-container");
const secondInputContainer = document.querySelector(".second-input-container");
const thirdInputContainer = document.querySelector(".third-input-container");

export function shareChecker(container) {
  const typeInputs = container.querySelectorAll(".type-input");
  const dataInputs = container.querySelectorAll(".data-input");
  const outputData = container.querySelector(".output-data");
  const dropItems = container.querySelectorAll(".dropdown-item");

  const selectedGraphType = getSelectedGraphType(dropItems);
  if (!selectedGraphType) {
    outputData.textContent = "Te rog selectează tipul graficului!";
    outputData.style.color = "red";
    return;
  }

  const validation = validateInputs(typeInputs, dataInputs);
  if (!validation.valid) {
    outputData.textContent = validation.error;
    outputData.style.color = "red";
    return;
  }

  const payload = buildPayload(typeInputs, dataInputs, selectedGraphType);
  console.log("Payload:", payload);

  fetch("http://127.0.0.1:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.image) {
        renderImage(data.image);
        clearInputFields(container);
        outputData.textContent = "Datele au fost trimise!";
        outputData.style.color = "green";
      } else {
        outputData.textContent = "Eroare la generarea graficului.";
        outputData.style.color = "red";
      }
    })
    .catch((error) => {
      console.error("Caught Error:", error);
      outputData.textContent = "Eroare la generarea graficului.";
      outputData.style.color = "red";
    });
}

setupContainer(firstInputContainer);
setupContainer(secondInputContainer);
setupContainer(thirdInputContainer);

btnFirstChoice.addEventListener("click", () => {
  secondInputContainer.classList.remove("d-flex");
  thirdInputContainer.classList.remove("d-flex");
  firstInputContainer.classList.toggle("d-flex");
  choiceOutput.textContent = firstInputContainer.classList.contains("d-flex")
    ? "Ai ales să introduci un singur tip de date."
    : "";
});

btnSecondChoice.addEventListener("click", () => {
  firstInputContainer.classList.remove("d-flex");
  thirdInputContainer.classList.remove("d-flex");
  secondInputContainer.classList.toggle("d-flex");
  choiceOutput.textContent = secondInputContainer.classList.contains("d-flex")
    ? "Ai ales să introduci două tipuri de date."
    : "";
});

btnThirdChoice.addEventListener("click", () => {
  firstInputContainer.classList.remove("d-flex");
  secondInputContainer.classList.remove("d-flex");
  thirdInputContainer.classList.toggle("d-flex");
  choiceOutput.textContent = thirdInputContainer.classList.contains("d-flex")
    ? "Ai ales să introduci trei tipuri de date."
    : "";
});

const btnSaveImage = document.querySelector("#save-image-btn");
btnSaveImage.addEventListener("click", saveImage);
