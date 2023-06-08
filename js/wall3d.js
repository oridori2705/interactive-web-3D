(function() {
    const housrElem=document.querySelector(".house")
    /*스크롤 값 퍼센트로 나타내는 방법 */
    /*창이 줄어들었을때 스크롤되는 양이 달라진다. 
    스크롤하는 영역 = 실제 전체 길이 - window화면사이즈(현재 한 보이는 화면 크기
    즉 document.body.scrollHeight-window.innerHeight이 스크롤 전체 길이 이다.
    window.scrollY / (document.body.scrollHeight-window.innerHeight)*/
    window.addEventListener("scroll",() => {
        const scrollNum = (window.scrollY / (document.body.scrollHeight-window.innerHeight))*980-490;
        housrElem.style.transform = `translateZ(${scrollNum}vw)`
    })

})();