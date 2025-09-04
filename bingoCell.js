
// import './wordlists.json';

// const { word_lists } =  require('./wordlists.json');

window.onload = async function () {

    let request = new Request("wordlists.json");
    let result = await fetch(request);
    let data = await result.json();

    let table = document.getElementById("bingoTable")
    let refresh_button = document.getElementById("refreshButton")
    let clear_button = document.getElementById("clearButton")
    let exit_button = document.getElementById("exitButton")
    let bingo_div = document.getElementById("bingoDiv")
    let word_bank_select = document.getElementById("wordBankSelect");
    let local_word_bank_index = localStorage.getItem('wordbank_index')

    let word_list_selection = [
        data.football,
        data.livePD,
    ]
    
    let free_cell_word = [
        "Free Redzone",
        "Free to Go!",
    ]

    let selected_free_cell_word = free_cell_word[0]
    let selected_word_bank = word_list_selection[0]

    if (local_word_bank_index != null) {
        selected_word_bank = word_list_selection[local_word_bank_index]
        selected_free_cell_word = free_cell_word[local_word_bank_index]
    }
    else {
        localStorage.setItem("wordbank_index", 0)
    }

    word_bank_select.selectedIndex = local_word_bank_index

    create_bingoboard(selected_word_bank)

    word_bank_select.onchange = () => {
        let new_selection = word_bank_select.selectedIndex
        localStorage.setItem("wordbank_index", new_selection)
        selected_word_bank = word_list_selection[new_selection]
        selected_free_cell_word = free_cell_word[new_selection]
        refresh_bingoboard(selected_word_bank)
    };

    function create_bingoboard(word_bank) {
        let new_word_bank = word_bank 
        let shuffledList = word_bank
            .map(value => ({value, sort: Math.random() }))
            .sort((a,b) => a.sort - b.sort)
            .map((value) => value.value)

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
                    textContainer.innerHTML = selected_free_cell_word
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
    }

    function clear_bingoboard() {
        while (table.firstChild) {
            table.firstChild.remove()
        }
    }

    function refresh_bingoboard() {
        clear_bingoboard()
        create_bingoboard(selected_word_bank)
    }


    refresh_button.onclick = function() {
        refresh_bingoboard()
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

    // clear_button.onclick = function() {
    //     clear_bingoboard()
    // }

    exit_button.onclick = function() {
        bingo_div.style.display = "none"
    }
}