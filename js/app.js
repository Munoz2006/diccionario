import { dictionary } from "./dictionary.js"

const inputTex = document.getElementById('text')
const container = document.getElementById('container')
const fruit = document.getElementById('filter_fruits')
const colors = document.getElementById('filter_colors')
const description = document.getElementById('filter_physical_descriptions')
const skill = document.getElementById('filter_skills')
const btnA_Z = document.getElementById('A-Z')
const btnTranslate = document.getElementById('translate')
const form = document.getElementById('addWordForm')

let currentWords = []

// Crear elementos de contenedor  
const createContainer = (dictionary_d) => {  
    container.innerHTML = ''
    dictionary_d.forEach(word => {  
        const conSpanish = document.createElement('h3')
        conSpanish.classList.add('h3_t')
        conSpanish.textContent = word.spanish

        const conEnglish = document.createElement('h3')
        conEnglish.classList.add('h3_t')
        conEnglish.textContent = word.english

        const conExample = document.createElement('h3') 
        conExample.classList.add('h3_t')
        conExample.textContent = word.example

        container.appendChild(conSpanish)
        container.appendChild(conEnglish)
        container.appendChild(conExample)
    });  
    currentWords = dictionary_d  
};  

// Filtrar por entrada  
const filterInput = () => {  
    container.innerHTML = "";  
    let subList = [];  
    for (let recorre in dictionary.categories) {  
        let word = dictionary.categories[recorre];  
        subList = [...subList, ...word];  
    }  
    const valorInput = inputTex.value.toLowerCase();  
    if (!valorInput.length == 0) {
         const filterWord = subList.filter(word =>  
            word.spanish.toLowerCase().includes(valorInput) ||  
            word.english.toLowerCase().includes(valorInput)  
         )  
      if (filterWord.length > 0) {  
            createContainer(filterWord);  
      } else {  
         container.innerHTML = "<h3>No se encontraron palabras</h3>"  
      } 
   }else{
      container.innerHTML = "<h3>No se encontraron palabras</h3>"
   }  
}  

// Ordenar de A-Z  
const searchA_Z = () => {  
    const optionA_Z = document.querySelector('select').value;  
    const sortedWords = [...currentWords].sort((a, b) => {  
        if (optionA_Z === "A-Z") {  
            return a.spanish.localeCompare(b.spanish);  
        } else if (optionA_Z === "Z-A") {  
            return b.spanish.localeCompare(a.spanish);  
        }  
    });  
    createContainer(sortedWords);  
}  
//agregar una nueva palabra

const addWord = (event) => {  
    event.preventDefault(); 

    const spanish = document.getElementById('spanish').value  
    const english = document.getElementById('english').value  
    const description = document.getElementById('description').value  

    const selectedCategory = document.querySelector('input[name="category"]:checked');  

    if (selectedCategory) {  
        const categoryValue = selectedCategory.value  

         
        const newWord = {  
            spanish: spanish,  
            english: english,  
            example: description 
        };  

        dictionary.categories[categoryValue].push(newWord)

        form.reset()  
    } else {  
        alert('Por favor, selecciona una categoría.')  
    }  
}
// Filtros para categorías  
const filterColors = () => {  
    createContainer(dictionary.categories.colors)
}  

const filterFruits = () => {  
    createContainer(dictionary.categories.fruits)  
}  

const filter_physical_descriptions = () => {  
    createContainer(dictionary.categories.physical_descriptions)  
}  

const filterSkills = () => {  
    createContainer(dictionary.categories.skills)  
}  

// los eventos de los botones
fruit.addEventListener('click', filterFruits)  
colors.addEventListener('click', filterColors)  
description.addEventListener('click', filter_physical_descriptions)  
skill.addEventListener('click', filterSkills)  
btnTranslate.addEventListener('click', filterInput)  
btnA_Z.addEventListener('click', searchA_Z)  
form.addEventListener('submit', addWord)

// Cargar colores al inicio  
window.addEventListener('DOMContentLoaded', filterColors)