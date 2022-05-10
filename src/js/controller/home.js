import "/src/views/home/home.css";
import "/src/views/templates.js";
// import "../firebase/Auth.js";
import AOS from "/node_modules/aos/dist/aos.js";
import "/node_modules/aos/dist/aos.css";
AOS.init();

document.getElementById("categories-btn").addEventListener("click", () => {
  window.location = "./categories.html";
});
