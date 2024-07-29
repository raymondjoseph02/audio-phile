const hamMenu = document.querySelector('.ham-menu');
const offScreen = document.querySelector(".nav-links");
const hamBurger = document.querySelector(".ham-buger")
const body = document.querySelector("body")
const allLinks = document.querySelectorAll('a')
console.log(allLinks);
hamMenu.addEventListener("click", ()=>{
    hamMenu.classList.toggle("active")
    offScreen.classList.toggle("active")
    hamBurger.classList.toggle("ps-fixed")
    body.classList.toggle("position-fixed")
});
allLinks.forEach((eachlink)=>{
    eachlink.addEventListener('click',function(event){
        event.target.classList.toggle('visited')
    })
})
window.addEventListener('pageshow', function() {
    allLinks.forEach(link => {
      link.classList.remove('visited');
    });
  });