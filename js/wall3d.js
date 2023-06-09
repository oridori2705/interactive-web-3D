(function() {
    const houseElem=document.querySelector(".house")
    const progress=document.querySelector(".progress-bar");
    const stageElem=document.querySelector(".stage");
    const selectCharacterElem = document.querySelector('.select-character');
    const wBtn=document.querySelector(".select-w-btn");
    const aBtn=document.querySelector(".select-a-btn");
    const sBtn=document.querySelector(".select-s-btn");
    const dBtn=document.querySelector(".select-d-btn");
    
    let x=0,y=0;
    /*스크롤 값 퍼센트로 나타내는 방법 */
    /*창이 줄어들었을때 스크롤되는 양이 달라진다. 
    스크롤하는 영역 = 실제 전체 길이 - window화면사이즈(현재 한 보이는 화면 크기
    즉 document.body.scrollHeight-window.innerHeight이 스크롤 전체 길이 이다.
    window.scrollY / (document.body.scrollHeight-window.innerHeight)*/
    window.addEventListener("scroll",() => {
        //스크롤값 공식
        const scrollNum = (window.scrollY / (document.body.scrollHeight-window.innerHeight));
        //우리가 z값을 house의 속성에서 -490햇으니까
        //980곱하는 이유는 마지막에 약간의 여백을위해
        houseElem.style.transform = `translateZ(${scrollNum*980-490}vw)`
        /*progress바 스크롤값에따라 늘어남 */
        progress.style.width=`${scrollNum*100}%`;
    })
    window.addEventListener('mousemove', (e)=>{
        /*왼쪽위가 0,0이 아닌 가운데가 0,0이 되어야한다. */
        /*그리고 x값은 -1 ~ +1 y값도 -1 ~ +1의 범위가 되야한다. */
        /*clentX : 브라우저에서 사용자에게 웹페이지가 보여지는 영역을 기준으로 좌표를 표시합니다.
                    따라서, 스크롤바가 움직이더라도, 특정 지점의 clientX, clientY의 값은 동일합니다.
        pageX : 스크롤화면을 포함하여 측정 ->pageY 좌표값은 페이지가 스크롤 될때마다 변경 될 것입니다.*/
        /*공식 외우기 */
        x = -1+(e.clientX/window.innerWidth)*2; // -1 +(현재 화면의 좌표 / 전체화면좌표) *2 -> -1을하면 -1 ~ 0 ~1사이를 뜻함
        y = 1-(e.clientY/window.innerHeight)*2; // y또한 -1 ~ 0 ~ 1 의 범위이다. ->*2를 안하면 너무 값이 낮아서 회전비율이 낮아지기때문에 해줬다.
        //rotateX = x축을 기준으로 회전시킬때는 마우스 y의값에 영향을 받음
        //rotateY = y축을 기준으로 회전시킬때는 마우스 x의 값에 영향을 받음
        stageElem.style.transform=`rotateX(${y}deg) rotateY(${x}deg)`; //캐릭터도 있으면 회전시켜줘야하므로 stage 컨테이너를 rotate해야함
    });
    /* stage부분을 클릭하면 캐릭터생성하기*/
    stageElem.addEventListener('click', function (e) {
        
        new Character({
            /*캐릭터의 위치를 마우스의 위치로 설정하기위해 x값을 보내줌(퍼센트로보내주기위해 변환) */
            xPos: e.clientX / window.innerWidth * 100, 
            /*각 캐릭터마다 고유 걷는속도를 위해 지정 
            0.5 : 속도를 절반정도로 떨어뜨림(너무빠르면안되니까)
            0.2 : 최소 속도를 정함(너무 느린애는 없어야함)*/
            speed: Math.random() * 0.5 + 0.2
        });
    });
    //라면소녀로 캐릭터를 바꾸는 함수
    selectCharacterElem.addEventListener('click', function (e) {
        const value = e.target.getAttribute('data-char');//누른 버튼의 속성을 가져온다.
        document.body.setAttribute('data-char', value);
    });

    window.addEventListener('keydown', (e)=> {
        /*키를누르면 한 방향으로만 가게됨 그리고 연타 시 계속빨라짐
        ->키를 누르고있는 동안 keydown이벤트를 막아야함 */
        
        
        //e.keycode는 이제 사용안함 => 아래와같이 e.code로 사용
        if (e.code =="KeyA" || e.code =="ArrowLeft") {
            //왼쪽
            aBtn.style.opacity = 0.5;
            
            
        }else if (e.code =="KeyD" ||e.code =="ArrowRight") {
            // 오른쪽
            dBtn.style.opacity = 0.5;
        }
        else if (e.code =="KeyW"){
            wBtn.style.opacity = 0.5;  
        
        }
        else if (e.code =="KeyS") {
            // 뒤쪽
            sBtn.style.opacity = 0.5;
            
        }
        
    });
      /*키에서 손을 뗐을 때 멈춰야한다. */
    window.addEventListener('keyup', function (e) {
        if (e.code =="KeyA" || e.code =="ArrowLeft") {
            //왼쪽
            aBtn.style.opacity = 1;
            
            
        }else if (e.code =="KeyD" ||e.code =="ArrowRight") {
            // 오른쪽
            dBtn.style.opacity = 1;
        }
        else if (e.code =="KeyW"){
            wBtn.style.opacity = 1;  
        
        }
        else if (e.code =="KeyS") {
            // 뒤쪽
            sBtn.style.opacity = 1;
            
        }
    });

})();
