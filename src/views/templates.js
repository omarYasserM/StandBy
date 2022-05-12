import "../index.css";
// import { MenuStore } from "../js/controller/state.js";
import { Store } from "../js/controller/state.js";
import "@fortawesome/fontawesome-free/css/all.css";
import { logOut } from "../js/firebase/Auth";

let MenuStore = new Store(false);
/**
 *
 * @param {String} text what to display on the CTA header button
 * @param {Function} callback what to do when the button is clicked
 */
export const setHeaderCTA = (
  text = "Log out",
  callback = () => {
    logOut();
  }
) => {
  const ctaButton = document.querySelector("#header-cta-btn");
  ctaButton.innerHTML = text;
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      callback();
    });
  }
};

const header = document.querySelector(".header");
if (header) {
  header.innerHTML = `
   <header>   
    <a href="./"><span class="logo">StandBy</span></a>
    <ul>
        <li><a href="./">Home</a></li>
        <li><a href="./profile.html">Profile</a></li>
        <div>
            <li><a href="./categories.html">Career paths</a></li>
            <ul class="dropdown-content">
                <li><a href="./categories.html?Programming">Programming</a></li>
                <li><a href="./categories.html?Computer%20networks">Computer networks</a></li>
                <li><a href="./categories.html?Accounting">Accounting</a></li>
                <li><a href="./categories.html?Graphic%20design">Graphic design</a></li>
                <li><a href="./categories.html?Language">Language</a></li>
                
                
            </ul>
        </div>
        <li><a href="#" id="header-cta-btn">Log out</a></li>
    </ul>
    <i class="fa fa-bars navmenu" id="hamburger" aria-hidden="true"></i>
    </header>
    `;

  document.querySelector("#hamburger").addEventListener("click", () => {
    if (MenuStore.state == false) MenuStore.setState(true);
    else MenuStore.setState(false);
  });
}

const toggleMenu = () => {
  if (MenuStore.state == true)
    document.querySelector("header > ul").style.top = "0px";
  else document.querySelector("header > ul").style.top = "-300px";
};

MenuStore.addListener(toggleMenu);

const footer = document.querySelector(".footer");
if (footer) {
  footer.innerHTML = `<footer>   
   
  <span class="logo">StandBy</span>
  <div class="container">
      <div>
      <span><a href="./#about">About</a></span>
          <p>What is StandBy</p>
      </div>
      <div>
          <span><a href="./#about">Contact us</a></span>
          <p>Your feedback matter</p>
      </div>
      <div>
          <span><a href="./#about">Guide</a></span>
          <p>How to use StandBy</p>
      </div>
  </div>
  <p></p>
  <div class="footer_social_media">
      <a href="https://www.facebook.com" target="_blank"><i class="fa-brands fa-facebook"></i></a>
      <a href="https://twitter.com" target="_blank"><i class="fa-brands fa-twitter"></i></a>
      <a href="https://www.linkedin.com" target="_blank"><i class="fa-brands fa-linkedin"></i></i></a>
      <a href="https://github.com" target="_blank"><i class="fa-brands fa-github"></i></a>
      <a href="https://www.instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></i></a>
      <a href="https://mail.google.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>
  </div>
  <p class="copyright">StandBy &copy; to Great Team.</p>


</footer>`;
}

/**
 *
 * @param {String} innerHTML the HTML you want inside the alert
 * @param {Function} callback the function to execute after user press ok(if needed)
 * @param {String} buttonText the text of the Alert button
 */
export const makeAlert = (
  innerHTML,
  buttonText = "OK",
  callback = () => {}
) => {
  const alert = document.createElement("div");
  alert.className = "alert";
  alert.innerHTML = `
    <div class="alertbox">
    ${innerHTML}
    <button>${buttonText}</button>
    </div>`;
  document.body.appendChild(alert);
  document.querySelector(".alertbox > button").addEventListener("click", () => {
    document.body.removeChild(alert);
    callback();
  });
};

//this is a video snippet, to reuse
{
  /* 
  <div class="video"> 
  <a target="_blank" href="link here" >
    <img src="img src" alt="Title here">
    <span>Title Here</span>
  </a>
</div> */
}

document.body.style.display = "block";
