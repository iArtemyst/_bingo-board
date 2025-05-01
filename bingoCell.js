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
    "Child in pulled over car",
    "Finding a weapon on a person",
    "Finds heroin",
    "Finds fentanyl",
    "Offers food to cops",
    "Responding to an overdose",
    "Responding to a burglary",
    "Located stolen weapon",
    "Cop gives attitude back",
    "Cop is called off to another scene",
    "Suspect goes to homebase",
    "Officer deploys stop sticks",
    `"No ID on me"`,
    "Car flees after being stopped",
    "Helicopter used in pursuit",
    "Refuses to give name/ID themselves",
    "Filming a TikTok video",
    "Poopy pants",
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
let exit_button = document.getElementById("exitButton")
let bingo_div = document.getElementById("bingoDiv")
// let bingo_div = document.getElementById("bingoWinDiv")

let selected_state = 
[
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
];

for (let i = 0; i < 5; i++)
{
    let row = document.createElement("tr")

    table.appendChild(row)

    for (let j = 0; j < 5; j++)
    {
        let cell = document.createElement("td");
        let textContainer = document.createElement("div")

        if (i == 2 && j == 2) {
            textContainer.innerHTML = `Free to Go!`
            cell.classList.add("free-cell")
        }
        else {
            textContainer.innerHTML = `${shuffledList[i * 5 + j]}`
            cell.classList.add("cell-square")
        }  

        cell.appendChild(textContainer)
        
        cell.onclick = () =>
        { 
            if (bingo_div.style.display != "none") {
                return
            }

            if (i !== 2 || j !== 2)
            {
                selected_state[i][j] = !selected_state[i][j];
            }
            
            if (cell.classList.contains("selected-cell"))
            {
                cell.classList.remove("selected-cell")
                cell.classList.add("cell-square")
            }
            else
            {
                cell.classList.remove("cell-square")
                cell.classList.add("selected-cell")

                let bingo_column = true;
                for (let r = 0; r < 5; r++)
                {
                    if (!selected_state[r][j])
                    {
                        bingo_column = false;
                    }
                }

                let bingo_row = true;
                for (let c = 0; c < 5; c++)
                {
                    if (!selected_state[i][c])
                    {
                        bingo_row = false;
                    }
                }

                let bingo_diagonal1 = false;
                if (i == j)
                {
                    bingo_diagonal1 = true;
                    for (let d = 0; d < 5; d++)
                    {
                        if (!selected_state[d][d]) {
                            bingo_diagonal1 = false;
                        }
                    }
                }

                let bingo_diagonal2 = false;
                if (i + j == 4)
                {
                    if (selected_state[0][4] && 
                        selected_state[1][3] && 
                        selected_state[2][2] && 
                        selected_state[3][1] && 
                        selected_state[4][0])
                    {
                        bingo_diagonal2 = true;
                    }
                }
                


                if (bingo_column || bingo_row || bingo_diagonal1 || bingo_diagonal2)
                {
                    setTimeout(() => {
                        bingo_div.style.display = "flex"
                    }, 2);
                }
            }
        }
        row.appendChild(cell)
    }

    window.onclick = (e) => {
        console.log(window.getComputedStyle(e.target).getPropertyValue("z-index"))
        if (bingo_div.style.display !== "none" && e.target.id !="themeButton" && window.getComputedStyle(e.target).getPropertyValue("z-index") != 5)
        {
            bingo_div.style.display = "none"
        }
    }
}

refresh_button.onclick = function() {
    window.location.reload();
}

clear_button.onclick = function() {
    let clickedCells = Array.from(document.getElementsByClassName("selected-cell"))
    for (let i = 0; i < clickedCells.length; i++)
    {
        clickedCells[i].classList.remove("selected-cell")
        clickedCells[i].classList.add("cell-square")
    }
    selected_state = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ];
}

exit_button.onclick = function() {
    bingo_div.style.display = "none"
}
    
}