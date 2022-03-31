ADD_TASK.addEventListener("click", ()=>{
    if(document.getElementById("1") !== null){
        cleanForm()
        // TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        MODAL.classList.add("show-modal")
    }
    // else
    //     alert("Add a column first !")
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

setInterval(() => {
    checkSAtate()
}, 1000)

TRASH_ICON.addEventListener("click", () => {
    TRASH_BODY.classList.toggle("show-modal")
})