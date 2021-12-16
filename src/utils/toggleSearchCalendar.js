export function openToggle() {
    document.getElementById("toggle-content").style.top = "0";
    // document.getElementById("toggleOpen").style.display = "none";
    // document.getElementById("toggleClose").style.display = "flex";
}
  
export function closeToggle() {
    document.getElementById("toggle-content").style.top = "-1000px";
    // document.getElementById("toggleClose").style.display = "none";
    // document.getElementById("toggleOpen").style.display = "flex";
}
