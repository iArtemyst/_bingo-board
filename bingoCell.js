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
    "Eating while talking to a cop",
    "Pit maneuver",
    "Expired or suspended license",
    "Stumbling drunk",
    "Reports of shots fired",
    "Field sobriety test",
    "Vehicle in disrepair",
    "Find marijuana",
    "Domestic dispute or disturbance",
    "Someone wearing an ankle monitor",
    "On parole or probation",
    "Call about an animal",
    "Hoarder's vehicle",
    "Talking to cops while on cell phone",
    "Trespassing",
    "Cop pours out beer or liquor",
    "Someone other than a cop pours out a liquid",
    "Someone calling out the show while in scene",
    "Putting items onto hood of the vehicle",
    "Visible butt crack",
    "Didn't use turn signal",
    "Sight of blood",
    "Someone is put onto a stretcher",
    "Call at a Wal-Mart",
    "Find crack or meth",
    "Tossing something away during a chase",
    "Cop wearing a helmet",
    "Cop using a translator",
    "Chasing suspect through thick brush or forest",
    "Noise distrubance",
    "Vehicle that is not upright",
    "Child pulled over",
    "Finding a weapon on a person",
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
            textContainer.innerHTML = `Free to Go!`
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