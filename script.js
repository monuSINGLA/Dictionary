const form = document.querySelector("form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(form[0].value === ""){
        alert("Please enter a word")
    }else{
        getWordDetails(form[0].value)
    }

    

});

document.addEventListener("DOMContentLoaded",()=>{
    form[0].focus();
})

const getWordDetails = async (word) => {

    try {
        result.innerHTML = "Fetching Data...."
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json()
        

        const definitions = data[0].meanings[0].definitions[0]
        result.style.visibility = "visible"
        result.innerHTML = `
            <h2><strong>Word : ${data[0].word}</strong></h2>
            <p class = "part-of-speech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning : </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
            <p><strong>Example : </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
            <p><strong>Antonyms : </strong></p>
            `;

            if (definitions.antonyms.length === 0) {
            result.innerHTML += `<span>Not Found<span/>`
            }
            else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                result.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
            }

            //adding more info buttton about input word
            result.innerHTML += `<div><a href = "${data[0].sourceUrls}" target="_blank">Read More</a></div>`
        }
        catch (error) {
            result.innerHTML = ` <p> Sorry, the word could not be find </p>`
    
        }
};