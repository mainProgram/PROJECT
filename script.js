// console.dir(window.getComputedStyle(document.querySelector("div")).getPropertyValue("background-image"))
//--------------------------------------------------------------------------------------------------DECLARATIONS
const HEADER = document.querySelector("header")
const SECTION = document.querySelector("section")
const CLOSE_ICON_HEADER = document.querySelector(".close")
const ARROW_DOWN = document.querySelector(".arrow-down")
const ADD_TASK = document.querySelector(".add-task")
const ADD_COLUMN = document.querySelector(".add-column")
// MODAL
const CLOSE_ICON_MODAL = document.getElementById("close");
const MODAL = document.getElementById("modal");
// TASK
const TASK_DATE = document.querySelector("#date")
const TASK_DESCRIPTION = document.querySelector("#task")
const TASK_BUTTON_SUBMIT = document.querySelector("#submit")
const TASK_START_TIME = document.querySelector("#start-time")
const TASK_ENDING_TIME = document.querySelector("#ending-time")
const TASK_INFOS = [TASK_DATE, TASK_DESCRIPTION, TASK_START_TIME, TASK_ENDING_TIME]

//--------------------------------------------------------------------------------------------------EVENTS
ADD_TASK.addEventListener("click", ()=>{
    if(document.getElementById("1") !== null){
        TASK_DATE.value = ""
        TASK_START_TIME.value = ""
        TASK_ENDING_TIME.value = ""
        TASK_DESCRIPTION.value = ""
        TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        MODAL.classList.add("show-modal")
    }
    else
        alert("Add a column first !")
});

CLOSE_ICON_MODAL.addEventListener("click", ()=>{
    MODAL.classList.remove("show-modal")
});

window.addEventListener('click', function(e)
{
    if(e.target == MODAL)
        MODAL.classList.remove('show-modal');
    else
        return false;
});

CLOSE_ICON_HEADER.addEventListener("click", () => {
    HEADER.classList.add("close")
})

ARROW_DOWN.addEventListener("click", () => {
    HEADER.classList.remove("close")
})

ADD_COLUMN.addEventListener("click", () => {
    createColumn()
})

TASK_INFOS.forEach(element => element.addEventListener("blur", () => {
    AreAllInfosCorrect()
}))

TASK_INFOS.forEach(element => element.addEventListener("input", () => {
    AreAllInfosCorrect()
}))

