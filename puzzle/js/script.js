// 게임원리 li를 드래그릴 통해 옮겼을때 li index와 data-index를 비교해서 둘다 일치할때 게임을 종료시키는 방식.
const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;

let tiles = [];
const dragged = {
  el: null,
  class: null,
  index: null,
};
let isPlaying = false;
let timeInterval = null;
let time = 0;

// function
function checkStatus() {
  const currenList = [...container.children];
  const unMatchedList = currenList.filter(
    //필터는 조건에 만족하는 el만을 리턴
    (child, index) => Number(child.getAttribute("data-index")) !== index
  );
  //매치가 다 되었다면 타일의 위치값이 원래 위치값과 같아지게 된다면 게임을 종료하게됨
  if (unMatchedList.length === 0) {
    gameText.style.display = "block";
    isPlaying = false;
    clearInterval(timeInterval);
  }
}

function setGame() {
  isPlaying = true;
  time = 0;
  container.innerHTML = "";
  gameText.style.display = "none";
  clearInterval(timeInterval);

  tiles = creatImageTiles();
  // 매서드를 호출하면 함수가 실행되고 결과물이 리턴 되면서 해당값이 tiles에 담기게됨
  // 타일을 랜덤하게 생성하는 조건식
  tiles.forEach((tile) => container.appendChild(tile));
  setTimeout(() => {
    container.innerHTML = "";
    shuffle(tiles).forEach((tile) => container.appendChild(tile));
    timeInterval = setInterval(() => {
      playTime.innerText = time;
      time++;
    }, 1000);
  }, 5000);
  // 인자를 하나만 사용하면 괄호 또한 생략할 수 있으며 한줄인 경우에는 중괄호도 생략가능하다
}

//li박스 16개 생성하는 로직
function creatImageTiles() {
  const tempArray = [];
  Array(tileCount)
    .fill()
    .forEach((_, i) => {
      const li = document.createElement("li");
      //createElement를통해 li에 16개의 타일을 만들어 ul에 반환한다.
      li.setAttribute("data-index", i);
      li.setAttribute("draggable", "true"); //드래그를 계속할시 멈춤을 방지하는 조건
      li.classList.add(`list${i}`); //템플릿을 사용하면 문자열과 변수를 함께사용할 수 있다

      tempArray.push(li);
      // 생성된 li가 하나씩 tempArray배열 안에 담기도록 해준다
    });
  return tempArray;
  //배열을 반환하여 다시 담기도록 함수 생성
}

// 타일 순서 섞기
// 인자를 배열로 넘겨받고 넘겨받은 배열의 index를 구해서 array.length - 1 하게되면 마지막 인덱스가 선택이되며, 마지막인덱스로 부터 1씩 감소하면서 0보다 큰동안 반복을 한다. math.floor 을 사용해서 소수점을 모두 컷
function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    // 2개의 배열원소를 선택해 순서를 바꾼다.
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }
  return array;
  //shuffle을 호출하면 뒤섞긴 배열 사용 가능
}

// 이벤트
container.addEventListener("dragstart", (e) => {
  // 타겟 오브젝트를 e에 담아서
  if (!isPlaying) return;
  const obj = e.target;
  dragged.el = obj;
  dragged.class = obj.className;
  dragged.index = [...obj.parentNode.children].indexOf(obj);
  // ...은 펼침 연산자로서 배열에 포함된 항목을 목록으로 바꾸어준다 즉 펼침연산자를 사용함으로서 children안에 속해있는 원소들을 불러와 목록으로 변환한것!!
  //콘솔로 확인된 children의 배열 형태로 반환된 인덱스의 위치값을 확인.
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  if (!isPlaying) return;
  const obj = e.target;
  
  if (obj.className !== dragged.class) {
    // 만약에 클레스 네임이 드래그의 클래스와 다른 경우에만 이벤트 발생
    let originPlace;
    let isLast = false;
    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
      // 타일을 가져온 시점의 위치값을 임시로저장
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    const droppedIndex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);
    isLast ? originPlace.after(obj) : originPlace.before(obj);
    // 임시로 저장된 타일의 위치값을 드랍될곳의 타일에 반영하여 드랍된 타일은 해당 위치에 잔류하고 해당 위치에 있던 타일은 드랍된 타일의 위치로 이동하게 된다.
  }
  checkStatus();
});

startButton.addEventListener("click", () => {
  setGame();
});