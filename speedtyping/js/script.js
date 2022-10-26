const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector(".typing_button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    // 임의의 숫자를 얻으면 항상 단락 길이보다 작습니다.
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // 문단 배열에서 임의 항목 가져오기, 모든 문자 분할
    // 각 문자를 span 안에 추가하고 이 span을 p 태그 안에 추가합니다.
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // 키다운 또는 클릭 이벤트에 대한 입력 필드 표시
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping) { // 타이머가 시작되면 모든 키를 클릭해도 타이머가 다시 시작되지 않습니다.
            timer = setInterval(initTimeer, 1000);
            isTyping = true;
        }
        //사용자가 문자를 입력하지 않았거나 백스페이스를 누르지 않은 경우
        if(typedChar == null){
            charIndex--; // decrement charIndex
            // charIndex 범위에 잘못된 클래스가 포함된 경우에만 오류 감소
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText ===typedChar) {
                //사용자가 입력한 문자와 표시된 문자가 일치하는 경우 색을추가.
                //바르게 입력된 문구는 녹색으로 표시가되고, 오타 입력시 붉은색으로 표시하됨.
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++; // 사용자가 입력한 올바른 문자 또는 잘못된 문자 중 하나를 charIndex 증가
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // wpm 값이 0이면 값을 0으로 설정합니다.
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText =wpm;
        cpmTag.innerText = charIndex - mistakes; // cpm은 실수를 카운트하지 않습니다.
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimeer() {
    // time Left가 0보다 크면 시간을 줄입니다. 그렇지 않으면 타이머를 지웁니다.
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    // 문단 호출 함수와 각 변수 및 요소 값을 기본값으로 재설정
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph()
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);