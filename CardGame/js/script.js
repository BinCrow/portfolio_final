const cards = document.querySelectorAll(".card");

let matchedCrad = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e){
    let clickedCard = e.target;// 이벤트(카드)를 클릭할때 clickedCard에 이벤트를 담는다
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip")
        // 한번 클릭한 카드는 일정 시간이 지나기 전까지 같은 카드를 이벤트할 수 없다.
        if(!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg,cardTwoImg);
    }
}

function matchCards(img1, img2){
    // 카드 16장을 생성해주는 로직
    if(img1 === img2){
        matchedCrad++;
        if(matchedCrad == 8){
            setTimeout(()=>{
                return shuffleCard();
            }, 1000);
        }
        //같은 카드가 매치되면 해당 카드의 이벤트를 끝내어 더 이상 해당 카드의 이벤트를 실행할 수 없다.
        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        cardOne = cardTwo = ""; // 이벤트가 끝난 카드는 공백으로 처리
        return disableDeck = false;
    }

    setTimeout(()=>{ // 서로 다른 카드를 클릭 했을시 흔들림 이벤트 생성
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(()=>{      
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo = ""; // 이벤트가 끝난 카드는 공백으로 처리
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    //16개 항목의 배열을 만들고 각 항목을 두 번 반복하게 한다.
    matchedCrad = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    // 임의적으로 배열 항목을 정렬하여 카트를 섞어 준다.
    arr.sort(()=>Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let ImgTag = card.querySelector("img");
        ImgTag.src = `img/img-${arr[index]}.png`
        card.addEventListener("click",flipCard);
    })
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click",flipCard)
    // 16장의 카드에 flipCard 이벤트 제공
})