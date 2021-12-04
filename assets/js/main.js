function theGame() {
    let dById = document.getElementById.bind(document);
    let btnReload = dById("btn-reload");
    let btnRock = dById("btn-rock");
    let btnHand = dById("btn-hand");
    let btnScissors = dById("btn-scissors");
    let pOutput = dById("output");
    let cntUser = dById("cnt-user");
    let cntComp = dById("cnt-comp");
    let dConfig = dById("config-radios");
    let optRadio1 = dById("radio1");
    let optRadio2 = dById("radio2");
    let optRadio3 = dById("radio3");
    let optRadio4 = dById("radio4");

    let optGames = 5;
    let userCnt = 0;
    let compCnt = 0;

    let namedLi = { 0: "Rock", 1: "Paper", 2: "Scissors" }
    let choiceLi = { "btn-rock": 0, "btn-hand": 1, "btn-scissors": 2 };
    let decisionMap = { 0: 1, 1: 2, 2: 0 };

    btnReload.addEventListener("click", (ev) => {
        location.reload();
    })
    btnRock.addEventListener("click", (ev) => {
        playStart(ev);
    })
    btnHand.addEventListener("click", (ev) => {
        playStart(ev);
    })
    btnScissors.addEventListener("click", (ev) => {
        playStart(ev);
    })
    dConfig.addEventListener("change", (ev) => {
        pOutput.innerHTML = "div config change";
        let optsCol = dConfig.querySelectorAll("input");
        for (let i = 0; i < optsCol.length; i++) {
            if (optsCol[i].checked) {
                optGames = optsCol[i].parentNode.innerText;
                pOutput.innerHTML = "div config change " + optGames;
            }
        }
    })

    function logTest(event) {
        console.log(event);
        pOutput.innerText = event.currentTarget.id;
        // pOutput = "Test";
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
        dById("log").innerHTML += `<br>${new Date().toLocaleString()} ${infoToLog}`;
    }

    function printInfo(arrWho, arrDec) {
        let info = "";
        let t1 = "Computer wins:";
        let t2 = "I lost:";
        let t3 = "I have won:";
        let t4 = "Computer loses:";
        let t5 = "Undecided same choice:";

        if (arrWho[0] === "x") {
            info = `${t5} ${arrDec[0]}`
            pOutput.innerHTML = info;
            logInfo(info); return;
        }

        if (arrWho[0] ==="c"){
            info = `${t1} ${arrDec[0]} <-> ${t2} ${arrDec[1]}`
        } else {
            info = `${t3} ${arrDec[0]} <-> ${t4} ${arrDec[1]}`
        }
        pOutput.innerHTML = info;
        logInfo(info);
    }

    function playStart(ev) {
        pOutput.innerHTML = "Start des Spieles";
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
    }
}
theGame();

