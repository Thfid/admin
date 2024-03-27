import HijriJS from "./Hijri.js";
import * as surahData from "./surah.js";
import * as components from "./Eshada.js";
let users = [];
// GitHub
fetch("https://thfid.github.io/DataBase/Teatchers.json")
// // fetch("../DataBase/Teatchers.JSON")
.then((res) => res.json())
.then((res) => res.map((e) => users.push(e)));
let mosqueNumber = '';
let teatcherId = '';
if(sessionStorage.getItem("Info")){
  let data = JSON.parse(sessionStorage.getItem("Info"));
  mosqueNumber =  data.mosqueNumber.slice(1);
  teatcherId = data.teatcherId
}else{
  // Here but the 501 error
}
let allowPopUp = false
setTimeout(() => {
  allowPopUp = true
}, 5000);
// Time
let clock = document.getElementById("time")
let timenow = new Date
function timeClock(){
  if(timenow.getHours() > 12){
    clock.innerHTML = `${timenow.getHours() - 12} : ${timenow.getMinutes()}` 
   }else{
    clock.innerHTML = `${timenow.getHours()} : ${timenow.getMinutes()}` 
   }
}
timeClock()
setInterval(()=>{
  timenow = new Date
  timeClock()
},1000)
// Start Day and Date
let dayDate = document.querySelector("h1.day-date");
let dayArray = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
let dayOfWeek = new Date().getDay();
let dayOfHijri = HijriJS.today().toString().split("/")[0];
let monthOfHijri = HijriJS.today().toString().split("/")[1];
let yearOfHijri = HijriJS.today().toString().split("/")[2].slice(2, 4);

dayDate.innerHTML = `${dayArray[dayOfWeek]} ${dayOfHijri} / ${monthOfHijri} / ${yearOfHijri} هـ `;
// End Day and Date
// Start Up Down Buttons
let upbutton = document.querySelector(".up-down-holder .up");
let centerbutton = document.querySelector(".up-down-holder .center");
let downbutton = document.querySelector(".up-down-holder .down");

upbutton.onclick = () => {
  scrollTo(0, 0);
};
centerbutton.onclick = () => {
  scrollTo(0, 440);
};
downbutton.onclick = () => {
  scrollTo(0, 2000);
};
// End Up Down Buttons
// Back Button
let beackBtn = document.getElementById("back")
beackBtn.addEventListener("click" , function(){
  history.back()
})
// Attendance list
let attendance = document.querySelector(".attendance");
let attenbar = document.querySelector(".attenbar.bar");
attendance.onclick = function () {
  if (!attenbar.classList.contains("show")) {
    attenbar.classList.add("show");
  }
};

let atten0 = document.querySelector(".at-state.zero");
let atten1 = document.querySelector(".at-state.one");
let atten2 = document.querySelector(".at-state.two");
let atten3 = document.querySelector(".at-state.three");
let atten4 = document.querySelector(".at-state.four");
let atten5 = document.querySelector(".at-state.five");

// Behavior list
let behavior = document.querySelector(".behavior");
let behavbar = document.querySelector(".behavbar");
let talk = document.getElementById("talk");
let sleep = document.getElementById("sleep");
let noPirmission = document.getElementById("no-pirmission");
behavior.onclick = function () {
  if (!behavbar.classList.contains("show")) {
    behavbar.classList.add("show");
  }
};
// Close behavior and attendece list's when click outside
document.onclick = (eve) => {
  if (
    !eve.target.matches(".attenbar.bar") &&
    !eve.target.matches(".attendance")
  ) {
    attenbar.classList.remove("show");
  }
  if (
    !eve.target.matches(".behavbar.bar") &&
    !eve.target.matches(".behavior")
  ) {
    behavbar.classList.remove("show");
  }
};
// Start clickSelfFuction 
function clickSelf(){
  let currentRow = document.querySelector("table tbody tr.active")
  currentRow.click()
}
let mainForm = document.getElementById("main-form")
mainForm.addEventListener ("submit" , (event)=>{event.preventDefault()})
// mainForm.addEventListener ("click" , (event)=>{event.preventDefault()})
// mainForm.addEventListener ("keydown" , (event)=>{event.preventDefault()})
// Start memo-rate-control
let firstShow = document.getElementById("first-show");
let memoShow = document.getElementById("memo-show");
let revShow = document.getElementById("rev-show");
let firstBox = document.getElementById("first-box");
let memoBox = document.getElementById("memo-box");
let revBox = document.getElementById("rev-box");
let memoGrade = document.getElementById("memo-grade");
let revGrade = document.getElementById("review-grade");
window.addEventListener("load" , ()=>{
  firstBox.classList.add("active");
  hideForMemo();
  hideForRev();
  hideForFirst()
})
function hideForRev() {
  if (revShow.classList.contains("active")) {
    revBox.classList.add("active");
    revGradeclassList.add("active");
    memoBox.classList.remove("active");
    memoGrade.classList.remove("active");
    firstShow.classList.remove("active")
    firstBox.classList.remove("active")
  }
}
function hideForFirst(){
  if(firstBox.classList.contains("active")){
  memoBox.classList.remove("active");
  memoGrade.classList.remove("active");
  revBox.classList.remove("active");
  revGrade.classList.remove("active");
  firstShow.classList.add("active")
  firstBox.classList.add("active")
  }
}
function hideForMemo() {
  if (memoShow.classList.contains("active")) {
    memoBox.classList.add("active");
    memoGrade.classList.add("active");
    revBox.classList.remove("active");
    revGrade.classList.remove("active");
    firstShow.classList.remove("active")
    firstBox.classList.remove("active")
  }
}
memoShow.onclick = () => {
  memoShow.classList.add("active");
  memoBox.classList.add("active");
  memoGrade.classList.add("active");
  revShow.classList.remove("active");
  revBox.classList.remove("active");
  revGrade.classList.remove("active");
  firstBox.classList.remove("active");
  firstShow.classList.remove("active");
};
firstShow.onclick = () => {
  memoShow.classList.remove("active");
  memoBox.classList.remove("active");
  memoGrade.classList.remove("active");
  revShow.classList.remove("active");
  revBox.classList.remove("active");
  revGrade.classList.remove("active");
  firstBox.classList.add("active");
  firstShow.classList.add("active");

}
revShow.onclick = () => {
  revShow.classList.add("active");
  revBox.classList.add("active");
  revGrade.classList.add("active");
  memoShow.classList.remove("active");
  memoBox.classList.remove("active");
  memoGrade.classList.remove("active");
  firstBox.classList.remove("active");
  firstShow.classList.remove("active");
};

// Start AutoComplete
let availableResult = [];
let availableReviews = [];
let availableStudint = [];
surahData.surah.reverse().map((e) => availableResult.push(Object.keys(e).join("")));
surahData.reviews.map((e) => availableReviews.push(e));
availableStudint.push("الاستاذ عبد الله" , "الاستاذ عصام")

