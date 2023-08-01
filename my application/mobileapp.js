import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, remove} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

    
 



const  appSettings = {
    databaseURL: "https://play-ground-9fa1d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp (appSettings)
const database = getDatabase (app)
const moviesInDB = ref(database, "movies")

console.log(app)
const addBtn = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const listEl = document.getElementById("list")





addBtn.addEventListener("click" , function(){
    let inputvalue = inputEl.value

   
    push(moviesInDB , inputvalue)
    clearInputField() 
    
     
})

function clearListEl() {
    listEl.innerHTML = ""
}

onValue(moviesInDB , function(snapshot){

    if(snapshot.exists()){
        let movieArray = Object.entries(snapshot.val())
        console.log(snapshot.val())
        clearListEl()
        for(let i = 0; i < movieArray.length; i++){
    
            let movieBook = movieArray[i]
            let currentItemID = movieBook[0]
            let currentItemValue = movieBook[1]
    
            
    
            appendItemToShoppingList(movieBook)
            
            
        }
        
        
    }
    else{
        listEl.innerHTML = "NO items here ......yet"
    }

   
})

function clearInputField() {
    inputEl.value = ""

}

function appendItemToShoppingList(item){
    // listEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
     let newEl = document.createElement("li")
     newEl.textContent= itemValue

     newEl.addEventListener("click", () => {
        
        
       let exactLocationOfBook = ref(database, `movies/${itemID}`)

       remove(exactLocationOfBook)

       
     })

     listEl.append(newEl)

}

