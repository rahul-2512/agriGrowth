// STICKY

const onScrollfn = () => {
  var scroll = window.scrollY;
  let sticky = document.querySelector(".sticky");
  if (sticky) {
    scroll >= 50
      ? sticky.classList.add("nav-sticky")
      : sticky.classList.remove("nav-sticky");
  }
};
