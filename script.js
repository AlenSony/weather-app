const input = document.querySelector(".input");
const check = document.querySelector("#submit-button");
const getloc = document.querySelector("#Get-Loc");
const result_container = document.querySelector(".result");
const source = document.querySelector("#video-source");
const video = document.querySelector("#background-video");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const day = document.querySelector(".day");


check.addEventListener("click",async () =>{
    let result =await  fetchData(input.value);
    weather = result.current.condition.text;
    input.value = "";
    if(weather == "Clear" || weather == "Sunny" || weather == "Partly Cloudy" || weather == "Mist" || weather == "Rainy"){
        source.src = `./public/${weather}.mp4`;
        video.load();
    }
    else if(weather == "Patchy rain nearby" || weather == "Rainy"){
        source.src = `./public/Rainy.mp4`;
        video.load();
    }
    else{
        source.src = `./public/Overcast.mp4`;
        video.load();
    }
    console.log(result.location.name);
    result_container.innerHTML =`
    <div class="content">
        <h5 class="name"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>${result.location.region}</h5>
        <h5 class="country"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z"/></svg>Country:  ${result.location.country}</h5>
        <h5 class="local-time"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-500v-60h240v60H360Zm40 120v-60h160v60H400Zm20-420h120-120Zm0 640h120-120Zm-60 80-54-182q-48-38-77-95t-29-123q0-66 29-123t77-95l54-182h240l54 182q48 38 77 95t29 123q0 66-29 123t-77 95L600-80H360Zm120-200q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm-76-470q20-5 38.5-8t37.5-3q19 0 37.5 3t38.5 8l-16-50H420l-16 50Zm16 590h120l16-50q-20 5-38.5 7.5T480-200q-19 0-37.5-2.5T404-210l16 50Z"/></svg>Local Time:  ${result.location.localtime}</h5>
        <h5 class="condition"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>Condition:  ${result.current.condition.text}</h5>
        <h5 class="temp"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-83 0-141.5-58.5T280-280q0-48 21-89.5t59-70.5v-320q0-50 35-85t85-35q50 0 85 35t35 85v320q38 29 59 70.5t21 89.5q0 83-58.5 141.5T480-80Zm-40-440h80v-40h-40v-40h40v-80h-40v-40h40v-40q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240Z"/></svg>Temperature:  ${result.current.temp_c}°C</h5>
        <h5 class="wind"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>Wind:  ${result.current.wind_kph} km/h</h5>
    </div>
    `;
})
function updateTime() {
    const now =new Date();
    if(now.getDay() == 0){
        day.innerHTML =`<div class="day">Sun</div>`;
    }
    else if(now.getDay() == 1){
        day.innerHTML =`<div class="day">Mon</div>`;
    }
    else if(now.getDay() == 2){
        day.innerHTML =`<div class="day">Tue</div>`;
    }   
    else if(now.getDay() == 3){
        day.innerHTML =`<div class="day">Wed</div>`;
    }
    else if(now.getDay() == 4){
        day.innerHTML =`<div class="day">Thu</div>`;
    }
    else if(now.getDay() == 5){
        day.innerHTML =`<div class="day">Fri</div>`;
    }
    else if(now.getDay() == 6){
        day.innerHTML =`<div class="day">Sat</div>`;
    }
    time.innerHTML =`<div class="time"> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</div>`;
    date.innerHTML =`<div class="date"> ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}</div>`;
    
}
setInterval(updateTime,1000);




async function fetchData(City) {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=3ee44c607e57416396270326252406&q=${City}&aqi=no`);
    const result = await data.json();
    console.log(result);
    return result;
    
}
updateTime();