const validarFormulario = (data) => {
    return Object.entries(data).every(([key, value]) => {
      if (key === "img") return true;
      return value !== "";
    });
};