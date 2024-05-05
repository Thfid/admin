import HijriJS from "./Hijri.js"
import * as surahJs from "./surah.js"
import * as components from "./Eshada.js"

let groups = []
let studentsAvailable = []
let studentInGroup = []
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
let mosqueNumber = ""
let teatcherId = ""
if(sessionStorage.getItem("Info")){
    let data = JSON.parse(sessionStorage.getItem("Info"));
    mosqueNumber =  data.mosqueNumber.slice(1);
    teatcherId = data.teatcherId
    getStudentData()
}else{
    // Here but the 501 error
}

function getStudentData(){
  fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/Students.json`)
  .then(res=> res.json())
  .then(res=>{
      res.map(e=>{
          let data = e[Object.keys(e)]
          if (data.teatcherId == teatcherId && data.state == true){
              let studintname = data.studintName.split(" ");
              studintname = `${studintname[0].replace("_"," ")} ${studintname[1].replace("_", " ")} ${studintname[3] ? studintname[3].replace("_", " "): studintname[2].replace("_", " ")}`
              studentsAvailable.push(studintname);
          }
      });
      removeAddedStudent()
  })
}

function removeAddedStudent(){
  if(studentsAvailable.length){
    studentsAvailable.map(e=>{
      if (studentInGroup.includes(e)){
        let index =  studentsAvailable.indexOf(e)
        studentsAvailable.splice(index , 1)
      }
    })  
  }
}

fetch(`https://thfid.github.io/DataBase/${mosqueNumber}/Groups.json`)
.then(res=>res.json())
.then(res=>{
  groups = res
  if(!localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
    localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , JSON.stringify(groups))
  } else{
    groups = JSON.parse(localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`))
  }
})
.then(res=>{

// Auto Complete
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
          `#${inputbox.id} ~ .autocomplete ul li`
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
 

function CheckLeaderDeputy(para){
    let members = document.querySelectorAll(`#${para} tr`)
    let leader = "No"
    let deputy = "No"
    members.forEach(e=>{
        e.classList.contains("leader") ? leader = "Yes" : leader = leader
        e.classList.contains("deputy") ? deputy = "Yes" : deputy = deputy
    })
    return [leader , deputy]
}

let addTabel = document.getElementById("add-table")
let edtiTable = document.getElementById("edit-table")
// Start Add gourp
let addGroupBox = document.getElementById("add-group-box")
let addGroupBtn = document.querySelector("#add-group > span")
addGroupBtn.onclick = ()=>{
    addGroupBox.classList.toggle("disnone")
}
function nodataOnAddTable (para){
  if(!para.children.length){
    para.innerHTML = `<tr class="no-data"> 
    <td colspan="3"> سيظهر الطلاب  هنا بعد الاضافة</td>
    </tr>`
}
}
nodataOnAddTable (addTabel)
// Inputs 
let studentName = document.getElementById("student-name")
let aCompleteSN = document.querySelector(".autocomplete.student-name")
let studentRank = document.getElementById("student-rank")

let studentNameEdit = document.getElementById("student-name-edit")
let aCompleteSNE = document.querySelector(".autocomplete.student-name-edit")
let studentRankEdit = document.getElementById("student-rank-edit")
// Auto Complete for StudentName
eleonkeyup(
  studentName , 
  studentsAvailable , 
  aCompleteSN ,
  "sNClick"
)  
eleonkeyup(
  studentNameEdit , 
  studentsAvailable , 
  aCompleteSNE ,
  "sNEClick"
)  

studentName.addEventListener("keyup" , (eve)=>{
    let members = document.querySelectorAll("#add-table tr")
    if(CheckLeaderDeputy("add-table")[0] == "No"){
        studentRank.options.selectedIndex = 1
        studentRankEdit.options.selectedIndex = 1
    }
    if(CheckLeaderDeputy("add-table")[0] == "Yes" && CheckLeaderDeputy("add-table")[1] == "No" && members.length == 1){
        studentRank.options.selectedIndex = 2
        studentRankEdit.options.selectedIndex = 2
    }
    if(CheckLeaderDeputy("add-table")[0] == "Yes" && (CheckLeaderDeputy("add-table")[1] == "Yes" || members.length > 1)){
        studentRank.options.selectedIndex = 3
        studentRankEdit.options.selectedIndex = 3
    }    
})
// Buttons
let addstudentBtn = document.getElementById("add-student")
let deleteStudentBtn = document.getElementById("delete-student")
let submitGroupBtn = document.getElementById("submit-group")
let rejectGroupBtn = document.getElementById("reject-group")

addstudentBtn.addEventListener("click" , (eve)=>{
    let members = document.querySelectorAll("#add-table tr")
    let accessState = true
    let counter = 1
    members.forEach(e=> {
        if(e.classList.contains("no-data")){e.remove()} 
        else {
            if(e.children[1].innerHTML == studentName.value){
              accessState = false
            }  else{
              counter +=1
            }
        }
    })
    if(accessState){
      if(!studentInGroup.includes(studentName.value)){
        addTabel.innerHTML += `
        <tr class="${studentRank.value == "leader" ? "leader" : studentRank.value == "deputy" ? "deputy" : "member"}" >
            <td class="number-body"> 
            <div>${counter}</div>
             <span class="delete-student">
             <i class="fa-solid fa-x"></i>
             </span>
             </td>
            <td class=""name-body"">${studentName.value}</td>
            <td>${studentRank.value == "leader" ? "قائد" : studentRank.value == "deputy" ? "نائب" : "عضو"}</td>
        </tr>`
      } else {
        components.popup("warning" , "الطالب المراد إضافته موجود في مجموعة أخرى")
        nodataOnAddTable(addTabel)
      }  
    }else{
      components.popup("warning" , "الطالب المراد إضافته موجود في مجموعة أخرى")
      nodataOnAddTable(addTabel)
    }
    studentRank.options.selectedIndex = 0
    studentName.value = ""
    deleteStudent()
    studentName.focus()
})


function deleteStudent(){
    let members = document.querySelectorAll("span.delete-student")
    members.forEach((e , index , array)=>{
        e.addEventListener("click" , (eve)=>{
            e.parentElement.parentElement.remove()
            nodataOnAddTable (addTabel)
            nodataOnAddTable(edtiTable)
        })
    })
}

deleteStudentBtn.addEventListener("click" , (eve)=>{
  studentRank.options.selectedIndex = 0
  studentName.value = ""
})



rejectGroupBtn.addEventListener("click" , (eve)=>{
  let tabel = document.getElementById("add-table")
  tabel.innerHTML = `<tr class="no-data"> 
  <td colspan="3"> سيظهر الطلاب  هنا بعد الاضافة</td>
  </tr>`
  studentName.value = ""
  studentRank.options.selectedIndex = 0
  addGroupBox.classList.add("disnone")
})

let content = document.querySelector(".groups .container")

submitGroupBtn.onclick = ()=>{
  let group = {}
  let addedRows = document.querySelectorAll("#add-table tr")
  if(addedRows.length > 2){
    addedRows.forEach((e , i)=>{
      group[`members${i + 1}`] = 
      {
        membername : e.children[1].innerHTML.trim(),
        memberRank : e.children[2].innerHTML.trim()
      }
    })
    group.teatcherId = teatcherId
    checkSize()
    rejectGroupBtn.click()
    groups.push(group)
    // Start Group LocalStorage 
    if (!localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
      let data = JSON.stringify(groups)
      localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , data)
    } else {
      let data = JSON.parse(localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`))
      data.push(group)
      data = JSON.stringify(data)
      localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , data)
    }
    callData()
    components.popup("accept" , "تم إضافة المجموعة بنجاح")
  }else{
    components.popup("info" , "يجب ان يكون عدد الأعضاء 3 على الأقل للإضافة")
  }
}



function callData(){
  if (localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
    content.innerHTML = ``
    let data = JSON.parse(localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`))
    data.map((e , index)=>{
      if(e.teatcherId == teatcherId){
        let box = document.createElement("div");
      box.classList.add("box")
      box.setAttribute("table-number" , index)
    
      let title = document.createElement("div")
      title.classList.add("title")
    
      let groupNumber = components.arabicNumberWriten[content.children.length]
      let innerTitle = document.createElement("div")
      innerTitle.classList.add("title-content")
      innerTitle.innerHTML = `المجموعة ${groupNumber}`
      title.appendChild(innerTitle)
    
      let contentHolder = document.createElement("div")
      contentHolder.classList.add("content")
    
      let table = document.createElement("table")
      let thead = document.createElement("thead")
      thead.innerHTML = `              
      <th class="number-head">العدد</th>
      <th class="name-head">الاسم</th>
      <th class="rank-head">الرتبة</th>
    `
    let tbody = document.createElement("tbody")
  
      let group = e
      let groupMembersNum = Object.keys(group).length
      for (let i = 0 ; i < groupMembersNum - 1 ; i++){
        let rank = group[`members${i + 1}`].memberRank
        switch (rank) {
          case "قائد":
              rank = "leader"
            break;
          case "نائب":
              rank = "deputy"
            break;
        
            default:
              rank = "member"
              break;
            }            
        tbody.innerHTML += `
        <tr class="${rank}">
          <td class="number-body">${i + 1}</td>
          <td class="name-body">${group[`members${i + 1}`].membername}</td>
          <td cla>${group[`members${i + 1}`].memberRank}</td>
        </tr>
        `
        if(!studentInGroup.includes(group[`members${i + 1}`].membername)){
          studentInGroup.push(group[`members${i + 1}`].membername)
        }
      }
      box.appendChild(title)
      table.appendChild(thead)
      table.appendChild(tbody)
      contentHolder.appendChild(table)
      box.appendChild(contentHolder)
      content.appendChild(box)
      removeAddedStudent()
      checkSize()  
      }
    })
  }  
}
callData()
// End of Add group
function checkSize(){
  if((window.innerWidth < 1200 && window.innerWidth > 992) || (window.innerWidth < 710 && window.innerWidth > 650)){
    let namesRows = document.querySelectorAll(".name-body")
    namesRows.forEach(e=>{
    let a = e.innerHTML.split("")
      if (a.length > 20){
        a.length = 20
        a = a.join("")
        a += "..."
        e.innerHTML = a
      }
    })
  }  
}
checkSize()
window.addEventListener('resize' , ()=>{
  checkSize()
})

// Start Edit
let editBox = document.getElementById("edit-group-box")
let editBtn = document.getElementById("edit-group")
editBtn.onclick = (eve)=>{
  let mainbtn = document.querySelector("#edit-group > span")
  if (eve.target == mainbtn){
    let boxs = document.querySelectorAll(".box")

    components.addOverLayQuarter()
    let overlay = document.getElementById("overlay")
    let editErea = document.createElement("div")
    editErea.classList.add("edit-erea")
    let closebtn = document.createElement("span")
    closebtn.innerHTML = `<i class="fa-solid fa-x"></i>`
  
    editErea.appendChild(closebtn)
    editErea.innerHTML += `إختر المجموعة المراد تعديلها`
    document.body.appendChild(editErea)
  
    boxs.forEach(e=>{
      e.classList.add("edit-mode")
      e.onclick =  (ev)=>{
          if(e.classList.contains("edit-mode")){
            e.classList.add("edit-selected")
              overlay.remove()
              editErea.remove()  
              editselected()
              boxs.forEach(e=>{e.classList.remove("edit-mode")})  
          }
        }  
    })

  
    let innerClose = document.querySelector(".edit-erea span")
    innerClose.onclick = (ev)=>{
      overlay.remove()
      editErea.remove()
      boxs.forEach(e=>{
        e.classList.remove("edit-mode")
        e.classList.remove("edit-selected")
      })
    }
  }
}

function editselected(){
  editBox.classList.remove("disnone")
  let selectedTable = document.querySelector(".box.edit-selected")
  let edtiTableBody = document.getElementById("edit-table")
  let tabelId = selectedTable.getAttribute("table-number")
  let closeEdit = document.getElementById("close-edit")

// Buttons
  let addstudentBtnE = document.getElementById("add-student-edit")
  let deleteStudentBtnE = document.getElementById("delete-student-edit")
  let submitGroupBtnE = document.getElementById("submit-edit-group")

  addstudentBtnE.onclick = (eve)=>{
    let accessState = true
    let members = document.querySelectorAll("#edit-table tr")
    let counter = 1
    members.forEach(e=> {
      if(e.classList.contains("no-data")){e.remove()} 
      else {
          if(e.children[1].innerHTML == studentNameEdit.value){
            accessState = false
          }  else{
            counter +=1
          }
      }
    })
    if(accessState){
      if(!studentInGroup.includes(studentNameEdit.value)){
        edtiTableBody.innerHTML += `
        <tr class="${studentRankEdit.value == "leader" ? "leader" : studentRankEdit.value == "deputy" ? "deputy" : "member"}" >
            <td class="number-body"> 
            <div>${counter}</div>
            <span class="delete-student">
            <i class="fa-solid fa-x"></i>
            </span>
            </td>
            <td class=""name-body"">${studentNameEdit.value}</td>
            <td>${studentRankEdit.value == "leader" ? "قائد" : studentRankEdit.value == "deputy" ? "نائب" : "عضو"}</td>
        </tr>`
      } else {
        components.popup("warning" , "الطالب المراد إضافته موجود في مجموعة بالفعل")
        nodataOnAddTable(edtiTable)
      }
    } else {
      components.popup("warning" , "الطالب المراد إضافته موجود في مجموعة بالفعل")
      nodataOnAddTable(edtiTable)
    }
    studentRankEdit.options.selectedIndex = 0
    studentNameEdit.value = ""
    deleteStudent()
    studentNameEdit.focus()
  }

  deleteStudentBtnE.addEventListener("click" , (eve)=>{
    studentRankEdit.options.selectedIndex = 0
    studentNameEdit.value = ""
  })
  
  studentNameEdit.addEventListener("keyup" , ()=>{
    let members = document.querySelectorAll("#edit-table tr")
    if(CheckLeaderDeputy("edit-table")[0] == "No"){
        studentRankEdit.options.selectedIndex = 1
    }
    if(CheckLeaderDeputy("edit-table")[0] == "Yes" && CheckLeaderDeputy("add-table")[1] == "No" && members.length == 1){
        studentRankEdit.options.selectedIndex = 2
    }
    if(CheckLeaderDeputy("edit-table")[0] == "Yes" && (CheckLeaderDeputy("add-table")[1] == "Yes" || members.length > 1)){
        studentRankEdit.options.selectedIndex = 3
    }    
  })
  edtiTable = document.getElementById("edit-table")
  edtiTable.innerHTML = ``

  closeEdit.onclick = ()=>{
    selectedTable.classList.remove("edit-selected")
    studentNameEdit.value = ""
    studentRankEdit.value = ""
    editBox.classList.add("disnone")
    selectedTable.classList.remove("edit-selected")
  }
  let rows = selectedTable.children[1].children[0].children[1].children
  for (let i = 0 ; i < rows.length ; i++){
    let rank = rows[i].classList[0]
    edtiTable.innerHTML += `
    <tr class="${rank}">
      <td class="number-body">
      <div>${rows[i].children[0].innerHTML}</div>
           <span class="delete-student">
           <i class="fa-solid fa-x"></i>
           </span>
           </td>
      <td class="name-body">${rows[i].children[1].innerHTML}</td>
      <td>${rows[i].children[2].innerHTML}</td>
    </tr>
    `
  }
  submitGroupBtnE.onclick = ()=>{
    let group = {}
    let addedRows = document.querySelectorAll("#edit-table tr")
    addedRows.forEach((e , i)=>{
      group[`members${i + 1}`] = 
      {
        membername : e.children[1].innerHTML.trim(),
        memberRank : e.children[2].innerHTML.trim()
      }
    })
    checkSize()
    rejectGroupBtn.click()
    group.teatcherId = teatcherId
    groups[tabelId] = group
    // Start Group LocalStorage 
    console.log(groups);
    if (!localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
      let data = JSON.stringify(groups)
      localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , data)
    } else {
      let data = JSON.stringify(groups)
      localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , data)
    }
    callData()
    studentRankEdit.options.selectedIndex = 0
    studentNameEdit.value = ""
    components.popup("accept" , "تم حفظ التعديل بنجاح")
    edtiTable = ``
    editBox.classList.add("disnone")
    selectedTable.classList.remove("edit-selected")
  }
  deleteStudent()
}

// End Edit

// Start Delete 
let deleteGroubBtn = document.getElementById("delete-group")
deleteGroubBtn.onclick = (eve)=>{
  let mainbtn = document.querySelector("#delete-group > span")
  if (eve.target == mainbtn){
    let boxs = document.querySelectorAll(".box")

    components.addOverLayQuarter()
    let overlay = document.getElementById("overlay")
    let editErea = document.createElement("div")
    editErea.classList.add("edit-erea")
    let closebtn = document.createElement("span")
    closebtn.innerHTML = `<i class="fa-solid fa-x"></i>`
  
    editErea.appendChild(closebtn)
    editErea.innerHTML += `إختر المجموعة المراد حذفها`
    document.body.appendChild(editErea)
  
    boxs.forEach(e=>{
      e.classList.add("edit-mode")
      e.onclick =  (ev)=>{
        if(e.classList.contains("edit-mode")){
          e.classList.add("delete-selected")
          overlay.remove()
          editErea.remove()
          acceptDelete()
          boxs.forEach(e=>{
            e.classList.remove("edit-mode")
          })
        }
      }
    })
  
    let innerClose = document.querySelector(".edit-erea span")
    innerClose.onclick = (ev)=>{
      overlay.remove()
      editErea.remove()
      boxs.forEach(e=>{
        e.classList.remove("edit-mode")
        e.classList.remove("delete-selected")
      })
    }
  }
}

function acceptDelete(){
  components.addOverLay()
  let overlay = document.querySelector(".overlay")
  overlay.style.zIndex = 11;
  let selectedGroub = document.querySelector(".delete-selected")
  let deleteId = selectedGroub.getAttribute("table-number")

  let deletearea = document.createElement("div")
  deletearea.classList.add("delete-erea")
  let closebtn = document.createElement("span")
  closebtn.classList.add("delete-erea-close")
  closebtn.innerHTML = `<i class="fa-solid fa-x"></i>`

  let yesBtn = document.createElement("button")
  yesBtn.appendChild(document.createTextNode("تأكيد"))
  yesBtn.classList.add("btn-delete")
  yesBtn.classList.add("yes")
  let noBtn = document.createElement("button")
  noBtn.appendChild(document.createTextNode("تراجع"))
  noBtn.classList.add("btn-delete")
  noBtn.classList.add("no")
  let btnholder = document.createElement("div")
  btnholder.classList.add("delete-btn-holder")
  btnholder.appendChild(yesBtn)
  btnholder.appendChild(noBtn)

  deletearea.appendChild(closebtn)

  deletearea.innerHTML += `
    <span class="icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
    <span class="title">هل أنت متأكد من حذف المجموعة المختارة ؟</span>
  `
  deletearea.appendChild(btnholder)
  document.body.appendChild(deletearea)

  closebtn = document.querySelector(".delete-erea-close")
  closebtn.onclick = ()=>{
    deletearea.remove()
    overlay.remove()
    selectedGroub.classList.remove("delete-selected")
  }

  noBtn = document.querySelector(".btn-delete.no")
  noBtn.onclick = ()=>closebtn.click()

  yesBtn = document.querySelector(".btn-delete.yes")
  yesBtn.onclick = ()=>{
    groups.splice(deleteId , 1)
    if (!localStorage.getItem(`groups ${HijriJS.today().toString().split("/")[0]}`)){
      let data = JSON.stringify(groups)
      localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , data)
    } else {
      let data = JSON.stringify(groups)
      localStorage.setItem(`groups ${HijriJS.today().toString().split("/")[0]}` , data)
    }
    callData()
    components.popup("accept" , "تم حذف المجموعة بنجاح")
    closebtn.click()
  }
}

// End Delete
})

