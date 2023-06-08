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
        window.addEventListener('scroll', function () {
            //8.스크롤 할때마다 0.5초가 되기전에 setTimeout에서 반환되는 번호를 clear해주는 것이다.
            //9.즉 스크롤되는동안 setTimeout의 함수는 실행되지 못한다. ->setTimeout은 실행되고 바로 취소됨
            //10.스크롤이 멈춰야 clear을 수행안하니까 setTimeout안의 함수가 비로소 실행되는것이다.->0.5초 후 달리기 멈춤
            clearTimeout(self.scrollState);

            /*스크롤이 일어날 떄 그냥 classList를 실행하면 mainElem을 찾을 수 없다고 뜬다 */
            /*현재 this.mainElem ~ 이런식으로하면 스크롤이 일어날때 실행해줄 인스턴스 객체를 가리키지 못함
             여기안에서 this를 사용하면 window전역객체를 가리키게됨 */


            //처음 달리기를 시작할때는 false니까 이 함수가 한번 실행됨
            if (!self.scrollState) { //1.scrollState가 false면
                self.mainElem.classList.add('running');//2.running추가해서 캐릭터가 달림
            }
            //3.스크롤될때마다 setTimeout 실행
            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);//4.setTimeout은 숫자를(1,2,3..) 리턴한다.->시간관계없이 계속 값이 리턴됨
            //->5. 스크롤이 실행될때마다 숫자값이 리턴되니까 위의 add(running)은 한번만 실행이된다(false가 아니게되니까) 
            //->6.즉 위애서 add(running) 중복실행 방지
            //7.그리고 스크롤이 멈추면 0.5초뒤에 false로 다시 만들고, running을 없앤다.->초기상태로 다시변환
            
        });
    },
        
};