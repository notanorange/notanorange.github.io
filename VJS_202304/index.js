//로그인
const login_form = document.querySelector("#login_form");
const login_input = document.querySelector("#login_form input");

function afterLogin(){ //로그인 후 로그인 영역 없애고, 다음 페이지처럼 보이게 하기
    const login_wrap = document.querySelector(".login_wrap");
    const after_login = document.querySelector(".inner_wrap");
    const header = document.getElementById("hd");
    const footer = document.getElementById("ft");
    login_wrap.style.display = "none";
    after_login.classList.remove("hidden"); 
    header.classList.remove("hidden");
    footer.style.display = "flex";
}

function login(event){
    event.preventDefault();
    //console.log(login_input.value);
    const greetings = document.querySelector("#hd strong");
    const user = login_input.value;
    localStorage.setItem("username", user);
    greetings.innerHTML = `Hello, <span>${user}</span>`;
    greetings.classList.remove("hidden");

    afterLogin();
}

login_form.addEventListener("submit", login);


//랜덤 배경 이미지
const bg_wrap = document.querySelector(".bg_wrap");
const bg_btn = document.querySelector("#bg_btn");
const bg_img = [
    "bg01.jpeg", 
    "bg02.png", 
    "bg03.jpeg", 
    "bg04.jpeg", 
    "bg05.png"
];

function background(){
    const show_image = bg_img[Math.floor(Math.random() * bg_img.length)];
    //console.log(show_image);
    bg_wrap.style.backgroundImage = `url('./img/${show_image}')`;
}

bg_btn.addEventListener("click", background);



//to-do 리스트
const todo_form = document.querySelector("#todo_form");
const todo_input = document.querySelector("#todo_form input");
const todo_list = document.querySelector("#todo_list");
let todo_array = [];//todo 배열 만들기

function save_todo(){//todo 리스트 localStorage에 저장하기
    localStorage.setItem("todos", JSON.stringify(todo_array));
}

function delete_todo(event){//todo리스트 li 삭제하기
    //console.log(event.target.parentElement.innerText);
    const target_li = event.target.parentElement;
    target_li.remove();
    todo_array = todo_array.filter((toDo) => toDo.id !== parseInt(target_li.id));
    save_todo();
}

function add_todo(new_todo){// ul > li 만들기
    const li = document.createElement("li");
    li.id = new_todo.id;
    const span = document.createElement("span");
    span.innerText = new_todo.text;
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "❌";
    delete_btn.addEventListener("click", delete_todo);
    li.appendChild(span);
    li.appendChild(delete_btn);
    todo_list.appendChild(li);
}

function todo_event(e){
    e.preventDefault();
    console.log(todo_input.value);
    const new_todo = todo_input.value;
    todo_input.value = "";
    const new_todo_OBJ = {
        text: new_todo,
        id: Date.now(),
    };
    todo_array.push(new_todo_OBJ);//submit할때마다 그 내용을 todo 배열에 추가하기
    add_todo(new_todo_OBJ);
    save_todo();
}


todo_form.addEventListener("submit", todo_event);
const saved_todo = localStorage.getItem("todos");
if(saved_todo !== null){
    const parsed_todo = JSON.parse(saved_todo);
    todo_array = parsed_todo;
    parsed_todo.forEach(add_todo);

}



//실시간 시계
const clock = document.querySelector("#clock p");
function get_clock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");
    //console.log(hours, mins, sec);
    //console.log(typeof hours, typeof mins, typeof sec);
    clock.innerText = `${hours} : ${mins} : ${sec}`;
}  
get_clock();
setInterval(get_clock, 1000);

//날씨와 위치
const API_KEY = "d573c3ce07121d8e409bb1f5f733cdc7";
function result_ok(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(URL);
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            const location_name = document.querySelector("#weather span:first-of-type");
            const weather_like = document.querySelector("#weather span:last-of-type");
            location_name.innerText = data.name;
            weather_like.innerText = data.weather[0].main;
            
        });
}
function result_no(){
    alert("날씨 및 위치를 불러오는 데 실패했습니다.");
}
navigator.geolocation.getCurrentPosition(result_ok, result_no);
