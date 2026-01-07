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

function updateImageButton(count) {
  const btnSaveImage = document.querySelector("#save-image-btn");
  const textbeforeImg = document.querySelector("#text-before-img");

  const isMultiple = count > 1;
  btnSaveImage.textContent = isMultiple
    ? `Salvează toate imaginile (${count})`
    : "Salvează imaginea";
  textbeforeImg.textContent = isMultiple
    ? "Graficele generate:"
    : "Graficul generat:";
  btnSaveImage.style.display = "block";
}

function renderImage(imageBase64) {
  const plots = document.querySelector("#plots");
  const row = document.createElement("div");
  row.className = "d-flex justify-content-center";

  const img = document.createElement("img");
  img.src = "data:image/png;base64," + imageBase64;
  img.className = "img-fluid rounded shadow";

  row.appendChild(img);
  plots.appendChild(row);

  const count = document.querySelectorAll("#plots img").length;
  updateImageButton(count);
}

export { toggleInput, updateImageButton, saveImage, renderImage };
