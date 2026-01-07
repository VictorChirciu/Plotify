function getSelectedGraphType(dropItems) {
  let selectedType = "";
  dropItems.forEach((item, index) => {
    if (index > 0 && item.classList.contains("active")) {
      selectedType = item.textContent;
    }
  });
  return selectedType;
}

function validateInputs(typeInputs, dataInputs) {
  for (let i = 0; i < typeInputs.length; i++) {
    const type = typeInputs[i].value.trim();
    const dataValue = dataInputs[i].value.trim();
    const isValidList = /^\d+(\.\d+)?(,\d+(\.\d+)?)*$/.test(dataValue);

    if (
      (type === "" || !typeInputs[i].disabled) &&
      (dataValue === "" || !dataInputs[i].disabled)
    ) {
      return {
        valid: false,
        error: "Te rog completează și salvează tipul și datele!",
      };
    }
    if (type === "" || !typeInputs[i].disabled) {
      return {
        valid: false,
        error: "Te rog completează și salvează tipul de date!",
      };
    }
    if (dataValue === "" || !dataInputs[i].disabled) {
      return { valid: false, error: "Te rog completează și salvează datele!" };
    }
    if (!isValidList) {
      return {
        valid: false,
        error: "Formatul datelor este greșit! Folosește: 10,3.14,2.71",
      };
    }
  }
  return { valid: true };
}

function buildPayload(typeInputs, dataInputs, graphType) {
  const payload = [];
  for (let i = 0; i < typeInputs.length; i++) {
    payload.push({
      type: typeInputs[i].value.trim(),
      data: dataInputs[i].value.trim().split(",").map(Number),
      graphType: graphType,
    });
  }
  return payload;
}

export { getSelectedGraphType, validateInputs, buildPayload };
