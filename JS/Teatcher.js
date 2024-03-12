import HijriJS from "./Hijri.js"
import * as components from "./Eshada.js"

let users =[]
// GitHub
fetch("https://thfid.github.io/DataBase/Teatchers.json")
// fetch("../DataBase/Teatchers.JSON")
.then(res=>res.json())
.then(res=>res.map(e=>users.push(e)))
.then(res=>{
    users.map(e=>{
        if ( sessionStorage.getItem("User") == e.userName){
            let user = document.getElementById("user-welcome")
            user.innerText = `مرحبا ب${e.position == "Teatcher" ? "الأستاذ" : "المدير"} ${e.name.split(" ")[0].replace("_" , " ")}`
        }
    })
})

function addOverLay(){
    let lay = document.createElement("div")
    lay.classList.add("overlay")
    document.body.appendChild(lay)
    lay.style.animation = "Fadgeinhalf 0.3s linear 0.1s forwards"
}

let arrayOfStudints = [];
if (localStorage.getItem("Studint")){
    arrayOfStudints = JSON.parse(localStorage.getItem("Studint"));
}

// Start Studint DataBase
function addStudint(name , id , phone , age ,current , pId , pPhone , teatcher ){
    let studint = {[`${id}`] :{
        studintName: name,
        studintId:id,
        studintPhone:phone,
        studintAge:age,
        currentSurah:current,
        parentId:pId,
        parentPhone:pPhone,
        teatcher:teatcher,
        state:true,
        registerDate : HijriJS.today().toString()
    }}
    arrayOfStudints.push(studint)
}

// Start adding a studint
let addbtn = document.getElementById("new-studint")
addbtn.onclick = function(){
    // Overlay and woindow
    addOverLay()
    let addwindow = document.createElement("div")
    addwindow.classList.add("add-window")
    document.body.appendChild(addwindow)
    addwindow.style.animation = "Fadgein 0.3s linear 0.1s forwards"

    // Add label to window
    let winlabel = document.createElement("div")
    winlabel.classList.add("win-label")
    winlabel.appendChild(document.createTextNode("إضافة طالب"))
    addwindow.appendChild(winlabel)
    
    // Add forms
    let form = document.createElement("form")
    // Add inputs & labels
    form.innerHTML=`
    <div class="handel">
    <label for="studint-name">اسم الطالب الرباعي</label>
    <input type="text" id="studint-name">
    </div>

    <div class="handel">
    <label for="studint-id">رقم هوية الطالب</label>
        <input type="text" id="studint-id">
    </div>

    <div class="handel">
    <label for="studint-phone">رقم جوال الطالب</label>
        <input type="text" id="studint-phone">
    </div>

    <div class="handel">
    <label for="studint-age">عمر الطالب</label>
        <input type="text" id="studint-age">
    </div>

    <div class="handel">
    <label for="studint-far">سورة الطالب</label>
        <input type="text" id="studint-far">
    </div>

    <div class="handel">
    <label for="parent-id">رقم هوية ولي الأمر</label>
        <input type="text" id="parent-id">
    </div>
    
    <div class="handel">
    <label for="parent-phone">رقم جوال ولي الأمر</label>
        <input type="text" id="parent-phone">
    </div>

    <div class="handel radio">
        <input checked type="radio" name="seteatcher" id="Abdullah" value="عبد الله">
        <input type="radio" name="seteatcher" id="Essam" value="عصام">
    </div>
    
    <div class="handel btns">
    <input type="submit" value="تأكيد">
    <button id="Backbtn">عودة</button>
    </div>
  
    `
    addwindow.appendChild(form)
    
    // Back button
    let backbtn = document.getElementById("Backbtn");
    backbtn.addEventListener("click" , function(e){
        document.body.lay.remove()
        document.body.addwindow.remove()
    })

    // Remove enter default
    document.querySelectorAll(".handel input").forEach(element=>{
        element.onkeydown = function (e) {
            if (e.keyCode == 13) {
                e.preventDefault()
                submit.click()
            }
        }})
    
    // teatcher checkbox

    // Submit button
    let submit = document.querySelector(`input[type="submit"]`)
    submit.addEventListener("click" , function(e){
        e.preventDefault();
        
        var studintName = document.getElementById("studint-name")
        var studintId = document.getElementById("studint-id")
        var studintPhone = document.getElementById("studint-phone")
        var studintAge = document.getElementById("studint-age")
        var studintFar = document.getElementById("studint-far")
        var parentId = document.getElementById("parent-id")
        var parentPhone = document.getElementById("parent-phone")
        var currnetTeatcher = document.querySelector(`input[name="seteatcher"]:checked`)

        function checkValid(...ele){
            let result = ele.map(e=> {if(e.value == ""){
                e.style.border = "3px var(--red-color) solid"
                return false
            }else{
                e.style.border = "3px var(--main-color) solid;"
                return true
            }})
            return result
        }
        checkValid(studintName ,studintId ,parentId , parentPhone)
        let checkArray = checkValid(studintName ,studintId ,parentId , parentPhone)

        new Promise((res , rej)=>{
            if(checkArray.includes(false)){
                rej()
            }else res()
        }).then(
            res=>{
            addStudint(studintName.value , studintId.value , studintPhone.value , studintAge.value ,studintFar.value , parentId.value , parentPhone.value , currnetTeatcher.value)
            localStorage.setItem("Studint" , JSON.stringify(arrayOfStudints))
        }).then(res=>{
            studintName.value = ""
            studintId.value = ""
            studintPhone.value = ""
            studintAge.value = ""
            studintFar.value = ""
            parentId.value = ""
            parentPhone.value = ""
        }).then(res=>{
            // log Error if user aren't accessble
            components.popup("accept" , "تم تسجيل الطالب بنجاح")
        }).catch(
            rej =>{
                components.popup("warning" , "هناك بعض البيانات الناقصة !")
            }
        )
    })
}
// End adding a studint

