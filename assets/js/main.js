(function theGame() {
    let dById = document.getElementById.bind(document);
    let playArea = dById("play");
    let btnReload = dById("btn-reload");
    let pOutput = dById("output");
    let cntUser = dById("cnt-user");
    let cntComp = dById("cnt-comp");
    let dConfig = dById("config-radios");

    let optGamesCnt = 5;
    let userCnt = 0;
    let compCnt = 0;

    let namedLi = { 0: "Rock", 1: "Paper", 2: "Scissors" }
    let choiceLi = { "btn-rock": 0, "btn-hand": 1, "btn-scissors": 2 };
    let decisionMap = { 0: 1, 1: 2, 2: 0 };

    // add EventListener to the Play-Buttons
    let playbtn = playArea.querySelectorAll(".play-item");
    for (let i = 0; i < playbtn.length; i++){
        playbtn[i].addEventListener("click", playStart, false);
    }

    btnReload.addEventListener("click", (ev) => {
        location.reload();
    })
    
    dConfig.addEventListener("change", (ev) => {
        pOutput.innerHTML = "div config change";
        let optsCol = dConfig.querySelectorAll("input");
        for (let i = 0; i < optsCol.length; i++) {
            if (optsCol[i].checked) {
                optGamesCnt = optsCol[i].parentNode.innerText;
                pOutput.innerHTML = "div config change " + optGamesCnt;
            }
        }
    })

    function msgEnd(){
        alert("Game over");
    }

    function gameEnd() {
        for (let i = 0; i < playbtn.length; i++){
            playbtn[i].removeEventListener("click", playStart, false);
        }
    }

    function computerChoice() {
        let ranNum = Math.floor(Math.random() * 3);
        return ranNum;
    }

    function highlightTxt(valForCSS) {
        let resultAsCSS = document.createElement("span");
        resultAsCSS.innerHTML = valForCSS;
        resultAsCSS.classList.add("variableWinInP");
        return resultAsCSS.outerHTML;
    }

    function logInfo(infoToLog) {
        dById("log").innerHTML += `<br>${new Date().toLocaleString()}:  ${infoToLog}`;
    }

    function printInfo(arrWho, arrDec) {
        let info = "";
        let t1 = "Computer wins:";
        let t2 = "I lost:";
        let t3 = "I have won:";
        let t4 = "Computer loses:";
        let t5 = "Undecided same choice:";

        if (arrWho[0] === "e") {
            info = arrWho[1];
            pOutput.innerHTML = info;
            logInfo(info); return;
        }

        if (arrWho[0] === "x") {
            info = `${t5} ${arrDec[0]}`
            pOutput.innerHTML = info;
            logInfo(info); return;
        }

        if (arrWho[0] === "c") {
            info = `${t1} ${arrDec[0]} <-> ${t2} ${arrDec[1]}`
        } else {
            info = `${t3} ${arrDec[0]} <-> ${t4} ${arrDec[1]}`
        }
        pOutput.innerHTML = info;
        logInfo(info);
    }

    function playStart(ev) {
        let winner = "unknown";
        optGamesCnt--;
        if (optGamesCnt >= 0) {
            console.log(optGamesCnt);
            let myChoice = choiceLi[ev.currentTarget.id];
            let rUVal = highlightTxt(namedLi[myChoice]);

            let computerVal = computerChoice();
            let rCVal = highlightTxt(namedLi[computerVal]);

            if (myChoice === 0) {
                if (computerVal !== 0) {
                    if (decisionMap[myChoice] === computerVal) {
                        cntComp.innerHTML = ++compCnt;
                        printInfo(["c", "u"], [rCVal, rUVal]);
                    } else {
                        cntUser.innerHTML = ++userCnt;
                        printInfo(["u", "c"], [rUVal, rCVal]);
                    }
                } else {
                    printInfo(["x", ""], [rUVal, rCVal]);
                }
            }

            if (myChoice === 1) {
                if (computerVal !== 1) {
                    if (decisionMap[myChoice] === computerVal) {
                        cntComp.innerHTML = ++compCnt;
                        printInfo(["c", "u"], [rCVal, rUVal]);
                    } else {
                        cntUser.innerHTML = ++userCnt;
                        printInfo(["u", "c"], [rUVal, rCVal]);
                    }
                } else {
                    printInfo(["x", ""], [rUVal, rCVal]);
                }
            }

            if (myChoice === 2) {
                if (computerVal !== 2) {
                    if (decisionMap[myChoice] === computerVal) {
                        cntComp.innerHTML = ++compCnt;
                        printInfo(["c", "u"], [rCVal, rUVal]);
                    } else {
                        cntUser.innerHTML = ++userCnt;
                        printInfo(["u", "c"], [rUVal, rCVal]);
                    }
                } else {
                    printInfo(["x", ""], [rUVal, rCVal]);
                }
            }
        } else {
            if (compCnt > userCnt) {
                winner = "the Computer";
            } else if (compCnt < userCnt) {
                winner = "the User";
            } else if (compCnt === userCnt) {
                winner = "Both Players";
            }
            info = `Game Over - The Winner is: ${winner}. New Game? = Reload Button!`;
            printInfo(["e", info], [,]);
            gameEnd();
        }
    }
})();


