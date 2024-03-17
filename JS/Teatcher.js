import HijriJS from "./Hijri.js"
import * as components from "./Eshada.js"

let users =[]
let mosqueNumber = ""
var teatcehrId = ""
let teatcherslist = []
// GitHub
fetch("https://thfid.github.io/DataBase/Teatchers.json")
// fetch("../DataBase/Teatchers.json")
.then(res=>res.json())
.then(res=>res.map(e=>users.push(e)))
.then(res=>{
    users.map(e=>{
        if ( sessionStorage.getItem("User") == e.userName){
            if(!sessionStorage.getItem("Info")){
                mosqueNumber = e.mosqueN
                teatcehrId = e.teatcherId
                let infoObject = {
                    mosqueNumber : mosqueNumber,
                    teatcherId : e.teatcherId
                }
                sessionStorage.setItem("Info" , JSON.stringify(infoObject))
            }
            mosqueNumber = JSON.parse(sessionStorage.getItem("Info")).mosqueNumber
            let user = document.getElementById("user-welcome")
            user.innerText = `مرحبا ب${e.position == "Teatcher" ? "الأستاذ" : "المدير"} ${e.name.split(" ")[0].replace("_" , " ")}`
        }
    })
})
if (sessionStorage.getItem("Info")){
    let data = JSON.parse(sessionStorage.getItem("Info"))
    teatcehrId = data.teatcherId
}
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
function addStudint(name , id , phone , age ,current , pId , pPhone , teatcherId , mosqueN ){
    let studint = {[`${id}`] :{
        studintName: name,
        studintId:id,
        studintPhone:phone,
        studintAge:age,
        currentSurah:current,
        parentId:pId,
        parentPhone:pPhone,
        teatcherId:teatcherId,
        mosqueN: mosqueN,
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
    if(users.length){
        console.log(mosqueNumber);
        users.map(e=>{
            if (e.mosqueN == mosqueNumber && e.position == "Teatcher"){
                let teatcehrName = `${e.name.split(" ")[0].replace("_" , " ")} ${e.name.split(" ")[e.name.split(" ").length - 1].replace("_" , " ")}`
                teatcherslist.push({
                    teatcehrName : teatcehrName,
                    teatcherid: e.teatcherId
                })
                console.log(teatcherslist);
            }
        })
    }
    // Add label to window
    let winlabel = document.createElement("div")
    winlabel.classList.add("win-label")
    winlabel.appendChild(document.createTextNode("استمارة تسجيل طالب جديد"))
    addwindow.appendChild(winlabel)
    
    // Add forms
    let form = document.createElement("form")
    // Add inputs & labels
    form.innerHTML=`
    <div class="handel">
    <label for="studint-name">الاسم الرباعي</label>
    <input type="text" id="studint-name">
    </div>

    <div class="handel">
    <label for="studint-id">رقم الهوية</label>
        <input type="text" id="studint-id">
    </div>

    <div class="handel">
    <label for="studint-phone">رقم الجوال</label>
        <input type="text" id="studint-phone">
    </div>

    <div class="handel">
    <label for="studint-age">تاريخ الميلاد</label>
        <input type="text" id="studint-age">
    </div>

    <div class="handel">
    <label for="studint-far">مقدار الحفظ الحالي</label>
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
    
    <div class="handel teatcehr-list">
    <label>اختيار المعلم</label>
    <div class="selected-teatcher"><i class="fa-solid fa-play"></i></div>
    <ul class="list-of-teatchers">
    </ul>
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
    
    // teatchers list 
    var teatcehrbtn = document.querySelector(".handel.teatcehr-list .selected-teatcher")
    let teatcehrul = document.querySelector(".handel.teatcehr-list .list-of-teatchers")
    teatcehrbtn.addEventListener("click" , ()=>{
        teatcehrul.classList.toggle("active")
        teatcehrul.innerHTML = ``
        teatcherslist.map(e=>{
            teatcehrul.innerHTML += `<li teatcherid="${e.teatcherid}">${e.teatcehrName}</li>`
        })
        let teatcehrli = document.querySelectorAll(".handel.teatcehr-list .list-of-teatchers li")
        teatcehrli.forEach(e=>{
            e.onclick = ()=>{
                teatcehrbtn.innerHTML = e.innerHTML
                teatcehrbtn.setAttribute("teatcherid" , `${e.getAttribute("teatcherid")}`)
                teatcehrul.classList.remove("active")
            }
        })
        window.addEventListener("click" , (eve)=>{
            if (
                !eve.target.matches(".handel.teatcehr-list .selected-teatcher") &&
                !eve.target.matches(".handel.teatcehr-list .list-of-teatchers ul") &&
                !eve.target.matches(".handel.teatcehr-list .list-of-teatchers li")
              ) {
                teatcehrul.classList.remove("active")
              }
        })
    })

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
            addStudint(studintName.value , studintId.value , studintPhone.value , studintAge.value ,studintFar.value , parentId.value , parentPhone.value , teatcehrbtn.getAttribute("teatcherid") , mosqueNumber)
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
        let dailyJson = JSON.stringify(JSON.parse(localStorage.getItem(`${teatcehrId} ${HijriJS.today().toString().split("/").slice(0,2).join("/")}`)) , null , 2)
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
