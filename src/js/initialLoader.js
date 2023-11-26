/*******************************************************/
/**** LOADER PARA CARGAR EL CÓDIGO VUE AL DOCUMENTO ***/
/*****************************************************/
window.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loaderContainer");
    let content = document.querySelectorAll(".hidde");
    setTimeout(() => {
      loader.style.display = "none";
      content.forEach((element) => {
        element.classList.remove("hidde");
      });
    }, 2000);
  });