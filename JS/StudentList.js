import HijriJS from "./Hijri.js"
import * as components from "./Eshada.js"

let users =[]
// GitHub
fetch("https://thfid.github.io/DataBaseCloned/Teatchers.json")
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
let goBack = document.getElementById("goback")
goBack.onclick = ()=>{
    history.back()
}
// Start Up Down Buttons
let upbutton = document.querySelector(".up-down-holder .up");
let centerbutton = document.querySelector(".up-down-holder .center");
let downbutton = document.querySelector(".up-down-holder .down");

upbutton.onclick = () => {
  scrollTo(0, 0);
};
centerbutton.onclick = () => {
  scrollTo(0, 240);
};
downbutton.onclick = () => {
  scrollTo(0, 2000);
};
// End Up Down Buttons
let table = document.getElementById("table-body")
let studentArray = [];

fetch("https://thfid.github.io/DataBaseCloned/Students.json")
.then(res=>res.json())
.then(
  res=>{
    res.map(e=>{
    let student = e[Object.keys(e)]
    studentArray.push(student)
     })
    //  Sory array by name
     studentArray.sort((a, b) => {
      let first = a.studintName;
      let second = b.studintName;
      if (first < second) {
        return -1;
      }
      if (first > second) {
        return 1;
      }
      return 0;
    });
  }
  ).then(
    res=>{
    let counter = 1
    studentArray.map(e=>{
      
      let dateOfBirth = HijriJS.toGregorian(e.studintAge , "/")
      let date = new Date(dateOfBirth)
      let n = date.getFullYear()
      let defferent = new Date()
      let age = defferent.getFullYear() - n;
      isNaN(age) ? age = `` : age = age;
      let studentName = e.studintName.split(" ")
      studentName = studentName.map(e=>e.replace("_" , " "))
      studentName = `${studentName[0]} ${studentName[1]} ${studentName[3] ? studentName[3] : studentName[2]}`
      let rejeseterDate = e.registerDate.split("").slice(0,10).join("").split("/").reverse().join("/")

      if (e.state){
      table.innerHTML += `
      <tr>

      <th class="number body col-sticky">${counter}</th>
      
      <th class="name body col-sticky ">${studentName}</th>

      <td class="age">
          <span class="age-body">${age}</span>
      </td>

      <td class="parent-phone">${e.parentPhone}</td>

      <td class="student-phone">${e.studintPhone}</td>

      <td class="student-surah">${e.currentSurah}</td>

      <td class="state">
          <span class="state-body">${rejeseterDate}</span>
      </td>

  </tr>

      `
      counter +=1
    }
    })
  }
  ).then(res=>{
    let parentPhone = document.querySelectorAll(".studint-taple .container table tbody tr td.parent-phone")
    let studentPhone = document.querySelectorAll(".studint-taple .container table tbody tr td.student-phone")
    
    function whatsapp(btn){
      btn.addEventListener("click" , function(){
        if (btn.innerHTML.match(/\d/gm)){
          let link = document.createElement("a")
          link.target = `_blank`
          link.href = `https://api.whatsapp.com/send?phone=966${btn.innerHTML.split("").slice(1).join("")}`
          document.body.appendChild(link);
          link.click()
          link.remove()
        }
      })
    }
    parentPhone.forEach(e=>whatsapp(e))
    studentPhone.forEach(e=>whatsapp(e))

  })