let firstMemo = document.getElementById("first-surah");
let firstListener = document.getElementById("first-listener");
let firstFrom = document.getElementById("from-first")
let firstYes = document.querySelector(".yes-no.yes")
let surahInput = document.getElementById("surah");
let surahFromI = document.getElementById("from-memo");
let memolistener = document.getElementById("memo-listener")
let addHesiMemo = document.querySelector(".add.hesitated")
let revFromInput = document.getElementById("from-review");
let revToInput = document.getElementById("to-review");
let revL1Input = document.getElementById("listener1");
let revL2Input = document.getElementById("listener2");
let addhesiRevB = document.querySelector(".add.hesitated.rev");
let resultBoxFS = document.querySelector(".result-box.first-surah-r")
let resultBoxFL = document.querySelector(".result-box.first-listener")
let resultBoxMemo = document.querySelector(".result-box.memo");
let resutlBoxMemoListener = document.querySelector(".result-box.memo-listener")
let resultBoxRevFrom = document.querySelector(".result-box.rev.from");
let resultBoxRevTo = document.querySelector(".result-box.rev.to");
let resultBoxRevL1 = document.querySelector(".result-box.rev.listener1");
let resultBoxRevL2 = document.querySelector(".result-box.rev.listener2");
let resultcounter = -1;
function autoComplete(inputbox, availableResult, autobox, click) {
  let result = [];
  let input = inputbox.value;

  if (input.length) {
    result = availableResult.filter((keyWord) =>
      keyWord.toLowerCase().includes(input.toLowerCase())
    );
  }

  displayResult(result, autobox);

  if (!input.length) {
    autobox.innerHTML = "";
  }
  // Close when click out side + enter + tap
  window.addEventListener("click" , (eve)=>{
    if(!autobox.contains(eve.target)){
      autobox.innerHTML = ""
    }
  })
  window.addEventListener("keyup" , (eve) => {
    if (eve.key == "Enter") {
      autobox.innerHTML = "";
    }
    if(eve.key == "Tab"){
      autobox.innerHTML = "";
    }
    if(eve.key != "Control" && eve.key != "Shift" &&
    eve.key != "Alt" && eve.code != "KeyA" &&
    eve.code != "ArrowDown" && eve.code != "ArrowUp" &&
    eve.code != "ArrowRight" && eve.code != "ArrowLeft" &&
    eve.code != "Home" && eve.code != "End"){
      if (inputbox.value != "الحج" && inputbox.value != "الحجر" && result.length == 1 && inputbox.value == result[0]){
        autobox.innerHTML = "";
      }
    }
  })


  function displayResult(result, autobox) {
    let content = result.map(
      (list) => `<li onclick=${click}(this)>${list}</li>`
      );
      autobox.innerHTML = `<ul> ${content.join("")} </ul>`;
      
  }
  resultcounter = -1;
}
function arrowComplete(inputbox, resultcounter, results) {
  if(results.length){
  results.forEach((ele) => ele.classList.remove("selected"));
  results[resultcounter].classList.add("selected");
  inputbox.value = results[resultcounter].innerHTML;
  }
}
function eleonkeyup(inputbox, availableResult, autobox, click) {
  inputbox.addEventListener("keyup" , (e) => {
    if (e.keyCode == 40 || e.keyCode == 38) {
      let results = document.querySelectorAll(
        `#${inputbox.id} ~ .result-box ul li`
      );
        if (e.keyCode == 40) {
          switch (resultcounter) {
            case -1:
              resultcounter = 0;
              break;
            case results.length - 1:
              resultcounter = 0;
              break;
            default:
              resultcounter++;
          }
        }
        if (e.keyCode == 38) {
          switch (resultcounter) {
            case -1:
              resultcounter = results.length - 1;
              break;
            case 0:
              resultcounter = results.length - 1;
              break;
            default:
              resultcounter--;
          }
        } 
      arrowComplete(inputbox, resultcounter, results);
    } else autoComplete(inputbox, availableResult, autobox, click);
    
  });
}
// Fisrt Surah.
eleonkeyup(
  firstMemo,
  availableResult,
  resultBoxFS,
  "seInputFirstS",
  firstFrom
  );
// First Listener
eleonkeyup(
  firstListener,
  availableStudint,
  resultBoxFL,
  "seInputFirstL"
);
// Memoriztion Surah.
eleonkeyup(
  surahInput,
  availableResult,
  resultBoxMemo,
  "seInputmemo"
);
// Memoriztion Listener
eleonkeyup(
  memolistener,
  availableStudint,
  resutlBoxMemoListener,
  "seInputmemolistener"
);
// Review From
eleonkeyup(
  revFromInput,
  availableResult,
  resultBoxRevFrom,
  "seInputRevFrom"
);
// Review To
eleonkeyup(
  revToInput,
  availableResult,
  resultBoxRevTo,
  "seInputRevTo"
);
// Review Lin1
eleonkeyup(
  revL1Input,
  availableStudint,
  resultBoxRevL1,
  "seInputRevL1"
);
// Review Lin2
  eleonkeyup(
  revL2Input,
  availableStudint,
  resultBoxRevL2,
  "seInputRevL2"
);

// Start Memoraiztion Option
let memolistbtn = document.querySelector(".memo-list-holder");
let memolist = document.querySelector(".memo-list-holder ul");
memolistbtn.addEventListener("click", () => {});
window.addEventListener("click", (eve) => {
  if (memolistbtn.contains(eve.target) || memolist.contains(eve.target)) {
    memolist.classList.add("active");
  } else {
    memolist.classList.remove("active");
  }
});
// Start Review Option
let revlistbtn = document.querySelector(".rev-list-holder");
let revlist = document.querySelector(".rev-list-holder ul");
revlistbtn.addEventListener("click", () => {});
window.addEventListener("click", (eve) => {
  if (revlistbtn.contains(eve.target) || revlist.contains(eve.target)) {
    revlist.classList.add("active");
  } else {
    revlist.classList.remove("active");
  }
});

// Make a localStorage Object
let dataArray = {
  [HijriJS.today().toString().split("/").slice(0, 2).join("/")]: {
    date: HijriJS.today().toString(),
    day: components.today(),
    state: 1,
    title: "daily",
    daily: [],
  },
};
let arrayOfToday =
  dataArray[HijriJS.today().toString().split("/").slice(0, 2).join("/")].daily;

function setAtLocalStorage() {
  dataArray[HijriJS.today().toString().split("/").slice(0, 2).join("/")].daily = arrayOfToday;
  localStorage.setItem(`${teatcherId} ${HijriJS.today().toString().split("/").slice(0, 2).join("/")}`,  JSON.stringify(dataArray));
}

