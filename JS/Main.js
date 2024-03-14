import * as components from "./Eshada.js"

// Start Showing Pop up
let teatcher = document.getElementById("taetchers")

function mainbtn(para , pop){
    let contnet = document.getElementById("content")
    let popup = document.getElementById(pop)
    para.addEventListener("click" , function(e){
        e.preventDefault()
        popup.style.display = "flex"
        popup.style.opacity = "1"
        contnet.style.display = "none"
    })
    let backbtn = document.getElementById(`${pop}Back`);
    backbtn.addEventListener("click" , function(e){
        popup.style.display = "none"
        contnet.style.display = "flex"
    })
}
mainbtn(teatcher , "teatcherPop")
// End Showing Pop up


let allpop = document.querySelectorAll(".pop")
let accpetUser = document.createElement("div")
accpetUser.classList.add("accpetUser")
let accpetIcon = document.createElement("i")
accpetIcon.classList.add("fa-solid" , "fa-check")
accpetUser.appendChild(accpetIcon)

// add Enter key Event
function enterKeyEvent(field , button) {
    field.onkeydown = function (e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            button.click()
        }
    };   
}


// Start teatchers Login
let teatcherLink = document.getElementById("teatcherLink")
let teatcherUsers = []
let teatcherSub = document.getElementById("teatcherSub")
let teatcherField = document.getElementById("teatcherId");
let popcon = document.querySelectorAll(".pop .container")

teatcher.addEventListener("click" , ()=> teatcherField.focus())
// Get User's from Database
// GitHub
fetch("https://thfid.github.io/DataBase/Teatchers.json")
// fetch("../DataBase/Teatchers.JSON")
.then(
    res=>res.json()
).then(res=>res.map(e=>{
    teatcherUsers.push(e.userName)
}))

// Add event to submit button
teatcherSub.addEventListener("click" , function(e){
    e.preventDefault();
new Promise((res , rej) =>{
    // Check if the user correct
    if (teatcherUsers.includes(teatcherField.value)){
       res()
    } else rej()
})
    .then((res)=>{
    // Add animetion of Accessble user
    popcon.forEach(e=> e.style.animation =  "FadgeOut 0.3s linear 0.1s  forwards")
    allpop.forEach(e=> {
        e.prepend(accpetUser)
        accpetUser.style.cssText=`
        display: flex;
        animation: Fadgein 0.3s linear 0.8s forwards ; `
        sessionStorage.setItem("User" , teatcherField.value)
    })})
        .then((res,rej)=>{
            // Moving to Teacher page
            setTimeout(function(){
            teatcherLink.click();
            },1500)})
        .catch(rej=>{
           components.popup("warning" , "خطأ في إسم المستخدم")
        })
})
enterKeyEvent(teatcherField , teatcherSub)
// End teatchers Login

console.log("337406");