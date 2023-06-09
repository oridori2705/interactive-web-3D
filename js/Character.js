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

    /*클릭이벤트로 받아온 x좌표(퍼센트화)값을 넣어줌-생성위치 */
    this.mainElem.style.left = info.xPos + '%';

    // 스크롤 중인지 아닌지 확인하기위한 변수 처음에는 어차피 undefined
    this.scrollState = false;

    //직전의 스크롤값 저장으로 앞으로가는중인지 뒤로가는중인지
    this.lastScrollTop = 0;

    /*각각 개인의 걷는 속도를 위한 변수 ->캐릭터들의 생성 위치를 결정하는 것은 left값이다. */
    this.speed = info.speed;

    //실제 이동을 위한 캐릭터의 현재 left값
    this.xPos = info.xPos;

    this.direction;

    // 키다운 이벤트의 중복실행을 없애기위한 좌우 이동 중인지 아닌지
    this.runningState = false;

    //여기에 scrollY를 저장해둬야 캐릭터가 생성되어도 scrollY값은 고정이된다.
    this.scrollYvalue=window.scrollY;
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
            //스크롤될때마다 setTimeout 실행
            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);

            /*스크롤됐을 때 캐릭터가 앞으로가는지 뒤로가는지 정해주는 부분 -> 중요 응용공식임*/
             // 이전 스크롤 위치와 현재 스크롤 위치를 비교 ->스크롤내릴때 조금씩 차이가남 80 >83 이런식으로
            if (self.lastScrollTop > scrollY) {
                // 이전 스크롤 위치가 크다면: 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                // 현재 스크롤 위치가 크다면: 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }

            self.lastScrollTop = scrollY; //직전의 스크롤값을 저장함
            
        });
        /*키 이벤트 함수화했음 */
        function keyEvent(flow){
            self.direction = flow; //requestAnimationFrame에서 이동하는 로직을 짜기위해 객체에 이동하는 방향을 저장해주는 것
            self.mainElem.setAttribute('data-direction', flow);//속성 추가로 방향구분
            self.mainElem.classList.add('running');
            /*캐릭터 각각의 걷는 속도를 다르게 하기위한 run 
            호출할때 self를 넘겨줘야 window객체를 가리키지 않는다.*/
            self.run(self);
            // self.run(); // bind를 사용한 방법
            
            //좌우 이동중인지 아닌지를 저장
            self.runningState = true;
        }
        /*키보드를 눌렀을 때 캐릭터가 그 방향으로 움직임 */
        /*keydown이벤트는 초당프레임이 낮다-> 이벤트속도가 느리다.->requestAnimationFrame을 사용하는 계기 */
        window.addEventListener('keydown', (e)=> {
            /*키를누르면 한 방향으로만 가게됨 그리고 연타 시 계속빨라짐
            ->키를 누르고있는 동안 keydown이벤트를 막아야함 */
            if (self.runningState) return;
            
            //e.keycode는 이제 사용안함 => 아래와같이 e.code로 사용
            if (e.code =="KeyA" || e.code =="ArrowLeft") {
                //왼쪽
                keyEvent("left")
                
                
            }else if (e.code =="KeyD" ||e.code =="ArrowRight") {
                // 오른쪽
                keyEvent("right")
                console.log(self.runningState)
            }
            else if (e.code =="KeyW"){
                keyEvent("forward")       
            
            }
            else if (e.code =="KeyS") {
                // 오른쪽
                keyEvent("backward")
                
            }
            
        });
          /*키에서 손을 뗐을 때 멈춰야한다. */
        window.addEventListener('keyup', function (e) {
            //이동 멈춤
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId); //requestAnimationFrame종료하는 법->고유한숫자값으로 현재 실행중인 requestAnimationFrame종료
            /*키를 떼면 runningstate가 true가된다. 이걸 다시 false로 해줘야 if (self.runningState)여기서 막히지않는다.*/
            //초기화해줘야함
            console.log(self.runningState)
            self.runningState = false;
        });
    },
    /*실제로 이동을 위한 메소드 */
    run: function (self) {
        if (self.direction == 'left') {
            /*left값을 speed만큼 빼주는 것 */
            self.xPos -= self.speed;
            console.log(self.speed)
        } else if (self.direction == 'right') {
            /*left값을 speed만큼 더해주는 것 */
            self.xPos += self.speed;
        }
        /*앞뒤(W,A)방향키는 여기서 해주면됨 */
        else if(self.direction =="forward"){
            /*처음에 let scrollNum=window.scrollY+20을 했었는데 캐릭터가 생성될때마다 속도가 점점커졌다
            이는 캐릭터생성될때마다 scrollNum값이 누적되어서 그렇다. 그래서 생성자안에 고정값 scrollY를 해주고, 거기에 +20만해주었다. */
            self.scrollYvalue+=20;
            window.scroll(0,self.scrollYvalue);
        }
        else if(self.direction =="backward"){
            self.scrollYvalue-=20;
            window.scroll(0,self.scrollYvalue);
        }
        /* 캐릭터의 최대 이동공간거리 정해줌*/
        if (self.xPos < 2) {
            self.xPos = 2;
        }

        if (self.xPos > 88) {
            self.xPos = 88;
        }
        /*실제로 갱신을 해줘야 이동한다. */
        self.mainElem.style.left = self.xPos + '%';

        /*requestAnimationFrame(self.run)으로만 하면 안된다. 아래와같이 변수안에 넣어주면서해야한다.
        처음에는 캐릭터객체를 잘 가지고 오지만 이후 window객체를 가져와 mainElem을 찾을 수 없게된다.
        자바스크립트의 this는 실행되는 문맥에따라 바뀌게된다.
        실행될 때 문맥이 바뀌면서 this가 window를 가리키게된다. */
        /*해결방법은 두가지가 있다
        첫번째는 run함수에 self인자를 두고 self만을 가리키게한다. 
        두번째는 bind함수를 사용하는 것이다.*/
        //requestAnimationFrame는 호출될때마다 리턴하는 고유한 숫자값이 있다. 이를 self.rafId에 계속 초기화한다.
        //이를 key에서 손을 뗐을 때 cancle을 해줘야 캐리터가 움직이다가 멈춘다.
        self.rafId = requestAnimationFrame(function () { //캐릭터가 부드럽게 움직이는 것을 위해
            self.run(self);
            
        });
    }
    // bind를 사용한 방법 : requestAnimationFrame의 호출 시 window객체를 가리키는 오류해결방법
    // run: function () {
    //     const self = this;
    //
    //     if (self.direction == 'left') {
    //         self.xPos -= self.speed;
    //     } else if (self.direction == 'right') {
    //         self.xPos += self.speed;
    //     }
    //
    //     if (self.xPos < 2) {
    //         self.xPos = 2;
    //     }
    //
    //     if (self.xPos > 88) {
    //         self.xPos = 88;
    //     }
    //
    //     self.mainElem.style.left = self.xPos + '%';
    //     //bind라는 함수는 호출방법과 관계 없이 특정 this값으로 호출되는 함수를 만드는 것이다.
           //그래서 run을 호출할때 인자를 넣지않아도된다.
    //     self.rafId = requestAnimationFrame(self.run.bind(self));
    // }
};