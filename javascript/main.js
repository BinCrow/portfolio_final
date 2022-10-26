//loading
let Isloader = document.querySelector(".loading");

function Isloading() {
  setTimeout(function () {
    Isloader.classList.add("active");
  }, 10000);
}
Isloading();

//loading typig text
let target = document.querySelector("#dynamic");

function randomString(){
    let stringArr = ["Getting Ready To Html", "Getting Ready to CSS", "Getting Ready to Script"];
    let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
    let selectStrinArr = selectString.split("");

    return selectStrinArr;
}

// typig reset
function resetTyping(){
    target.textContent = "";
    dynamic(randomString());
}

//한글자씩 텍스트 출력 함수
function dynamic(randomArr) {
    if(randomArr.length > 0){
        target.textContent += randomArr.shift();
        setTimeout(function(){
            dynamic(randomArr);
        },80);
    } else {
        setTimeout(resetTyping, 1000);
    }
}

dynamic(randomString());

//커서 깜박임 효과
function blink(){
    target.classList.toggle("active");
}
setInterval(blink, 500);

//버튼 active 온/오프
$('.code_view, .tab-link').click(function(){
    $('.code_view, .tab-link').not(this).removeClass('active');
    
    $(this).toggleClass('active');
});

// 메인 이펙트
function loading(){
    //메인 타이틀 분할
    document.querySelectorAll(".split").forEach((cut) => {
        let splitText = cut.innerText;
        let splitWrap = splitText.split("").join("</span><span aria-hidden='true'>");
        splitWrap = "<span aria-hidden='true'>" + splitWrap + "</span>";
        cut.innerHTML = splitWrap;
        cut.setAttribute("aria-label", splitText);
    });

    // 메인 숨김
    gsap.set("#header",{top:-100});
    gsap.set("#section1",{opacity:0});
    gsap.set("#section1 .main_wrap",{y:10, opacity:0});
    gsap.set(".split span",{y:50, opacity:0 });
    gsap.set("#section2",{y:100, opacity:0,});

    // 메인 설정시간 이후 보임
    setTimeout(() => {
        const tl = gsap.timeline();
        tl.to("#header",{duration:0.5, top:0});
        tl.to("#section1",{duration:0.5, opacity:1});
        tl.to("#section1 .main_wrap",{duration:0.5, y:0, opacity:1, transition: 0.5});
        tl.to(".split span",{duration:0.5, y:0, opacity:1, stagger: 0.1});
        tl.to("#section2",{duration:0.7, opacity:1, y:0});
    },10500)
}
loading();