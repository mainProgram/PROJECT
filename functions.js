function createColumn(){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")

    if(ALL_TASK_COLUMNS.length < 5){  // Création des colonnes

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

    const ALL_INPUTS = document.querySelectorAll("input")  // Lors de la modification le titre de la colonne ne doit pas etre vide
    ALL_INPUTS.forEach(input => input.addEventListener("blur", () => {
        if(input.value == "")
            input.value = "Column" + (ALL_TASK_COLUMNS.length + 1)
    }))

    if(document.querySelectorAll(".task-column").length > 1) //On ne peut supprimer la première colonne que si elle est la seule
        document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "hidden"
    else
        document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "visible"
        
    const DELETE_ICON = document.querySelectorAll(".delete")
    DELETE_ICON.forEach(icon => icon.addEventListener("click", () => {
        icon.parentElement.parentElement.style.animation = "disappear 1s";
        setTimeout(() => {
            icon.parentElement.parentElement.remove()
        }, 1000)

        setTimeout(() => { //Remise a jour des id et titre des colonnes apres suppression dune colonne
            const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
            ALL_TASK_COLUMNS.forEach((input, i) => {
                input.id = (i+1)
                if(isNameColumn(input.querySelector(".head").querySelector("input").value))
                    input.querySelector(".head").querySelector("input").value = "Column " + (i+1)
            })
        }, 1000)

        setTimeout(() => { //On ne peut supprimer la première colonne que si elle est la seule
            if(document.querySelectorAll(".task-column").length > 1)
                document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "hidden"
            else
                document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "visible"}
        , 1000)    
    }))
}

function createTask(){

    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")

    div = document.createElement("div")
    divDescription = document.createElement("div")
    divDescription.setAttribute("class", "description")
    
    span1 = document.createElement("span")
    span1.setAttribute("class", "material-icons md-24 left")
    span1.innerText = "keyboard_double_arrow_left"
    span1.addEventListener("click", (e)  => { // Déplacement a gauche
        id = e.target.parentElement.parentElement.parentElement.parentElement.id
        if(id > 1){
            targetID = Number(id) - 1
            document.getElementById(targetID).querySelector(".body").appendChild(e.target.parentElement.parentElement)
        }
    })

    span2 = document.createElement("span")    
    if(upcomingOrOverOrOngoing(TASK_DATE.value + " " + TASK_START_TIME.value) == "upcoming"){
        span2.innerHTML = "<span class='material-icons md-12 state-icon'>upcoming</span>"
        span2.innerHTML += "<span class='state-text'>upcoming</span></br>"        
        divDescription.classList.add("upcoming")
    }
    else if (upcomingOrOverOrOngoing(TASK_DATE.value + " " + TASK_START_TIME.value) == "ongoing"){
        span2.innerHTML = "<span class='material-icons md-12 state-icon'>autorenew</span>"
        span2.innerHTML += "<span class='state-text'>on going </span></br>"        
        divDescription.classList.add("ongoing")   
    }
    else{        
        span2.innerHTML = "<span class='material-icons md-12 state-icon'>task_alt</span>"
        span2.innerHTML += "<span class='state-text'>over</span></br>"  
        divDescription.classList.add("over")
    }   
    span2.innerHTML += TASK_DESCRIPTION.value
    span2.addEventListener("mouseover", (e) => { // Affichage des infos au survol
        if(e.target.parentElement.parentElement.querySelector(".infos") === null)
            e.target.parentElement.parentElement.parentElement.querySelector(".infos").style.display = "flex"
        else
            e.target.parentElement.parentElement.querySelector(".infos").style.display = "flex"
    })
    span2.addEventListener("mouseout", (e) => {
        if(e.target.parentElement.parentElement.querySelector(".infos") === null)
            e.target.parentElement.parentElement.parentElement.querySelector(".infos").style.display = "none"
        else
            e.target.parentElement.parentElement.querySelector(".infos").style.display = "none"
    })

    span3 = document.createElement("span")
    span3.setAttribute("class", "material-icons md-24 right")
    span3.innerText = "keyboard_double_arrow_right"
    span3.addEventListener("click", (e)  => { // Déplacement a droite
        id = e.target.parentElement.parentElement.parentElement.parentElement.id
        if(id < 5){
            targetID = Number(id) + 1
            document.getElementById(targetID).querySelector(".body").appendChild(e.target.parentElement.parentElement)
        }
    })

    divDescription.appendChild(span1)
    divDescription.appendChild(span2)
    divDescription.appendChild(span3)

    divInfos = document.createElement("div")
    divInfos.setAttribute("class", "infos")

    p1 = document.createElement("p")
    hours = document.createElement("span")
    minutes = document.createElement("span")
    seconds = document.createElement("span")
    secondes = diffSeconds(TASK_START_TIME.value, TASK_ENDING_TIME.value)
    taskCountdown(secondes, hours, minutes, seconds)
    if(Number(hours.innerHTML ) < 10)  hours.innerHTML = "0" + hours.innerHTML
    if(Number(minutes.innerHTML ) < 10)  minutes.innerHTML = "0" + minutes.innerHTML
    p1.innerHTML = "<span>Durée:</span> " + hours.innerHTML + ":" + minutes.innerHTML + ":0" + seconds.innerHTML

    // setInterval( () => {
    //     secondes -= 1
    //     hours.innerHTML = Math.floor(secondes / 3600)
    //     minutes.innerHTML = Math.floor((secondes % 3600)/60)
    //     seconds.innerHTML = Math.floor((secondes % 3600)%60) 
    // }, 1000 )
    // const fa = () => {
    //     secondes -= 1
    //     if(secondes == 0){
    //         divDescription.setAttribute("class", "description over")
    //         clearInterval(timer)
    //         seconds.innerHTML = "0"
    //     }
    //     if (secondes > 0){
    //         divDescription.setAttribute("class", "description ongoing")
    //        
    //     } 
    // }
    // timer = setInterval(fa, 1000)    

    p2 = document.createElement("p")
    span1p2 = document.createElement("span")
    span1p2.innerText = "Date: "
    span2p2 = document.createElement("span")
    span2p2.innerText = TASK_DATE.value
    p2.appendChild(span1p2)
    p2.appendChild(span2p2)
              
    p3 = document.createElement("p")
    span1p3 = document.createElement("span")
    span1p3.innerText = "Start-Time: "
    span2p3 = document.createElement("span")
    span2p3.innerText = TASK_START_TIME.value
    p3.appendChild(span1p3)
    p3.appendChild(span2p3)

    p4 = document.createElement("p")
    span1p4 = document.createElement("span")
    span1p4.innerText = "Ending-Time: "
    span2p4 = document.createElement("span")
    span2p4.innerText = TASK_ENDING_TIME.value
    p4.appendChild(span1p4)
    p4.appendChild(span2p4)
    
    divInfos.appendChild(p3)
    divInfos.appendChild(p4)
    divInfos.appendChild(p1)
    divInfos.appendChild(p2)

    div.appendChild(divDescription)
    div.appendChild(divInfos)

    document.getElementById("1").querySelector(".body").appendChild(div)
}

function isEmpty(value){
    if((value.trim() == ""))
        TASK_DESCRIPTION.classList.add("red")
    else
        TASK_DESCRIPTION.classList.remove("red")
    return (value.trim() != "")
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

// Vérifier la validité des champs du modal
function AreAllInfosCorrect(){
    dateUser = new Date(TASK_DATE.value)
    correctInputs = isDateValid(dateUser) + isStartTimeCorrect(TASK_START_TIME.value) + isEndingTimeCorrect(TASK_START_TIME.value, TASK_ENDING_TIME.value) + isEmpty(TASK_DESCRIPTION.value)
    if(correctInputs == 4)
        TASK_BUTTON_SUBMIT.removeAttribute("disabled")
    else
        TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
}

//Vider les champs du modal
function cleanForm(){
    TASK_INFOS.forEach(element => {
        element.value = ""
        element.classList.remove("red")
    })
}

// Refresh les titres des colonnes non éditées
function isNameColumn(data){
    const regex = /^Column [1-5]{1}$/;
    if(regex.test(data))
        return true
    return false
}

function upcomingOrOverOrOngoing(data){

    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate() + " " + actualDate.getHours() + ":" + actualDate.getMinutes()
    dateNew = new Date(actualDate)
    dateUser = new Date(data)

    if(dateUser.getFullYear() > dateNew.getFullYear())        
        return ("upcoming")
    else if(dateUser.getFullYear() < dateNew.getFullYear())        
        return ("over")
    else
        if(dateUser.getMonth() > dateNew.getMonth())          
            return ("upcoming")
        else if(dateUser.getMonth() < dateNew.getMonth())            
            return ("over")
        else
            if(dateUser.getDate() > dateNew.getDate())                
                return ("upcoming")
            else if(dateUser.getDate() < dateNew.getDate())                
                return ("over")
            else       
                if(dateUser.getHours() > dateNew.getHours())         
                    return ("upcoming")
                else if(dateUser.getHours() < dateNew.getHours())                
                    return ("over")
                else
                    if(dateUser.getMinutes() > dateNew.getMinutes())         
                        return ("upcoming")
                    else if(dateUser.getMinutes() < dateNew.getMinutes())                
                        return ("over")   
                    else
                        return "ongoing"      
}

function diffSeconds(startTime, endingTime){
    startTime = getSeconds(startTime)
    endingTime = getSeconds(endingTime)
    return endingTime - startTime
}

function taskCountdown(seconds, h, m, s){
    h.innerHTML = Math.floor(seconds / 3600)
    m.innerHTML = Math.floor((seconds % 3600)/60)
    s.innerHTML = Math.floor((seconds % 3600)%60) 
}

function checkSAtate(){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
    if(ALL_TASK_COLUMNS.length > 0)
    {
        ALL_TASK_COLUMNS.forEach(element => {
            divInfos = element.querySelectorAll(".infos")
            if(divInfos.length > 0)
            {
                divInfos.forEach(div => {
                    dateUser = div.children[3].children[1]
                    startTime  = div.children[1].children[1]
                    endingTime = div.children[2].children[1]
                    divDescription = div.previousElementSibling
                    stateIcon = divDescription.querySelector(".state-icon")
                    stateText = divDescription.querySelector(".state-text")

                    const a = dateUser.innerHTML

                    if (upcomingOrOverOrOngoing(a+ " " + startTime.innerHTML) == "ongoing"){
                        stateIcon.innerHTML = "autorenew"
                        stateText.innerHTML = "on going"        
                        divDescription.setAttribute("class", "description ongoing")   
                    }

                    if(upcomingOrOverOrOngoing(a+ " " + endingTime.innerHTML) == "over"){        
                        stateIcon.innerHTML = "task_alt"
                        stateText.innerHTML = "over"  
                        divDescription.setAttribute("class", "description over")
                    }  
                })
            }
        })
    }
}

setInterval(() => {
    checkSAtate()
}, 1000)