TASK_BUTTON_SUBMIT.addEventListener("click", () => {
    div = document.createElement("div")
    span1 = document.createElement("span")
    span1.setAttribute("class", "material-icons md-24 left")
    span1.innerText = "keyboard_double_arrow_left"
    span1.setAttribute("hidden", "hidden")
    span2 = document.createElement("span")
    span2.innerText = TASK_DESCRIPTION.value
    span3 = document.createElement("span")
    span3.setAttribute("class", "material-icons md-24 right")
    span3.innerText = "keyboard_double_arrow_right"
    div.appendChild(span1)
    div.appendChild(span2)
    div.appendChild(span3)
    document.getElementById("1").querySelector(".body").appendChild(div)
    setTimeout(() => {
        MODAL.classList.remove("show-modal")
    }, 300)
})
//--------------------------------------------------------------------------------------------------FUNCTIONS
function createColumn(){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")

    if(ALL_TASK_COLUMNS.length < 5){

        divTaskColumn = document.createElement("div")
        divTaskColumn.setAttribute("class", "task-column")
        divTaskColumn.setAttribute("id", (ALL_TASK_COLUMNS.length+1))

        divHead = document.createElement("div")
        divHead.setAttribute("class", "head")
        input = document.createElement("input")
        input.value = "Column " + (ALL_TASK_COLUMNS.length + 1)
        divHead.appendChild(input)

        divBody = document.createElement("div")
        divBody.setAttribute("class", "body")
        // div = document.createElement("div")
        // span1 = document.createElement("span")
        // span1.setAttribute("class", "material-icons md-24 left")
        // span1.innerText = "keyboard_double_arrow_left"
        // span2 = document.createElement("span")
        // span2.innerText = "em ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error repellendus dolorum omni"
        // span3 = document.createElement("span")
        // span3.setAttribute("class", "material-icons md-24 right")
        // span3.innerText = "keyboard_double_arrow_right"
        // div.appendChild(span1)
        // div.appendChild(span2)
        // div.appendChild(span3)
        // divBody.appendChild(div)
        
        divFooter = document.createElement("div")
        divFooter.setAttribute("class", "footer")
        span = document.createElement("span")
        span.setAttribute("class", "material-icons md-24 delete")
        span.innerText = "delete"
        divFooter.appendChild(span)

        divTaskColumn.appendChild(divHead)
        divTaskColumn.appendChild(divBody)
        divTaskColumn.appendChild(divFooter)

        SECTION.appendChild(divTaskColumn)
    }
    else
        alert("Maximum reached !")

    const ALL_INPUTS = document.querySelectorAll("input")
    ALL_INPUTS.forEach(input => input.addEventListener("blur", () => {
        if(input.value == "")
            input.value = "Column" + (ALL_TASK_COLUMNS.length + 1)
    }))

    const DELETE_ICON = document.querySelectorAll(".delete")
    DELETE_ICON.forEach(icon => icon.addEventListener("click", () => {
        icon.parentElement.parentElement.style.animation = "disappear 1s";
        console.dir(icon.parentElement.parentElement)
        setTimeout(() => {
            icon.parentElement.parentElement.remove()
        }, 1000)

        // const ALL_INPUTS = document.querySelectorAll("input")
        // ALL_INPUTS.forEach((input, i) => {
        //     input.value = "Column" + (i+1)
        // })
        setTimeout(() => {
            const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
            ALL_TASK_COLUMNS.forEach((input, i) => {
                input.id = (i+1)
            })
        }, 1000)
        
    }))

    // document.querySelectorAll(".task-column").forEach(taskColumn => {
        
    //     const LEFT_ICON = taskColumn.querySelectorAll(".left")
    //     LEFT_ICON.forEach(icon => icon.addEventListener("click", () => {
    //         if(icon.parentElement.parentElement.parentElement.previousElementSibling !== null){
    //             icon.parentElement.parentElement.parentElement.previousElementSibling.querySelector(".body").appendChild(icon.parentElement)
    //             console.log(icon.parentElement.parentElement.parentElement.previousElementSibling.id)     
    //         }
    //     }))

    //     const RIGHT_ICON = taskColumn.querySelectorAll(".right")
    //     RIGHT_ICON.forEach(icon => icon.addEventListener("click", () => {
    //         if(icon.parentElement.parentElement.parentElement.nextElementSibling !== null){

    //             icon.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".body").appendChild(icon.parentElement)  
    //             console.log(icon.parentElement.parentElement.parentElement.nextElementSibling.id)         
    //         }
    //     }))
    // })

}

function isEmpty(value){
    if((value == ""))
        TASK_DESCRIPTION.classList.add("red")
    else
        TASK_DESCRIPTION.classList.remove("red")
    return (value != "")
}

function isDateValid(date){
    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate()
    dateNew = new Date(actualDate)

    if(date - dateNew < 0)
        TASK_DATE.classList.add("red")
    else
        TASK_DATE.classList.remove("red")
    return(date - dateNew >= 0)
}

function getSeconds(time){
    time = time.split(":")
    heureUser = Number(time[0]) * 3600
    minuteUser = Number(time[1]) * 60
    tempsUser = heureUser + minuteUser
    return tempsUser
}

function isStartTimeCorrect(startTime){
    dateUser = new Date
    tempsActuel =  (dateUser.getHours() * 3600) + (dateUser.getMinutes() * 60)

    tempsUser = getSeconds(startTime)

    if(tempsUser < tempsActuel)
        TASK_START_TIME.classList.add("red")
    else
        TASK_START_TIME.classList.remove("red")
    return (tempsUser >= tempsActuel)
}

function isEndingTimeCorrect(startTime, endingTime){
    startTime = getSeconds(startTime)
    endingTime = getSeconds(endingTime)
    if( TASK_START_TIME.value != "" && endingTime <= startTime)
        TASK_ENDING_TIME.classList.add("red")
    else
        TASK_ENDING_TIME.classList.remove("red")
    return endingTime > startTime
}

function AreAllInfosCorrect(){
    dateUser = new Date(TASK_DATE.value)
    correctInputs = isDateValid(dateUser) + isStartTimeCorrect(TASK_START_TIME.value) + isEndingTimeCorrect(TASK_START_TIME.value, TASK_ENDING_TIME.value) + isEmpty(TASK_DESCRIPTION.value)
    if(correctInputs == 4)
        TASK_BUTTON_SUBMIT.removeAttribute("disabled")
    else
        TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
}