// Start Download Data
let donwloadData = document.getElementById("download-data")
donwloadData.onclick = function(){
    // Sa
    let downloadWindow = document.createElement("div")
    addOverLay()
    downloadWindow.classList.add("download-Window")
    document.body.appendChild(downloadWindow)
    downloadWindow.style.animation = "Fadgein 0.3s linear 0.1s forwards"
    
    downloadWindow.innerHTML = `
    <div class="data-holder">
    
        <div class="down stu">
            <i class="fa-solid fa-child"></i>
            <div class="label ">اضافة الطلاب</div>
        </div>

        <div class="down daily">
            <i class="fa-regular fa-calendar-check"></i>
            <div class="label ">التسجيل اليومي</div>
        </div>

        <div class="down quiz">
            <i class="fa-regular fa-pen-to-square"></i>
            <div class="label ">رصد الإختبار</div>
        </div>

    </div>

    <div class="close">

        <i class="fa-solid fa-xmark"></i>

    </div>`

    let closebtn = document.querySelector(".download-Window .close")
    let laay = document.querySelector(".overlay")
    closebtn.addEventListener("click" , function(){
        laay.remove()
        downloadWindow.remove()
    })

    let downloadStudint = document.querySelector(".down.stu")
    downloadStudint.onclick = function(){
        let studintJson = JSON.stringify(JSON.parse(localStorage.getItem("Studint")) , null , 2)
        let blob = new Blob([studintJson] , {type: "application/json"})
        let url = URL.createObjectURL(blob)
        let link = document.createElement("a")
        link.href = url
        link.download = `Studint(${HijriJS.today().toString().split("/").slice(0,2).join("-")}).json`
        downloadWindow.appendChild(link)
        link.click();
        link.remove();
    }
    let downloadDaily = document.querySelector(".down.daily")
    downloadDaily.onclick = ()=>{
        let dailyJson = JSON.stringify(JSON.parse(localStorage.getItem(`${sessionStorage.getItem("User")} ${HijriJS.today().toString().split("/").slice(0,2).join("/")}`)) , null , 2)
        let blob = new Blob([dailyJson] , {type: "application/json"})
        let url = URL.createObjectURL(blob)
        let link = document.createElement("a")
        link.href = url
        link.download = `Daily(${HijriJS.today().toString().split("/").slice(0,2).join("-")}).json`
        downloadWindow.appendChild(link)
        link.click();
        link.remove();

    }
    
}

//  Daily Monitoring
let dailybtn = document.getElementById("daily-Monitoring")
dailybtn.onclick = function(){
 let link = document.createElement("a")
 link.href = "./daily.html"
 link.click()
 link.remove()
}

//  Student Log
let studentLog = document.getElementById("studing-log")
studentLog.onclick = ()=>{
    let link = document.createElement("a")
    link.href = "./studintLog.html"
    document.body.appendChild(link)
    link.click()
    link.remove()
}

// Student List
let studintList = document.getElementById("student-list")
studintList.onclick = ()=>{
    let link = document.createElement("a")
    link.href = "./student-list.html"
    document.body.appendChild(link)
    link.click()
    link.remove()
}

// Report
let reportbtn = document.getElementById("report")
reportbtn.onclick = ()=>{
    let link = document.createElement("a")
    link.href = "./report.html"
    document.body.appendChild(link)
    link.click()
    link.remove()
}

//  LogOut
let logOut = document.getElementById("log-out")
logOut.onclick = ()=>{
    let linkBack = document.createElement("a")
    linkBack.href = "./index.html"
    document.body.appendChild(linkBack)
    linkBack.click()
    linkBack.remove()
}

let temprory = document.getElementById("temprory")
temprory.onclick = ()=>{
    let dailyJson = JSON.stringify(JSON.parse(localStorage.getItem(`${sessionStorage.getItem("User")} ${"01/09"}`)) , null , 2)
    let blob = new Blob([dailyJson] , {type: "application/json"})
    let url = URL.createObjectURL(blob)
    let link = document.createElement("a")
    link.href = url
    link.download = `Daily(missedDay).json`
    document.body.appendChild(link)
    link.click();
    link.remove();
}

