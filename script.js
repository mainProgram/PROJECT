// console.dir(window.getComputedStyle(document.querySelector("div")).getPropertyValue("background-image"))
//--------------------------------------------------------------------------------------------------EVENTS
ADD_TASK.addEventListener("click", ()=>{
    if(document.getElementById("1") !== null){
        cleanForm()
        // TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        MODAL.classList.add("show-modal")
    }
    else
        alert("Add a column first !")
});

CLOSE_ICON_MODAL.addEventListener("click", ()=>{
    MODAL.classList.remove("show-modal")
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

// TASK_INFOS.forEach(element => element.addEventListener("blur", () => {
//     AreAllInfosCorrect()
// }))

// TASK_INFOS.forEach(element => element.addEventListener("input", () => {
//     AreAllInfosCorrect()
// }))

TASK_BUTTON_SUBMIT.addEventListener("click", () => {
    createTask()
    alert("Tâche créée !")
    setTimeout(() => {
        MODAL.classList.remove("show-modal")
    }, 300)
})

//--------------------------------------------------------------------------------------------------FUNCTIONS


// let seconds = 3789
// setInterval(() => {
//         seconds -= 1
//         taskCountdown(seconds)
//     }, 
// 1000)

// setInterval(function () { 
//     seconds -= 1
//     const h = Math.floor(seconds / 3600)
//     const m = Math.floor((seconds % 3600)/60)
//     const s = Math.floor((seconds % 3600)%60) 
//     console.log(h + ":" + m + ":" + s)
//  }, 1000);