// Getting Studint data
let arrayOfStudint = [];
let lastTsmee = [];
let table = document.getElementById("table-body");
let tableCount = 0;
let checkedRotate = false
let naserEdit = true
let btnclose = document.createElement("button")
btnclose.classList.add("close-edit")
btnclose.innerHTML = `<i class="fa-solid fa-lock"></i>`
// GitHub
fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/Students.json`)
// fetch("../DataBase/Studnts.JSON")
  .then((res) => res.json())
  .then((res) => {
    let admin = false;
    let currentTeacher = users
      .map((e) => {
        if (sessionStorage.getItem("User") == e.userName) {
          e.position == "Supervior" ? (admin = true) : (admin = false);
          return e.teatcherId.split(" ")[0].replace("_", " ");
        }
      }).join("");
    res.map((e) => {
      if (admin == false) {
        if (e[Object.keys(e)].teatcherId == currentTeacher &&  e[Object.keys(e)].state == true) {
          arrayOfStudint.push(e);
        }
      } else if(e[Object.keys(e)].state == true) arrayOfStudint.push(e);
    });
  })
  .then((res) => {
    // Push studint Data to today array
    users.map((e) => {
      if ( sessionStorage.getItem("User") == e.userName) {
        if (localStorage.getItem(`${teatcherId} ${HijriJS.today().toString().split("/").slice(0, 2).join("/")}`)) {
          let data = JSON.parse(localStorage.getItem(`${teatcherId} ${HijriJS.today().toString().split("/").slice(0, 2).join("/")}`));
          arrayOfToday =data[HijriJS.today().toString().split("/").slice(0, 2).join("/")].daily;
            arrayOfToday.map((e) => {
              availableStudint.push(e[Object.keys(e)].studintname);
            });
        } else loadData();
      }
    });
    function loadData() {
      dataArray[
        HijriJS.today().toString().split("/").slice(0, 2).join("/")
      ].teatcher = sessionStorage.getItem("User");
      arrayOfStudint.map((e) => {
        let data = e[Object.keys(e)];
        let studintname = data.studintName.split(" ");
        studintname = `${studintname[0].replace(
          "_",
          " "
        )} ${studintname[1].replace("_", " ")} ${
          studintname[3]
            ? studintname[3].replace("_", " ")
            : studintname[2].replace("_", " ")
        }`;
        availableStudint.push(studintname);
        let currentTeacher = data.teatcherId;
        let daily = {
          [Object.keys(e)]: {
            studintname: studintname,
            teatcherId: currentTeacher,
            firstSState : true,
            firstSurah:"",
            firstFrom:"",
            firstTo:"",
            firstListener:"",
            firstState: false,
            memoState: true,
            rememo: false,
            memoFirstTime: true,
            memoSurah: "",
            memoSurahFrom: "",
            memoSurahTo: "",
            memoSurahLines: "",
            memoListen:"",
            memoTime: "",
            hesitateds: 0,
            misteaks: 0,
            memoRate: "",
            memoClass: "-",
            reviewState: true,
            rereview: false,
            reviewFirstTime: true,
            reviewSurahFrom: "",
            reviewSurahTo: "",
            reviewListener1: "",
            reviewListener2: "",
            reviewRate: "",
            hesitatedsRev: 0,
            misteaksRev: 0,
            totalRate: 10,
            AttendanceState: 0,
            behaviorArray: [],
            
          },
        };
        arrayOfToday.push(daily);
        arrayOfToday.sort((a, b) => {
          let first = a[Object.keys(a)].studintname;
          let second = b[Object.keys(b)].studintname;
          if (first < second) {
            return -1;
          }
          if (first > second) {
            return 1;
          }
          return 0;
        });
      });
    }
  })
  .then((res) => {
    // Display data at the table
    
    arrayOfToday.map((e) => {
      tableCount += 1;
      table.innerHTML += `
            <tr class="a${Object.keys(e).join("")}">
            <td class="number-body">${tableCount}<span class="delete-day">تفريغ</span><span class="dot-holder"></span></td>
            <td class="name-body">${e[Object.keys(e)].studintname}</td>

            <td class="first-body">
                <div class="first-surah-table">${e[Object.keys(e)].firstSurah}</div>
                <div class="first-from-to">
                  <span class="first-from">${e[Object.keys(e)].firstFrom}</span>
                   - <span class="first-to">${e[Object.keys(e)].firstTo}</span>
                </div>
            </td>

            <td class="surah-body">
                <div class="surah-one">${e[Object.keys(e)].memoSurah}</div>
                <div class="from-to">
                  <span class="mf">${e[Object.keys(e)].memoSurahFrom}</span>
                   - <span class="mt">${e[Object.keys(e)].memoSurahTo}</span>
                </div>
            </td>

            <td class="memo-try-body active">
                <div class="memo-listener">${e[Object.keys(e)].memoListen}</div>
            </td>

            <td class="rate-body">
                <div class="main-rate">${e[Object.keys(e)].memoRate}</div>
                <div class="catagory">${e[Object.keys(e)].memoClass}</div>
            </td>

            <td class="surah-rev-body">
                <div class="from">${e[Object.keys(e)].reviewSurahFrom}</div>
                <div class="to space">${e[Object.keys(e)].reviewSurahTo}</div>
            </td>
            <td class="listener-body">
              <div class="listener1">${e[Object.keys(e)].reviewListener1}</div>
              <div class="listener2 space">${e[Object.keys(e)].reviewListener2}</div>
              </td>

            <td class="rate-rev-body">${e[Object.keys(e)].reviewRate}</td>
            </tr>
            `;
    });
  })
  .then(
    (res) => {
      var rows = document.querySelectorAll("#table-body tr");
      // Table control
      let hideFirstMemo = document.querySelector(".hideFirstMemo")
      let fHead = document.querySelector("thead tr td.first-memo")
      let fBody = document.querySelectorAll("tbody tr td.first-body")

      let hideMemoListen = document.querySelector(".hidememolisener")
      let mLHead = document.querySelector("table thead tr td.memo-try")
      let mLBody = document.querySelectorAll("table tbody tr td.memo-try-body")
      
      let hideRevListen = document.querySelector(".hiderevlisener")
      let rLHead = document.querySelector("table thead tr td.listener")
      let rLBody = document.querySelectorAll("table tbody tr td.listener-body")

      
      hideFirstMemo.onclick = ()=>{
        hideFirstMemo.classList.toggle("active")
        hideColumnAssis(hideFirstMemo , fHead , fBody)
        let currentRow = document.querySelector("tr.active")
        rows.forEach(e=>e.click())
        currentRow.click()
      }
      hideMemoListen.onclick = ()=>{
        hideMemoListen.classList.toggle("active")
        hideColumnAssis(hideMemoListen , mLHead , mLBody)
        let currentRow = document.querySelector("tr.active")
        rows.forEach(e=>e.click())
        currentRow.click()
      }
      hideRevListen.onclick= ()=>{
        hideRevListen.classList.toggle("active")
        hideColumnAssis(hideRevListen , rLHead , rLBody)
        let currentRow = document.querySelector("tr.active")
        rows.forEach(e=>e.click())
        currentRow.click()    
      }
      function hideColumnAssis( visibilebtn , head , body){
        if(visibilebtn.classList.contains("active")){
          head.style.display = "none"
          body.forEach(e=>e.style.display = "none")
          addspicalclass(visibilebtn , body)
        }else{
          head.style.display = ""
          body.forEach(e=>{
            if(!e.classList.contains("merge")){
              e.style.display = ""
            }
          })
          addspicalclass(visibilebtn , body)
        }
      }
      function addspicalclass(botn , boody){
        if (!botn.classList.contains("active")){
          boody.forEach(e=>{
            e.classList.add("cell-visi")
          })
        }else{
          boody.forEach(e=>{
            e.classList.remove("cell-visi")
          })
        }
      }
      hideColumnAssis(hideMemoListen , mLHead , mLBody)
      hideColumnAssis(hideRevListen , rLHead , rLBody)      
      hideColumnAssis(hideFirstMemo , fHead , fBody)
      var sn = document.querySelector(".active .name-body");
      // sessionStorage.setItem("hidecells" , )
      //  Add click event
      rows.forEach((e) => {
        e.addEventListener("click", function (eve) {
          hideColumnAssis(hideFirstMemo , fHead , fBody)
          hideColumnAssis(hideMemoListen , mLHead , mLBody)
          hideColumnAssis(hideRevListen , rLHead , rLBody)   

          eve.preventDefault();
          rows.forEach((ele) => {ele.classList.remove("active")})
          let width = window.innerWidth;
          this.classList.add("active");
          // Table cells defiends
          let selectedName = document.querySelector(".active .name-body");
          sn = selectedName
          let selectedSurah = document.querySelector(".active .surah-one");
          let selectedFS = document.querySelector(".active .first-surah-table");
          let selectedFF = document.querySelector(".active .first-from");
          let selectedFT = document.querySelector(".active .first-to");
          let selectedMF = document.querySelector(".active span.mf");
          let selectedMT = document.querySelector(".active span.mt");
          let selectedMLI = document.querySelector("tr.active .memo-listener");
          let selectedMR = document.querySelector(".active .main-rate");
          let selectedMC = document.querySelector(".active .catagory");
          let selectedRF = document.querySelector(".active .surah-rev-body div.from");
          let selectedRT = document.querySelector(".active .surah-rev-body div.to");
          let selectedRL1 = document.querySelector(".active .listener-body .listener1");
          let selectedRL2 = document.querySelector(".active .listener-body .listener2");
          let selectedRR = document.querySelector(".active .rate-rev-body");
          let showName = document.querySelector("h2.name");
          showName.innerHTML = selectedName.innerHTML;
    

          // Input's defiends
          // First Of Surah Of Inputs
          let firstSec = document.querySelector(".first-surah")
          let firstSurah = document.getElementById("first-surah")
          let firstFrom = document.getElementById("from-first")
          let firstTo = document.getElementById("to-first")
          let firstListener = document.getElementById("first-listener")
          // Memoriztion Inputs
          let memoSec = document.querySelector(".memoriztion");
          let surah = document.getElementById("surah");
          let memoFrom = document.getElementById("from-memo");
          let memoTo = document.getElementById("to-memo");
          let memoLines = document.getElementById("counter-memo");
          let memoListener = document.getElementById("memo-listener")
          let memoRate = document.querySelector(".box.daily-grade span");
          let timeCalc = document.getElementById("timecalc");
          let firstTime = document.getElementById("firstTime");
          let rememo = document.getElementById("rememo");
          // Review Inputs
          let revSec = document.querySelector(".review");
          let revFrom = document.getElementById("from-review");
          let revTo = document.getElementById("to-review");
          let revlistener1 = document.getElementById("listener1");
          let revlistener2 = document.getElementById("listener2");
          let firstTimeRev = document.getElementById("firstTime-rev");
          let rereview = document.getElementById("rereview");
          let revRate = document.querySelector(".box.review-grade span");
          // No Memoriztion Or No Review Or No First
          let noFirst = document.querySelector(".first-surah .title");
          let noMemo = document.querySelector(".memoriztion .title");
          let noRev = document.querySelector(".review .title");
          let tableControl = document.querySelector(".table-control .container")

          // Naser Lock
          if(e.classList[0].slice(1) == 372187){
            if(naserEdit){
              if(tableControl.children.length < 4){
                tableControl.appendChild(btnclose)
                btnclose.onclick = ()=>{
                  naserEdit = false
                }
              }  
            }
            else{
              let id = document.getElementById("lock-edit-pop-up")
              if(!id){
                components.lockEdit("عغ" , 372187)
              }
            }
          }else{
            btnclose.remove()
          }

          // Update studint's Memo Info
          function updateValue() {
            arrayOfToday.map((e) => {
              // Send Data to Data Base
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                //----------------------- First Of Surah ------------------------
                data.firstSurah = firstSurah.value;
                data.firstFrom = firstFrom.value;
                data.firstTo = firstTo.value;
                data.firstListener = firstListener.value;
                // Tabel
                selectedFS.innerHTML = data.firstSurah
                selectedFF.innerHTML = data.firstFrom
                selectedFT.innerHTML = data.firstTo
                //------------------------- Menoriztion -------------------------
                data.memoSurah = surah.value;
                data.memoSurahFrom = memoFrom.value;
                data.memoSurahTo = memoTo.value;
                data.memoSurahLines = memoLines.value;
                data.memoListen = memoListener.value
                if (surah.value && data.memoRate == "") {
                  data.memoRate = 10;
                }
                // Tabel
                
                selectedSurah.innerHTML = data.memoSurah;
                selectedMF.innerHTML = data.memoSurahFrom;
                selectedMT.innerHTML = data.memoSurahTo;
                selectedMLI.innerHTML = e[Object.keys(e)].memoListen
                if (typeof data.memoRate == "number") {
                  memoRate.innerHTML = data.memoRate;
                }
                memoLines.innerHTML = data.memoSurahLines;
                selectedMC.innerHTML = data.memoClass;
                if (
                  (data.memoClass === "-" || data.memoClass === "جاري التسميع") &&
                  surah.value
                ) {
                  data.memoClass = "جاري التسميع";
                }
                if (
                  typeof +memoRate.innerHTML == "number" &&
                  data.memoRate != ""
                ) {
                  selectedMR.innerHTML = memoRate.innerText;
                }
                //------------------------- Review -------------------------
                data.reviewSurahFrom = revFrom.value;
                data.reviewSurahTo = revTo.value;
                data.reviewListener1 = revlistener1.value;
                data.reviewListener2 = revlistener2.value;
                if (revFrom.value && data.reviewRate == "") {
                  data.reviewRate = 10;
                }

                // Tabel
                selectedRF.innerHTML = data.reviewSurahFrom;
                selectedRT.innerHTML = data.reviewSurahTo;
                selectedRL1.innerHTML = data.reviewListener1;
                selectedRL2.innerHTML = data.reviewListener2;
                if (typeof data.reviewRate == "number") {
                  revRate.innerHTML = data.reviewRate;
                }
                if (
                  typeof +revRate.innerHTML == "number" &&
                  revRate.innerHTML != "لم يسمع بعد" &&
                  data.reviewRate != ""
                ) {
                  selectedRR.innerHTML = revRate.innerText;
                }
                // Send data to localStorage
                setAtLocalStorage();
                
              }
            });
          }

          function updateMemoData(fS ,fF , fT , fL , mS, mF, mT, mL, mLi, rF, rT, rL1, rL2) {
            //------------------------- First Of Surah -------------------------
            let firstData = [fS , fF , fT , fL]
            firstData.forEach(e=>{
              e.onblur = ()=> updateValue()
            })
            //------------------------- Menoriztion -------------------------

            // Send Surah to Data Base on blur
            mS.onblur = () => {
              setTimeout(() => {
                if(!availableResult.includes(mS.value.trim())){
                  if(mS.value != "" && mS.value != " "){
                    components.popup("info" , "خطأ في إسم السورة")
                    mS.style.color = "var(--red-color)"
                  }
                }
                else {
                  mS.style.color = ""
                }
               updateValue();
                calldata()
              }, 500);
            };
            // Fute : plcae holder an ayah limit  
            // Send From-To-Lines to Data Base on keyup
            let seconderyMemoData = [mF, mT, mL ,mLi];
            seconderyMemoData.forEach((ele) => {
              ele.onblur = (eve) => {
                updateValue()
              };
            });

            //------------------------- Review -------------------------
            // Send From-To-Listiner 1 & 2 to Data Base on blur
            let reviewInputs = [rF, rT, rL1, rL2];
            reviewInputs.forEach((ele) => {
              ele.onblur = (eve) => updateValue();
            });
          }
          // Trigger
          updateMemoData(
            firstSurah , 
            firstFrom , 
            firstTo , 
            firstListener,
            surah,
            memoFrom,
            memoTo,
            memoLines,
            memoListener,
            revFrom,
            revTo,
            revlistener1,
            revlistener2
          );

          // Start Decisiveness
          function updateMisandHesi(addname, removename, para, input , currentSec) {
              addname.onclick = () => {
                if (input.value && currentSec.classList.contains("active")) {
                  arrayOfToday.map((e) => {
                    if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                      let data = e[Object.keys(e)];
                      data[para] += 1;
                      calldata();
                      if (
                        typeof +revRate.innerHTML == "number" &&
                        revRate.innerHTML != "لم يسمع بعد" &&
                        data.reviewRate != ""
                      ) {
                        selectedRR.innerHTML = revRate.innerText;
                      }
                      if (
                        typeof +memoRate.innerHTML == "number" &&
                        memoRate.innerHTML != "لم يسمع بعد" &&
                        data.memoRate != ""
                      ) {
                        selectedMR.innerHTML = memoRate.innerText;
                      }
                    }
                  });
                } else if (currentSec.classList.contains("active")){
                   components.popup("info", "الرجاء تحديد السورة اولا");
                }
              };
              removename.onclick = () => {
                if (input.value) {
                  arrayOfToday.map((e) => {
                    if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                      let data = e[Object.keys(e)];
                      if (data[para] > 0) {
                        data[para] -= 1;
                      }
                      calldata();
                      if (
                        typeof +revRate.innerHTML == "number" &&
                        revRate.innerHTML != "لم يسمع بعد" &&
                        data.reviewRate != ""
                      ) {
                        selectedRR.innerHTML = revRate.innerText;
                      }
                      if (
                        typeof +memoRate.innerHTML == "number" &&
                        memoRate.innerHTML != "لم يسمع بعد" &&
                        data.memoRate != ""
                      ) {
                        selectedMR.innerHTML = memoRate.innerText;
                      }
                    }
                  });
                }
                else  memoSec.classList.contains("active") || revSec.classList.contains("active")
              };
          }
          // Start Yes / No (First)
          let firstYes = document.querySelector(".yes-no.yes")
          let firstGood = document.querySelector(".yes-no.good")
          let firstacceptable = document.querySelector(".yes-no.acceptable")
          let firstNo = document.querySelector(".yes-no.no")
          function firstYesNo(btn , dibtn , dibtn2 , dibtn3 , appre){
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                btn.onclick = ()=>{
                  data.firstState = appre;
                  btn.classList.add("selected")
                  dibtn.classList.remove("selected")
                  dibtn2.classList.remove("selected")
                  dibtn3.classList.remove("selected")
                  updateValue();
                  calldata()
                  }
              }
            });
          }
          firstYesNo(firstYes , firstNo  , firstGood , firstacceptable, "excellent")
          firstYesNo(firstGood , firstYes , firstNo  , firstacceptable , "good")
          firstYesNo(firstacceptable , firstYes , firstNo , firstGood , "acceptable")
          firstYesNo(firstNo , firstYes  , firstGood , firstacceptable, false)

          // Start Hesitated ( Memoriztion )
          let addhesi = document.querySelector(".add.hesitated");
          let removehesi = document.querySelector(".remove.hesitated");
          let counthesi = document.querySelector(".counter.hesitated");
          updateMisandHesi(addhesi, removehesi, "hesitateds", surah , memoSec);

          // Start Mistake ( Memoriztion )
          let addmistake = document.querySelector(".add.mistake");
          let removemistake = document.querySelector(".remove.mistake");
          let countmistake = document.querySelector(".counter.mistake");
          updateMisandHesi(addmistake, removemistake, "misteaks", surah , memoSec) ;

          // Start Hesitated ( Review )
          let addhesiRev = document.querySelector(".add.hesitated.rev");
          let removehesiRev = document.querySelector(".remove.hesitated.rev");
          let counthesiRev = document.querySelector(".counter.hesitated.rev");
          updateMisandHesi(addhesiRev, removehesiRev, "hesitatedsRev", revFrom , revSec );

          // Start Mistake ( Review )
          let addmistakeRev = document.querySelector(".add.mistake.rev");
          let removemistakeRev = document.querySelector(".remove.mistake.rev");
          let countmistakeRev = document.querySelector(".counter.mistake.rev");
          updateMisandHesi(addmistakeRev,removemistakeRev,"misteaksRev",revFrom , revSec);
          

          // addListenerPoint.addEventListener("click",()=>{calldata()})
          // removeListenerPoint.addEventListener("click",()=>{calldata()})
          // Call data to fill input's
          function calldata() {
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                let attenArray = [ atten0,atten1,atten2,atten3,atten4,atten5,];
                // Attendence State
                attenArray[data.AttendanceState].checked = true;
                let nu = document.querySelector(".active td.number-body");
                let na = document.querySelector(".active td.name-body");
                let frow = document.querySelector(".active td.first-body")
                let mSrow = document.querySelector(".active td.surah-body");
                let mLrow = document.querySelector(".active td.memo-try-body")
                let mRrow = document.querySelector(".active td.rate-body");
                let rSrow = document.querySelector(".active td.surah-rev-body");
                let rLrow = document.querySelector(".active td.listener-body");
                let rRrow = document.querySelector(".active td.rate-rev-body");
                let attendenceArray = [mSrow, mRrow, rSrow ,rLrow , mLrow , frow];
                let attendenceSpicalArray = [rLrow , mLrow , frow]
                let colored = [nu, na, rRrow];
                let coloredPhone = [rSrow, nu, na];
                // Add Water Marks

                function Absent() {
                  let phoneText = document.createElement("p");
                  if (data.AttendanceState == 2) {
                    if (width > 580) {
                      attendenceArray.map((e) => {
                        e.style.display = "none";
                      });
                      attendenceSpicalArray.map(e=>{
                        e.classList.add("merge")
                      })
                      colored.map(
                        (e) => (e.style.backgroundColor = "#c17c197a")
                      );
                      colored.map((e) => (e.style.opacity = "1"));
                      rRrow.setAttribute("colspan", "8");
                      rRrow.innerHTML = "غــــــــــائــــــــب";
                    } else {
                      mSrow.style.display = "none";
                      coloredPhone.map(
                        (e) => {
                          e.style.backgroundColor = "#c17c197a"
                        }
                        );
                        coloredPhone.map((e) => (e.style.opacity = "1"));
                        rSrow.setAttribute("colspan", "2");
                      phoneText.innerHTML = "غـــــائـــــب";
                      if (rSrow.children.length < 3) {
                        setTimeout(() => {
                          selectedRF.style.display = "none";
                          selectedRT.style.display = "none";
                        }, 0);
                        rSrow.appendChild(phoneText);
                      }
                    }
                  } else if (data.AttendanceState == 1) {
                    if (width > 580) {
                      attendenceArray.map((e) => {
                        e.style.display = "none";
                      });
                      attendenceSpicalArray.map(e=>{
                        e.classList.add("merge")
                      })
                      colored.map((e) => (e.style.backgroundColor = ""));
                      colored.map((e) => (e.style.opacity = "0.6"));
                      rRrow.setAttribute("colspan", "8");
                      rRrow.innerHTML = "إجـــــــــــــــازة";
                    } else {
                      mSrow.style.display = "none";
                      coloredPhone.map((e) => (e.style.backgroundColor = ""));
                      coloredPhone.map((e) => (e.style.opacity = "0.6"));
                      rSrow.setAttribute("colspan", "2");
                      phoneText.innerHTML = "إجـــــــازة";
                      if (rSrow.children.length < 3) {
                        setTimeout(() => {
                          selectedRF.style.display = "none";
                          selectedRT.style.display = "none";
                        }, 0);
                        rSrow.appendChild(phoneText);
                      }
                    }
                  } else if (data.AttendanceState == 5) {
                    if (width > 580) {
                      attendenceArray.map((e) => {
                        e.style.display = "none";
                      });
                      attendenceSpicalArray.map(e=>{
                        e.classList.add("merge")
                      })
                      colored.map((e) => (e.style.backgroundColor = ""));
                      colored.map((e) => (e.style.opacity = "0.6"));
                      rRrow.setAttribute("colspan", "8");
                      rRrow.innerHTML = "غــــــيــــاب بــــــعــــــذر";
                    } else {
                      mSrow.style.display = "none";
                      coloredPhone.map((e) => (e.style.backgroundColor = ""));
                      coloredPhone.map((e) => (e.style.opacity = "0.6"));
                      rSrow.setAttribute("colspan", "2");
                      phoneText.innerHTML = "غيــــاب بعــــذر";
                      if (rSrow.children.length < 3) {
                        setTimeout(() => {
                          selectedRF.style.display = "none";
                          selectedRT.style.display = "none";
                        }, 0);
                        rSrow.appendChild(phoneText);
                      }
                    }
                  } else {
                    if (width > 580) {
                      attendenceArray.map((e) => {
                        e.style.display = "";
                      });
                      attendenceSpicalArray.map(e=>{
                        e.classList.remove("merge")
                      })
                      colored.map((e) => (e.style.backgroundColor = ""));
                      colored.map((e) => (e.style.opacity = "1"));
                      rRrow.setAttribute("colspan", "1");
                      rRrow.innerHTML = data.reviewRate;
                    } else {
                      mSrow.style.display = "";
                      coloredPhone.map((e) => (e.style.backgroundColor = ""));
                      coloredPhone.map((e) => (e.style.opacity = "1"));
                      if (rSrow.children.length == 3) {
                        selectedRF.style.display = "";
                        selectedRT.style.display = "";
                        rSrow.children[2].remove();
                      }
                    }
                  }
                }
                Absent();

                // Show Behavior Dot's
                if (data.behaviorArray.length) {
                  let dotholder = document.querySelector(
                    ".active td.number-body .dot-holder"
                  );
                  dotholder.innerHTML = "";
                  data.behaviorArray.map((e) => {
                    let dot = document.createElement("span");
                    dotholder.appendChild(dot);
                  });
                }

                // Call Re memo data
                if (data.rememo) {
                  rememo.checked = true;
                  data.memoSurahLines = 0
                  memoLines.value = ""
                  memoLines.classList.add("Closed")
                } else{
                  memoLines.classList.remove("Closed")
                  rememo.checked = false;
                } 

                // Call ReReview
                if (data.rereview) {
                  rereview.checked = true;
                }  else rereview.checked = false;
                // Show First Of Surah Data in input's feild
                let firstSurahDeci = 1.5
                firstSurah.value = data.firstSurah
                firstListener.value = data.firstListener
                firstFrom.value = data.firstFrom
                firstTo.value = data.firstTo
                if(data.firstState == "excellent"){
                  firstYes.classList.add("selected")
                  firstNo.classList.remove("selected")
                  firstGood.classList.remove("selected")
                  firstacceptable.classList.remove("selected")
                  firstSurahDeci = 0
                }else if(data.firstState == "good"){
                  firstGood.classList.add("selected")
                  firstYes.classList.remove("selected")
                  firstacceptable.classList.remove("selected")
                  firstNo.classList.remove("selected")
                  firstSurahDeci = 0.5
                }else if(data.firstState == "acceptable"){
                  firstacceptable.classList.add("selected")
                  firstYes.classList.remove("selected")
                  firstGood.classList.remove("selected")
                  firstNo.classList.remove("selected")
                  firstSurahDeci = 1
                }else if(data.firstState == false){
                  firstNo.classList.add("selected")
                  firstYes.classList.remove("selected")
                  firstSurahDeci = 1.5
                }
                if(data.firstSState == false){
                  firstSurahDeci = 0
                }
                // Show Memoriztion Data in input's feild
                let memolistenerInput = document.getElementById("memo-listener")
                surah.value = data.memoSurah;
                memoFrom.value = data.memoSurahFrom;
                memoTo.value = data.memoSurahTo;
                memoLines.value = data.memoSurahLines;
                memolistenerInput.value = data.memoListen;
                if (data.memoClass == "-" && timeCalc.checked == true) {
                  timeCalc.checked = false;
                }
                // Show review Data in input's feild
                revFrom.value = data.reviewSurahFrom;
                revTo.value = data.reviewSurahTo;
                revlistener1.value = data.reviewListener1;
                revlistener2.value = data.reviewListener2;

                // Show number of hesitatied and mistakes
                countmistake.innerHTML = data.misteaks;
                counthesi.innerHTML = data.hesitateds;
                countmistakeRev.innerHTML = data.misteaksRev;
                counthesiRev.innerHTML = data.hesitatedsRev;

                // First Time and second Time Memoriztion
                let secondTime = 0;
                if (data.memoFirstTime == true) {
                  firstTime.checked = false;
                  clacMemo();
                } else {
                  firstTime.checked = true;
                  secondTime = 1;
                  clacMemo();
                }
                // First Time and second Time Review
                let secondTimeRev = 0;
                if (data.reviewFirstTime == true) {
                  firstTimeRev.checked = false;
                  clacMemo();
                } else {
                  firstTimeRev.checked = true;
                  secondTimeRev = 1;
                  clacMemo();
                }
               
                // Disable memorez
                let witoutFirst = document.createElement("p");
                let witoutmemo = document.createElement("p");
                let witoutrev = document.createElement("p");
                let selectedMFT = document.querySelector(".active .from-to");
                let selectedFFT = document.querySelector(".active .first-from-to")
                
                if (data.firstSState == false) {
                  firstSec.classList.add("false");
                  noFirst.innerHTML = "بدون أول السورة";
                  if (width > 580) {;
                    frow.children[0].style.display = "none"
                    frow.children[1].style.display = "none"
                    witoutFirst.innerHTML = "معفي";
                    if (frow.children.length < 3) {
                      frow.appendChild(witoutFirst);
                    }
                  }
                } else {
                  firstSec.classList.remove("false");
                  noFirst.innerHTML = "أول السورة";
                  frow.children[0].style.display = ""
                    frow.children[1].style.display = ""
                if (frow.children[2]) {
                    frow.children[2].remove();
                  }
                  updateValue();
                  clacMemo();
                  Absent();
                }
                if (data.memoState == false) {
                  memoSec.classList.add("false");
                  noMemo.innerHTML = "بدون درس";
                  if (width > 580) {
                    mSrow.classList.add("disnone");
                    mLrow.classList.add("disnone")
                    if(mLrow.classList.contains("cell-visi")){
                      mRrow.setAttribute("colspan", "3");
                    }else{
                      mRrow.setAttribute("colspan", "2");
                    }
                    selectedMR.style.display = "none";
                    selectedMC.style.display = "none";
                    witoutmemo.innerHTML = "بدون درس";
                    if (mRrow.children.length < 3) {
                      mRrow.appendChild(witoutmemo);
                    }
                  } else {
                    selectedSurah.innerHTML = `بدون درس`;
                    selectedSurah.style.border = "none";
                    selectedMFT.style.display = "none";
                  }
                } else {
                  memoSec.classList.remove("false");
                  noMemo.innerHTML = "الدرس";
                  selectedSurah.style.border = "";
                  selectedMFT.style.display = "";
                  mSrow.classList.remove("disnone");
                  mLrow.classList.remove("disnone")
                  mRrow.setAttribute("colspan", "1");
                  selectedMR.style.display = "";
                  selectedMC.style.display = "";
                  if (mRrow.children[2]) {
                    mRrow.children[2].remove();
                  }
                  updateValue();
                  clacMemo();
                  Absent();
                }
                if (data.reviewState == false) {
                  revSec.classList.add("false");
                  noRev.innerHTML = "بدون مراجعة";
                  setTimeout(() => {
                    if (width > 580) {

                      rRrow.setAttribute("colspan", "4");
                      rSrow.classList.add("disnone")
                      rLrow.classList.add("disnone")
                      witoutrev.innerHTML = "بدون مراجعة";
                      if (rRrow.children.length < 1) {
                        rRrow.innerHTML = "";
                        rRrow.appendChild(witoutrev);
                      }
                    } else {
                      selectedRF.innerHTML = "بدون مراجعة";
                      selectedRF.style.border = "none";
                      selectedRT.style.display = "none";
                    }
                  }, 0);
                } else if (data.reviewState == true) {
                  revSec.classList.remove("false");
                  noRev.innerHTML = "المراجعة";
                  selectedRF.style.border = "";
                  selectedRT.style.display = "";
                  rSrow.classList.remove("disnone")
                  rLrow.classList.remove("disnone")
                  rRrow.setAttribute("colspan", "1");
                  if (rRrow.children[0]) {
                    rRrow.children[0].remove();
                  }
                  updateValue();
                  calcRev();
                  Absent();
                }
                // Calc Memoriztion Rate
                function clacMemo() {
                  if (typeof data.memoRate == "number") {
                    let timeDec = 0;
                    data.memoClass == "ب"
                      ? (timeDec = 0.5)
                      : data.memoClass == "ج"
                      ? (timeDec = 1)
                      : (timeDec = 0);
                    data.memoRate = 10 - data.misteaks - data.hesitateds / 2 - secondTime - timeDec  - firstSurahDeci;
                    if(data.memoRate > 10){
                      data.memoRate = 10
                    }
                    
                    if (data.memoRate > 4 && typeof data.memoRate == "number") {
                      memoRate.innerHTML = data.memoRate;
                    } else if (data.memoRate <= 3.5) {
                      memoRate.innerHTML = "لم يحفظ";
                    }
                  } else {
                    memoRate.innerHTML = "لم يسمع بعد";
                  }
                }
                clacMemo();
                // Calc Review Rate
                function calcRev() {
                  if (typeof data.reviewRate == "number") {
                    data.reviewRate = 10 - data.misteaksRev - data.hesitatedsRev / 2 - secondTimeRev;                   
                    if (
                      data.reviewRate > 4 &&
                      typeof data.reviewRate == "number"
                    ) {
                      revRate.innerHTML = data.reviewRate;
                    } else if (data.reviewRate <= 4) {
                      revRate.innerHTML = "لم يحفظ";
                    }
                  } else {
                    revRate.innerHTML = "لم يسمع بعد";
                  }
                }
                calcRev()
                // Automatic Re Memoriztion & Review
                let pressedMemoButton = true;
                let pressedRevButton = true;
                if(data.rememo == true){
                  pressedMemoButton = false;
                }
                if(data.rereview == true){
                  pressedRevButton = false;
                }
                if (((data.memoRate <= 5 && typeof data.memoRate == "number") || data.rememo == true) && data.AttendanceState != 2 ){
                  mSrow.style.backgroundColor = "#ff000078"
                  mSrow.style.color = "white"
                  data.rememo = true;
                } else if ((data.memoRate > 5 || typeof data.memoRate != "number"  && pressedMemoButton) && data.AttendanceState != 2  ){
                  mSrow.style.backgroundColor = ""
                  mSrow.style.color = ""
                  data.rememo = false;
                }
                if (((data.reviewRate <= 5 && typeof data.reviewRate == "number") || data.rereview == true) && data.AttendanceState != 2 ){
                  rSrow.style.backgroundColor = "#ff000078"
                  rSrow.style.color = "white"
                  data.rereview = true;
                }else if ((data.reviewRate > 5 || typeof data.reviewRate != "number" && pressedRevButton ) && data.AttendanceState != 2 ){
                  rSrow.style.backgroundColor = ""
                  rSrow.style.color = ""
                  data.rereview = false;
                }
                // Add color for Re Memoriztion & Review
                if(data.rememo == true){
                  noMemo.style.backgroundColor = "#fd5151"
                }else if(data.rememo == false){
                  noMemo.style.backgroundColor = ""
                }
                if(data.rereview == true){
                  noRev.style.backgroundColor = "#fd5151"
                }else if(data.rereview == false){
                  noRev.style.backgroundColor = ""
                }
                // Start from here boy
                
                nu.onclick = () => {
                  let deleteData = document.querySelector(".active td.number-body .delete-day");
                  deleteData.style.display = "flex";
                  deleteData.onclick = () => {
                    data.memoState = true;
                    data.rememo = false;
                    data.memoFirstTime = true;
                    data.memoSurah = "";
                    data.memoSurahFrom = "";
                    data.memoSurahTo = "";
                    data.memoSurahLines = "";
                    data.memoListen="";
                    data.memoTime = "";
                    data.hesitateds = 0;
                    data.misteaks = 0;
                    data.memoRate = "";
                    data.memoClass = "-";
                    data.reviewState = true;
                    data.rereview = false;
                    data.reviewFirstTime= true,
                    data.reviewSurahFrom = "";
                    data.reviewSurahTo = "";
                    data.reviewListener1 = "";
                    data.reviewListener2 = "";
                    data.reviewRate = "";
                    data.hesitatedsRev = 0;
                    data.misteaksRev = 0;
                    data.totalRate = 10;
                    calldata();
                    location.reload();
                  };
                  document.addEventListener("click", (eve) => {
                    if (!eve.target.matches(".active td.number-body")) {
                      deleteData.style.display = "none";
                    }
                  });
                };
                if(lastTsmee.length){
                  let breakMarks = true
                  lastTsmee.forEach((student , index)=>{
                    if(breakMarks){
                      if(Object.keys(student) == selectedName.innerHTML){              
                        student = student[Object.keys(student)]
                        let mfs = student.firstSurah
                        let mff = student.firstFrom;
                        let mft = student.firstTo;
                        let mms = student.memoSurah;
                        let mmf = student.memoFrom;
                        let mmt = student.memoTo;
                        let mml = student.memoLines;
                        let mmr = student.rememo
                        let mrf = student.revFrom;
                        let mrt = student.revTo;
                        let mrr = student.rereview
                        firstSurah.setAttribute("placeholder" , mfs )
                        firstFrom.setAttribute("placeholder" , mff )
                        firstTo.setAttribute("placeholder" , mft )
                        surahInput.setAttribute("placeholder" , mms)
                        memoFrom.setAttribute("placeholder" , mmf )
                        memoTo.setAttribute("placeholder" , mmt )
                        memoLines.setAttribute("placeholder" , mml )
                        revFrom.setAttribute("placeholder" , mrf )
                        revTo.setAttribute("placeholder" , mrt )
                          if(mmr == true){
                            mSrow.style.backgroundColor = "#ffa20078"
                          }
                          if(mrr == true && data.AttendanceState == 0){
                            rSrow.style.backgroundColor = "#ffa20078"
                          }  
                        breakMarks = false
                      }else{
                        let placeholderArray = [firstSurah ,firstFrom, firstTo  , surahInput , memoFrom ,
                          memoTo , memoLines , revFrom , revTo]
                          placeholderArray.forEach(e=>{
                            e.removeAttribute("placeholder")
                          })
                      }
                    }
                  })
                }

                // Send data to localStorage
                setAtLocalStorage();
                let currentSelected = document.querySelector("tr.active")
                if(currentSelected.classList[0].slice(1) != 372187){
                  clickSelf()
                }
              }
            });
          }
          // End Of Call Data Fucntion
          
          calldata();
          // Start second Time Decisivenes Memoriztion
          firstTime.onclick = function () {
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                if (data.memoFirstTime == true) {
                  data.memoFirstTime = false;
                } else {
                  data.memoFirstTime = true;
                  firstTime.checked = false;
                }
              }
            });
            updateValue();
            calldata();
            // clickSelf()
          };
          // Start second Time Decisivenes Review
          firstTimeRev.onclick = function () {
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                if (data.reviewFirstTime == true) {
                  data.reviewFirstTime = false;
                } else {
                  data.reviewFirstTime = true;
                  firstTimeRev.checked = false;
                }
              }
            });
            updateValue();
            calldata();
            // clickSelf()
          };
          // Start Getting Time For Rank
          timeCalc.onclick = function (data) {
            console.log(`Before : ${memolistener.value}`);
            
            let h = new Date().getHours();
            let m = new Date().getMinutes();
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                console.log(`DataBase : ${data.memoListen}`);
                if (data.memoClass != "-") {
                  if (h == 16) {
                    data.memoClass = "أ";
                  } else if (h == 17 && m < 25) {
                    data.memoClass = "ب";
                  } else if (h == 17 && m < 50) {
                    data.memoClass = "ج";
                  } else data.memoClass = "ج";
                }
              }
            });
            updateValue();
            calldata();
            console.log(`After : ${memolistener.value}`);
            // clickSelf()
          };
          // Start reMemo
          rememo.onclick = () => {
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                if (!data.rememo) {
                  data.rememo = true;
                } else if (data.rememo) {
                  data.rememo = false;
                }
                if (data.memoRate <= 5){
                  components.popup("warning" , "لا يمكن إزالة الإعادة .. درجة الطالب ضعيفة")
                }
              }
            });
            updateValue();
            calldata();
            // clickSelf()
          };
          // Start reReview
          rereview.onclick = () => {
            arrayOfToday.map((e) => {
              if (e[Object.keys(e)].studintname == selectedName.innerHTML) {
                let data = e[Object.keys(e)];
                if (!data.rereview) {
                  data.rereview = true;
                } else if (data.rereview) {
                  data.rereview = false;
                }
              }
            });
            updateValue();
            calldata();
          };
          // Start Attendence State
          function Attendence(...elemnents) {
            arrayOfToday.map((ele) => {
              if (ele[Object.keys(ele)].studintname == selectedName.innerHTML) {
                let data = ele[Object.keys(ele)];
                elemnents.forEach((e) => {
                  e.onclick = () => {
                    data.AttendanceState = e.value;
                    updateValue();
                    calldata();
                  };
                });
              }
            });
          }
          Attendence(atten0, atten1, atten2, atten3, atten4, atten5);
          // Start Behavior
          function behavior(...elemnents) {
            arrayOfToday.map((ele) => {
              if (ele[Object.keys(ele)].studintname == selectedName.innerHTML) {
                let data = ele[Object.keys(ele)];
                elemnents.forEach((e) => {
                  e.onclick = () => {
                    if (data.behaviorArray.length < 4) {
                      data.behaviorArray.push(`${e.value}`);
                      updateValue();
                      calldata();
                    } else {
                      components.popup(
                        "info",
                        "لا يمكن إضافة أكثر من 4 مخالفات للطالب الواحد"
                      );
                    }
                  };
                });
              }
            });
          }
          behavior(talk, sleep, noPirmission);
          // Start Witout Memoriztoin And Withour Review
          function noMemoRev(para, target) {
            arrayOfToday.map((ele) => {
              if (ele[Object.keys(ele)].studintname == selectedName.innerHTML) {
                let data = ele[Object.keys(ele)];
                para.onclick = () => {
                  if (data[target] == true) {
                    data[target] = false;
                  } else data[target] = true;
                  updateValue();
                  calldata();
                };
              }
            });
          }
          noMemoRev(noFirst , "firstSState")
          noMemoRev(noMemo, "memoState");
          noMemoRev(noRev, "reviewState");

          hideColumnAssis(hideFirstMemo , fHead , fBody)
          hideColumnAssis(hideMemoListen , mLHead , mLBody)
          hideColumnAssis(hideRevListen , rLHead , rLBody)  
          // Here is the End Of click cell Event
        });
      });
      // Start ShortCuts
      window.addEventListener("keydown" ,(eve) => {
        arrayOfToday.map((ele) => {
          if (ele[Object.keys(ele)].studintname == sn.innerHTML) {
            let data = ele[Object.keys(ele)];
            let current = document.querySelector("tbody tr.active")
            if(eve.altKey && eve.code == "KeyY"){
              data.AttendanceState == 2 ? data.AttendanceState = "0" : data.AttendanceState = 2
              current.click()
            }
            if(eve.altKey && eve.code == "BracketRight"){
              data.rememo == true ? data.rememo = false : data.rememo = true ;
              current.click()
            }
            if(eve.altKey && eve.code == "KeyL"){
              data.rereview == true ? data.rereview = false : data.rereview = true
              current.click()
            }
          }
        });
      })
      // End ShortCuts
      if(checkedRotate == false){
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
        checkedRotate = true  
        // console.clear()
      }

      // All Vacation
      allVacation.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.AttendanceState = 1;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };

      // All Absent With Permation
      allAbsWithPerm.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.AttendanceState = 5;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };

      // All Absent Without Permation
      allAbsWithOutPerm.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.AttendanceState = 2;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };

      // All Present
      allPresnt.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.AttendanceState = 0;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };

      // All Without Memotioztion
      allNoMemo.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.memoState = false;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };
      
      // All Without Review
      allNoReview.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.reviewState = false;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };
      
      // All Without First
      allNoFirst.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.firstSState = false;
        });
          rows.forEach((e) => {
            e.click();
          });
        rows[0].click();
      };
      
      // All With First
      allOptionActive.onclick = () => {
        arrayOfToday.map((ele) => {
          let data = ele[Object.keys(ele)];
          data.memoState = true;
          data.reviewState = true;
          data.firstSState = true;
        });
        rows.forEach((e) => {
          e.click();
        });
        rows[0].click();
      };
        
      // Here is the end of (Then)
    }
  )
  .catch((reg) =>
    components.popup("warning", "عفوا .. حصل خطأ الرجاء تحديث الصفحة")
  );

// More Option For Attendece
let moreOptionA = document.querySelector(".more-option");
let moreOptionAlist = document.querySelector(".more-option ~ ul");
let allVacation = document.getElementById("all-1");
let allAbsWithPerm = document.getElementById("all-2");
let allAbsWithOutPerm = document.getElementById("all-3");
let allPresnt = document.getElementById("all-4");
moreOptionA.addEventListener("click" , () => {
 if (moreOptionAlist.style.display == "block"){
  moreOptionAlist.style.display = "none"
}else{
  moreOptionAlist.style.display = "block"
 }
    window.addEventListener("click",(eve) => {
      if (
        !eve.target.matches(".more-option ~ ul>li") &&
        !eve.target.matches(".more-option")
      ) {
        moreOptionAlist.style.display = "none";
      }
    })  
  });

// More Option For Memotiztion & Review & First Status
let moreOptionB = document.querySelector(".more-option.second");
let moreOptionBlist = document.querySelector(".more-option.second ~ ul");
let allNoMemo = document.getElementById("all-M1");
let allNoReview = document.getElementById("all-M2");
let allNoFirst = document.getElementById("all-M3");
let allOptionActive = document.getElementById("all-M4");
moreOptionB.onclick = () => {
  moreOptionBlist.style.display == "block"
    ? (moreOptionBlist.style.display = "none")
    : (moreOptionBlist.style.display = "block");
  window.addEventListener("click",(eve) => {
    if (
      !eve.target.matches(".more-option.second ~ ul>li") &&
      !eve.target.matches(".more-option.second")
    ) {
      moreOptionBlist.style.display = "none";
    }
  })  
};

let revFrom = document.getElementById("from-review");
let revTo = document.getElementById("to-review");
let listiner = document.getElementById("listener1");
// Auto complate for review
let currentStudentSurah = []
fetch("https://thfid.github.io/DataBase/Students.json")
.then(res=> res.json())
.then(res=>{
  res.map(e=>{
    let id = Object.keys(e).join("")
    let currentSurah = e[Object.keys(e)].currentSurah
    if( e[Object.keys(e)].state == true){
      currentStudentSurah.push(`${id}${currentSurah}`)
    }
  })
}).then(res=>{
  // Memoriztion Listener
  let rows = document.querySelectorAll("table tbody tr")
  let listenerData = [];
  rows.forEach(e=>{
    let studentId = e.classList[0].slice(1) ;
    let studentName = e.children[1].innerHTML ;
    listenerData.push([studentId , studentName , 0])
  })
  if (!localStorage.getItem(`${HijriJS.today().toString().split("/")[0]}ML`)){
    localStorage.setItem(`${HijriJS.today().toString().split("/")[0]}ML` , JSON.stringify(listenerData))
  }
  
}).catch(rej=> components.popup("warning" , "حصل خطأ .. التعبئة التلقائية للمراجعة غير مغعلة"))

// console.log(availableResult.indexOf("المجادلة"))
revFrom.addEventListener("blur" , function(){
  let value = revFrom.value
  let selectedStudent = document.querySelector("tr.active").classList[0].slice(1)

  let currentSurah = ""
  let indexOfSurah = 0
  currentStudentSurah.map(e=>{
    if (e.match(/\d+/gm).join("") == selectedStudent){
      currentSurah = e.match(/\D+/gm).join("")
      indexOfSurah = availableResult.indexOf(currentSurah)
    }
  })

    if(value != ""){
      availableReviews.map((review , index , array)=>{
        if (value === review[0]){
          // for studen that has memorized (المجادلة)
          if(indexOfSurah >= 56  && index == 0){
            revTo.value = array[index + 1][1]
          } else if(indexOfSurah >= 56  && index == 2){
            revTo.value = array[index + 1][1]
          }else if(indexOfSurah >= 56  && index == 4){
            revTo.value = array[index + 1][1]
          }
          else if(indexOfSurah >= 56  && index == 6){
            revTo.value = array[index + 1][1]
          }
          else{
            revTo.value = review[1]
          }
          setTimeout(() => {
            listiner.focus()
          }, 100); 
        }
      })
    }
})

// Start Fetch YesterDay Info
let selectedDay = HijriJS.today().toString().split("/")[0]
let selectedMonth = HijriJS.today().toString().split("/")[1]
let selectedYear = HijriJS.today().toString().split("/")[2].slice(0,4)
let currentYear = selectedYear
let currentMonth = +selectedMonth
let currentWeek = Math.floor(+selectedDay / 7)
if(!localStorage.getItem(`LT-${HijriJS.today().toString().split("/")[0]}-${teatcherId}`)){
  fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/${currentYear.slice(2)}/${currentMonth.toString().padStart(2,"0")}/PeriodicEvaluation.json`)
  .then(res=> res.json())
  .then(res=>{
    let database = res[currentMonth.toString().padStart(2,"0")]
    let dbc = 0;
    dbc = database.length - 1

      database[dbc][Object.keys(database[dbc])].daily.map((e , i)=>{
        let data = e[Object.keys(e)]
        if(data.teatcherId == teatcherId){
        let firstSurah = data.firstSurah
        let firstFrom = data.firstFrom;
        let firstTo = data.firstTo;
        let memoSurah = data.memoSurah;
        let memoFrom = data.memoSurahFrom;
        let memoTo = data.memoSurahTo;
        let memoLines = data.memoSurahLines;
        let rememo = data.rememo
        let revFrom = data.reviewSurahFrom;
        let revTo = data.reviewSurahTo;
        let rereview = data.rereview

        lastTsmee.push({[data.studintname]:{
          firstSurah : firstSurah,
          firstFrom : firstFrom,
          firstTo : firstTo,
          memoSurah : memoSurah,
          memoFrom : memoFrom,
          memoTo : memoTo,
          memoLines : memoLines,
          rememo : rememo,
          revFrom : revFrom,
          revTo : revTo,
          rereview : rereview
        }})
      }
      })

    lastTsmee.forEach(e=>{
      let data = e[Object.keys(e)]
      let studentName = Object.keys(e).join("")
      let firstSurah = data.firstSurah
      let memoSurah = data.memoSurah;
      let revFrom = data.revFrom;
      let studentarray = [firstSurah , memoSurah , revFrom ];
      studentarray.map((ele , index)=>{ 
        function checkValue(parameter){
          if(ele == ""){
            database[parameter][Object.keys(database[parameter])].daily.map((student , i)=>{
              let secondData = student[Object.keys(student)]
              if (secondData.studintname == studentName) {
                switch(index){
                  case 0 :
                    if(data.firstSurah == ""){
                    data.firstSurah = secondData.firstSurah || ""
                    data.firstFrom  = secondData.firstFrom || ""
                    data.firstTo  = secondData.firstTo || ""
                    }
                    break;
                  case 1 :
                    if(data.memoSurah == ""){
                      data.memoSurah  = secondData.memoSurah || "";
                      data.memoFrom  = secondData.memoSurahFrom || "";
                      data.memoTo  = secondData.memoSurahTo || "";
                    }
                    break;
                  case 2 :
                    if(data.revFrom == ""){
                      data.revFrom  = secondData.reviewSurahFrom || ""
                      data.revTo  = secondData.reviewSurahTo || ""  
                    }
                    break;
                }
              }
            })
          }
        }
        for(let i = database.length - 2 ; i >= 0 ; i --){
          if(ele == ""){
            checkValue(i)
          }
        }
      })
    })
  }).then(res=>{
    localStorage.setItem(`LT-${HijriJS.today().toString().split("/")[0]}-${teatcherId}` , JSON.stringify(lastTsmee))
    lastTsmee = JSON.parse(localStorage.getItem(`LT-${HijriJS.today().toString().split("/")[0]}-${teatcherId}`))
  }
  )
}else{
  lastTsmee = JSON.parse(localStorage.getItem(`LT-${HijriJS.today().toString().split("/")[0]}-${teatcherId}`))
}

