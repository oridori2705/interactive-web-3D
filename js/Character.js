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
    // 스크롤 중인지 아닌지 확인하기위한 변수 처음에는 어차피 undefined
    this.scrollState = false;
    /*프로토타입에서 만든 함수 사용 */
    this.init();
}
/*공통함수는 프로토타입으로 빼준다. */
Character.prototype = {
    constructor: Character,
    /*함수 생성 */
    init: function () {
        /*this를 다른변수에 넣음으로써 this가 인식하게된다. -> 지정해놔야 아래에서 인스턴스객체들을 찾을 수 있다.*/
        const self = this;

        /*스크롤 이벤트 */
        // 1.스크롤이 될 때 처음에 달리기를 시작->초기값 scrollState=false로 인해서
        // ->self.mainElem.classList.add('running')실행
        // 2.setTimeout으로 달리기 시작함수 중복실행 제거->setTimeout은 숫자로된번호를 반환함
        //-> if (!self.scrollState) -> 그래서 여기에 못들어가짐
        // 3.setTimeout함수는 스크롤 될 때마다 clearTimeout으로 제거됨->즉 실행되자마자 반환된 번호들로인해 취소됨
        // 4.하지만 스크롤을 멈추면 마지막에 실행됐었던 setTimeout이 0.5초뒤에 비로소 실행되어서 초기상태도 만들어줌->멈춤
        window.addEventListener('scroll', function () {
            
            clearTimeout(self.scrollState);

            /*스크롤이 일어날 떄 그냥 classList를 실행하면 mainElem을 찾을 수 없다고 뜬다 */
            /*현재 this.mainElem ~ 이런식으로하면 스크롤이 일어날때 실행해줄 인스턴스 객체를 가리키지 못함
             여기안에서 this를 사용하면 window전역객체를 가리키게됨 */

            
            if (!self.scrollState) { //1.scrollState가 false면
                self.mainElem.classList.add('running');//2.running추가해서 캐릭터가 달림
            }
            //3.스크롤될때마다 setTimeout 실행
            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);
            
        });
    },
        
};