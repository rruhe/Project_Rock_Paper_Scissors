(function theGame() {
    //Variables for DOMElements
    let dById = document.getElementById.bind(document);
    let playArea = dById("play");
    let btnReload = dById("btn-reload");
    let pOutput = dById("output");
    let dConfig = dById("config-radios");
    let cntUser = dById("cnt-user");
    let cntComp = dById("cnt-comp");

    // Counter variables
    let optGamesCnt = 5; let userCnt = 0; let compCnt = 0; let playCnt = 0;

    // Values Mapping  
    let namedLi = { 0: "Rock", 1: "Paper", 2: "Scissors" };
    let choiceLi = { "btn-rock": 0, "btn-hand": 1, "btn-scissors": 2 };
    // Element = Rock,Paper,Scissors : Value = Winner against the Element 
    let decisionMap = { 0: 1, 1: 2, 2: 0 };

    // add EventListener to the Play-Buttons
    let playbtn = playArea.querySelectorAll(".play-item");
    for (let i = 0; i < playbtn.length; i++) {
        playbtn[i].addEventListener("click", playStart, false);
    }

    // Refresh/Reset the Page
    btnReload.addEventListener("click", () => {
        location.reload();
    });

    //Choose a Number of Rounds via Radio-Buttons, Event on div
    dConfig.addEventListener("change", () => {
        pOutput.innerHTML = "div config change";
        let optsCol = dConfig.querySelectorAll("input");
        for (let i = 0; i < optsCol.length; i++) {
            if (optsCol[i].checked) {
                optGamesCnt = optsCol[i].parentNode.innerText;
                pOutput.innerHTML = "div config change " + optGamesCnt;
            }
        }
    });

    // Game over = remove the EventListener and mark the Play-Buttons disabled
    function gameEnd() {
        for (let i = 0; i < playbtn.length; i++) {
            playbtn[i].removeEventListener("click", playStart, false);
            playbtn[i].classList.remove("play-item");
            playbtn[i].classList.add("play-item-disabled"); 
        }
    }

    // Still 3 decissions via Math.random
    function computerChoice() {
        return Math.floor(Math.random() * 3);
    }

    // Mark the Decissions with css-class
    function highlightTxt(valForCSS) {
        let resultAsCSS = document.createElement("span");
        resultAsCSS.innerHTML = valForCSS;
        resultAsCSS.classList.add("variableWinInP");
        return resultAsCSS.outerHTML;
    }

    // Infos to Log
    function logInfo(infoToLog) {
        dById("log").innerHTML += `<br>${new Date().toLocaleString()}:  ${infoToLog}`;
    }

    // Infos for the User and for the Log
    function printInfo(arrWin, arrDec, arrStat) {
        let info = "";
        let t0 = "Round";
        let t1 = "Computer wins:";
        let t2 = "I lost:";
        let t3 = "I have won:";
        let t4 = "Computer loses:";
        let t5 = "same choice:";
        let t6 = "Game Over - The Winner is:";
        let t7 = "New Game? = Reload Button!";

        if (arrStat[0] === "Game Over") {
            info = `${t6} ${arrStat[1]}. ${t7}`;
            pOutput.innerHTML = info;
            logInfo(info); return;
        }

        if (arrStat[0] === "Undecided") {
            info = `${t0} ${arrStat[1]}: ${arrStat[0]} ${t5} ${arrDec[0]}`;
            pOutput.innerHTML = info;
            logInfo(info); return;
        }

        if (arrWin[0] === "c") {
            info = `${t0} ${arrStat[0]}: ${t1} ${arrDec[0]} <-> ${t2} ${arrDec[1]}`;
        } else {
            info = `${t0} ${arrStat[0]}: ${t3} ${arrDec[0]} <-> ${t4} ${arrDec[1]}`;
        }
        pOutput.innerHTML = info;
        logInfo(info);
    }

    // The main function with the Game-Logic
    // result determination = decisionMap[myChoice] === computerVal or 'undecided'
    function playStart(ev) {
        let winner = "unknown";
        optGamesCnt--;
        playCnt++;
        if (optGamesCnt >= 0) {
            let myChoice = choiceLi[ev.currentTarget.id];
            let rUVal = highlightTxt(namedLi[myChoice]);

            let computerVal = computerChoice();
            let rCVal = highlightTxt(namedLi[computerVal]);

            if (myChoice !== computerVal) {
                if (decisionMap[myChoice] === computerVal) {
                    cntComp.innerHTML = ++compCnt;
                    printInfo(["c", "u"], [rCVal, rUVal], [playCnt]);
                } else {
                    cntUser.innerHTML = ++userCnt;
                    printInfo(["u", "c"], [rUVal, rCVal], [playCnt]);
                }
            } else {
                printInfo([], [rUVal, rCVal], ["Undecided", playCnt]);
            }
        } else {
            if (compCnt > userCnt) {
                winner = "the Computer";
            } else if (compCnt < userCnt) {
                winner = "the User";
            } else if (compCnt === userCnt) {
                winner = "Both Players";
            }
            printInfo([], [], ["Game Over", winner]);
            gameEnd();
        }
    }
})();