// Start Enter foucs {
let firstSec = document.querySelector(".first-surah")
let firstSurah = document.getElementById("first-surah")
firstFrom = document.getElementById("from-first")
let firstTo = document.getElementById("to-first")
firstListener = document.getElementById("first-listener")
// Memoriztion Inputs
let surah = document.getElementById("surah");
let memoFrom = document.getElementById("from-memo");
let memoTo = document.getElementById("to-memo");
let memoLines = document.getElementById("counter-memo");
let memoListener = document.getElementById("memo-listener")
let timeCalc = document.getElementById("timecalc");
// Review Inputs
revFrom = document.getElementById("from-review");
revTo = document.getElementById("to-review");
let revlistener1 = document.getElementById("listener1");
let revlistener2 = document.getElementById("listener2");

function entergoto(input1 , input2){
  input1.addEventListener("keydown" , (eve) =>{
    if(eve.key == "Enter"){
      eve.preventDefault()
      input2.focus()
    }
  })
}
// First Of surah
entergoto(firstSurah , firstFrom)
entergoto(firstFrom , firstTo)
entergoto(firstTo , firstListener)
// Memorization
entergoto(surah , memoFrom)
entergoto(memoFrom , memoTo)
entergoto(memoTo, memoLines)
entergoto(memoLines , memoListener)
entergoto(memoListener , timeCalc)
// Review
entergoto(revFrom , revTo)
entergoto(revTo , revlistener1)
entergoto(revlistener1 , revlistener2)

// End Enter Foucs }