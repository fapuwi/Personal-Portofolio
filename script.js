// ==== OSU PORTOFOLIO - JAVASCRIPT ==== //

// ==== 1. OSU LOGO -> OPEN / CLOSE NAVIGATION ==== //

const osuLogo = document.getElementById("osuLogo");
const osuNavigation = document.getElementById("osuNavigation");
osuLogo.addEventListener("click", function() {
    osuNavigation.classList.toggle("show");
});

