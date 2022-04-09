const header = document.querySelector(".header");
if (header) {
  header.innerHTML = `
   <header>   
    <a href="#"><span class="logo">StandBy</span></a>
    <ul>
        <li><a href="./home.html">Home</a></li>
        <li><a href="#">Courses</a></li>
        <div>
            <li><a href="./categories.html">Career paths</a></li>
            <ul class="dropdown-content">
                <li><a href="#">IT</a></li>
                <li><a href="#">Programming</a></li>
                <li><a href="#">Computer networks</a></li>
                <li><a href="#">Accounting</a></li>
                <li><a href="#">Graphic design</a></li>
                <li><a href="#">Language</a></li>
                
            </ul>
        </div>
        <li><a href="#" class="logout">Log out</a></li>
    </ul>
    <i class="fa fa-bars navmenu" aria-hidden="true"></i>
    </header>
    `;
}

const footer = document.querySelector(".footer");
if (footer) {
  footer.innerHTML = `<footer>   
   
  <span class="logo">StandBy</span>
  <div class="container">
      <div>
          <span>About</span>
          <p>What is StandBy</p>
      </div>
      <div>
          <span>Contact us</span>
          <p>Your feedback matter</p>
      </div>
      <div>
          <span>Guide</span>
          <p>How to use StandBy</p>
      </div>
  </div>
  <p></p>
  <div class="footer_social_media">
      <a href="https://www.facebook.com" target="_blank"><i class="fa fa-fw fa-facebook"></i></a>
      <a href="https://twitter.com" target="_blank"><i class="fa fa-fw fa-twitter"></i></a>
      <a href="https://www.linkedin.com" target="_blank"><i class="fa fa-fw fa-linkedin"></i></a>
      <a href="https://github.com" target="_blank"><i class="fa fa-fw fa-github"></i></a>
      <a href="https://www.instagram.com" target="_blank"><i class="fa fa-fw fa-instagram"></i></a>
      <a href="https://mail.google.com" target="_blank"><i class="fa fa-fw fa-envelope"></i></a>
  </div>
  <p class="copyright">StandBy &copy; to Great Team.</p>


</footer>`;
}
