const word_list = [
    "Call at convenience store",
    "5 or more censored bleeps for a person",
    "K9 searches suspect",
    "You see something on fire",
    "No ID",
    "Cop running or jogging",
    "Wad of cash",
    "Call at a fast food restaurant",
    "Shoplifting",
    "Resisting arrest",
    "Pulled over on a bicycle",
    "Motorcycle chase",
    "Find pills",
    `"Not my car"`,
    "Possession with intent to distribute",
    "Cop drives off road or over median",
    "Forced entry",
    "Sovereign Citizen",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
]

let shuffledList = word_list
    .map(value => ({value, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map((value) => value.value)


window.onload = function ()
{
let table = document.getElementById("bingoTable")
let refresh_button = document.getElementById("refreshButton")
let clear_button = document.getElementById("clearButton")

for (let i = 0; i < 5; i++)
{
    let row = document.createElement("tr")

    table.appendChild(row)

    for (let j = 0; j < 5; j++)
    {
        let cell = document.createElement("td");
        cell.id = i + j

        let textContainer = document.createElement("div")
        if (i == 2 && j == 2) {
            textContainer.innerHTML = `Free Space`
            cell.classList.add("free-cell")
        }
        else {
            textContainer.innerHTML = `${shuffledList[i * 5 + j]}`
        }  
        textContainer.className = "cell-square"

        cell.appendChild(textContainer)
        cell.onclick = function () 
        { 
            let myRow = i;
            let myColumn = j;

            console.log(`${i}, ${j}`);
            if (i == 2 && j == 2) {
                cell.classList.add("selected-cell")
            }
            else {
                if (cell.classList.contains("selected-cell"))
                {
                    cell.classList.remove("selected-cell")
                }
                else
                {
                    cell.classList.add("selected-cell")
                }
            }
        }
        row.appendChild(cell)
    }
}


refresh_button.style.display = "block"
clear_button.style.display = "block"


refresh_button.onclick = function() {
    window.location.reload();
}

clear_button.onclick = function() {
    let clickedCells = Array.from(document.getElementsByClassName("selected-cell"))
    for (let i = 0; i < clickedCells.length; i++)
    {
        clickedCells[i].classList.remove("selected-cell")
    }
}

}