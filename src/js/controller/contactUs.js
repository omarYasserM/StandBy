import "/src/views/contactUs/contactUs.css";
import "/src/views/templates.js";

const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("feedback-msg").style.display = "block";
});
