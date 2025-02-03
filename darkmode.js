let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('themeButton')

const enableDarkMode = () => {
    document.body.classList.remove("lightmode")
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')

}

const enableLightMode = () => {
    document.body.classList.remove('darkmode')
    document.body.classList.add('lightmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active"){
    enableDarkMode()
}
else {
    enableLightMode()
}


themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active")
    {
        enableDarkMode()
    }
    else
    {
        enableLightMode()
    }
})