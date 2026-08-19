const btn = document.getElementById("submit-btn");
const input = document.getElementById("task");
let msg = document.querySelector(".message");
const tbody = document.querySelector("tbody");
const task_list = JSON.parse(localStorage.getItem("taskList")) || [];


// Load Data on Page Before Add
displayTask();


btn.addEventListener("click",function(){
    let task = input.value;
    if(task == ""){
        ShowMessage("Please! Enter Valid Task...", "red");
    }else{
        task_list.push(task);
        input.value = '';
        localStorage.setItem("taskList",JSON.stringify(task_list));
        displayTask();
        ShowMessage("Successfuly! Added Task...", "green");
    }


})


// display data on webpage
function displayTask(){
    tbody.innerHTML="";

    for(let i=0;i<task_list.length;i++){
        const tr = document.createElement("tr");
        
        tr.innerHTML = `<td>${i}</td>
                        <td>${task_list[i]}</td>
                        <td><button class="del_btn" style="background:red;">Del</button></td>
                        <td><button class="edit_btn" style="background:green;">Edit</button></td>`;
        
        const edit_btn = tr.querySelector(".edit_btn");
        edit_btn.addEventListener("click",()=>{ 
            EditTask(task_list[i],i)
        })                

        const del_btn = tr.querySelector(".del_btn");
        del_btn.addEventListener("click",()=>{
            task_list.splice(i,1);
            localStorage.setItem("taskList",JSON.stringify(task_list));

            displayTask();
        })

        tbody.appendChild(tr);
    }
    
}

// separate function when user add new task
function ShowMessage(Value, Color){
    let count = 0
    const timerOut = setInterval(()=>{
        count++;
        msg.innerHTML = Value;
        msg.style.display = "block";
        msg.style.color = "white";
        msg.style.background = Color;

        if(count == 12){
            msg.innerHTML = "";
            clearInterval(timerOut)
            msg.style.display = "none";
        }
    },100)
}


// run when edit task 
function EditTask(task,index){
    const body = document.querySelector("body");
    const editBox = document.createElement("div");

    editBox.className = 'editBox';
    editBox.innerHTML = `<div class="edit-inner-box">
                          <textarea id="editText">${task}</textarea><br>
                          <button id="saveBtn" class="submit-btn" style="width:100%; border-radius:15px;">Save</button>
                          <button id="cancelBtn" class="submit-btn" style="width:100%; background:red; border-radius:15px;">Cancel</button>
                        </div>`;
    
    
    const saveBtn = editBox.querySelector("#saveBtn");
    saveBtn.addEventListener("click",()=>{
        const editValue = editBox.querySelector("#editText");

        // change in task_list array also
        task_list[index] = editValue.value;
        
        // update localStorage
        localStorage.setItem("taskList",JSON.stringify(task_list));
        
        // display data Again
        displayTask();

        reloadPage();
    })   
    
    const cancelBtn = editBox.querySelector("#cancelBtn");
    cancelBtn.addEventListener('click',()=>{
          reloadPage();
    })
    body.appendChild(editBox);
     
}


// load page
function reloadPage(){
    location.reload() // refresh current tab
}