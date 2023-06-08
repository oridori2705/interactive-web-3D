/*생성자 */
function Character(info){
    this.mainElem=document.createElement("div");
    this.mainElem.classList.add('character');/*character클래스넣어줌 */
    /*캐릭터 생성하는 innerHTML->컨테이너 삽입 */
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';
    /*만든엘리먼트를 화면에 보이게하려면 stage안에 appendchild를 해준다. */
    document.querySelector('.stage').appendChild(this.mainElem);

    /*클릭이벤트로 받아온 x좌표(퍼센트화)값을 넣어줌 */
    this.mainElem.style.left = info.xPos + '%';
    
    // 스크롤 중인지 아닌지
    this.scrollState = false;
    // 바로 이전 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    // 좌우 이동 중인지 아닌지
    this.runningState = false;
    this.rafId;
    this.init();
}
