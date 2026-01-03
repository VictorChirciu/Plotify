// Variables
const btnFirstChoice = document.querySelector("#btn-first-choice");
const btnSecondChoice = document.querySelector("#btn-second-choice");
const btnThirdChoice = document.querySelector("#btn-third-choice");
const choiceOutput = document.querySelector("#choice-output");
const textbeforeImg = document.querySelector("#text-before-img");
const btnSaveImage = document.querySelector("#save-image-btn");

const firstInputContainer = document.querySelector(".first-input-container");
const secondInputContainer = document.querySelector(".second-input-container");
const thirdInputContainer = document.querySelector(".third-input-container");

// Functions
function shareChecker(container) {
  const typeInputs = container.querySelectorAll(".type-input");
  const dataInputs = container.querySelectorAll(".data-input");
  const outputData = container.querySelector(".output-data");
  const btnShare = container.querySelector(".btn-share-data");
  const dropItems = container.querySelectorAll(".dropdown-item");
  const plots = document.querySelector("#plots");
  let payload = [];
  let isGraphTypeSelected = false;
  let selectedGraphType = "";

  dropItems.forEach((item, index) => {
    if (index > 0 && item.classList.contains("active")) {
      isGraphTypeSelected = true;
      selectedGraphType = item.textContent;
    }
  });

  if (!isGraphTypeSelected) {
    outputData.textContent = "Te rog selectează tipul graficului!";
    outputData.style.color = "red";
    return;
  }

  for (let i = 0; i < typeInputs.length; i++) {
    const type = typeInputs[i].value.trim();
    const dataValue = dataInputs[i].value.trim();
    const isValidList = /^\d+(\.\d+)?(,\d+(\.\d+)?)*$/.test(dataValue);

    if (
      (type === "" || !typeInputs[i].disabled) &&
      (dataValue === "" || !dataInputs[i].disabled)
    ) {
      outputData.textContent =
        "Te rog completează și salvează tipul și datele!";
      outputData.style.color = "red";
      return;
    }
    if (type === "" || !typeInputs[i].disabled) {
      outputData.textContent = "Te rog completează și salvează tipul de date!";
      outputData.style.color = "red";
      return;
    }
    if (dataValue === "" || !dataInputs[i].disabled) {
      outputData.textContent = "Te rog completează și salvează datele!";
      outputData.style.color = "red";
      return;
    }
    if (!isValidList) {
      outputData.textContent =
        "Formatul datelor este greșit! Folosește: 10,3.14,2.71";
      outputData.style.color = "red";
      return;
    }

    payload.push({
      type,
      data: dataValue.split(",").map(Number),
      graphType: selectedGraphType,
    });
  }

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
        const row = document.createElement("div");
        row.className = "d-flex justify-content-center";

        const img = document.createElement("img");
        img.src = "data:image/png;base64," + data.image;
        img.className = "img-fluid rounded shadow";
        row.appendChild(img);
        plots.appendChild(row);

        textbeforeImg.textContent = "Graficele generate:";
        btnSaveImage.style.display = "block";
        clearInputFields(container);
      } else {
        outputData.textContent = "Eroare la generarea graficului.";
        outputData.style.color = "red";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  outputData.textContent = "Datele au fost trimise cu succes!";
  outputData.style.color = "green";
  btnShare.textContent = "Date trimise";
  btnShare.disabled = true;

  const allButtons = container.querySelectorAll(
    ".btn-checker-type, .btn-checker-data"
  );
  allButtons.forEach((btn) => (btn.disabled = true));

  console.log("Payload:", payload);
}

function toggleInput(input, button, container) {
  const btnShare = container.querySelector(".btn-share-data");

  if (btnShare.disabled) return;

  input.disabled = !input.disabled;
  button.textContent = input.disabled ? "Modifică" : "Salvează";
}

function saveImage() {
  const images = document.querySelectorAll("#plots img");

  if (images.length === 0) return;

  images.forEach((img, index) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `plotify_graph_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

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
