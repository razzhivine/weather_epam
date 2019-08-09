function showPrecipitation(rain,snow) {
    if(rain===true&&snow===true){
        return '<p class="precipitation">дождь со снегом</p>'
    }else if(rain===true){
        return '<p class="precipitation">дождь</p>'
    }else if(snow===true){
        return '<p class="precipitation">снег</p>'
    }else{
        return '<p class="precipitation">без осадков</p>'
    }
}

function showIcon(cloudiness,rain,snow) {
    if(cloudiness==='Ясно'){
        return '<i class="fas fa-sun"></i>'
    }else if(cloudiness==='Облачно'){
        if (rain===true&&snow===true){
            return '<i class="fas fa-cloud-meatball"></i>'
        }else if(rain===true){
            return '<i class="fas fa-cloud-rain"></i>'
        }else if(snow===true){
            return '<i class="fas fa-cloud-meatball"></i>'
        }else{
            return '<i class="fas fa-cloud"></i>'
        }
    }
}
let day=['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let month=['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

let weather=document.querySelector('#weather');

let currentDay=document.querySelector('.currentDay');
let city='Самара';

let prev=document.querySelector('#prev');
let next=document.querySelector('#next');


for (let i=0; i<data.length; i++){
    
    if(i<3||i>5){
        weather.innerHTML+=`<div class="weather__block none"> 
                            <p class="day">${day[new Date(data[i].date).getDay()]}</p>
                            <p class="date">${new Date(data[i].date).getDate()} ${month[new Date(data[i].date).getMonth()]}</p>
                            ${showIcon(data[i].cloudiness, data[i].rain, data[i].snow)}
                            <p class="tempDay">днем ${data[i].temperature.day}<sup>o</sup></p>
                            <p class="tempNight">ночью ${data[i].temperature.night}<sup>o</sup></p>
                            ${showPrecipitation(data[i].rain, data[i].snow)}
                        </div>`;
    }else{
        
        weather.innerHTML+=`<div class="weather__block"> 
                                <p class="day">${day[new Date(data[i].date).getDay()]}</p>
                                <p class="date">${new Date(data[i].date).getDate()} ${month[new Date(data[i].date).getMonth()]}</p>
                                ${showIcon(data[i].cloudiness, data[i].rain, data[i].snow)}
                                <p class="tempDay">днем ${data[i].temperature.day}<sup>o</sup></p>
                                <p class="tempNight">ночью ${data[i].temperature.night}<sup>o</sup></p>
                                ${showPrecipitation(data[i].rain, data[i].snow)}
                            </div>`;
                            showCurrentDay(i);
    }
}
function prevSlide() {
    let block=document.querySelectorAll('.weather__block');
    for(var i=0; i<(block.length); i++){
        if (block[i].className==='weather__block'&&block[++i].className==='weather__block none'){
            block[--i].classList.add('none');
            block[i-3].classList.remove('none');
            if (i-3===0){
                document.querySelector('.fa-caret-left').remove();
                weather.style.marginLeft='82px'
            }
            if(document.querySelector('.fa-caret-right')===null){
                let right=document.createElement('i');
                right.id='next';
                right.className='fas fa-caret-right';
                document.querySelector('.main').appendChild(right);
                document.querySelector('#next').addEventListener('click', nextSlide);
            }
            break;
        }
    }
}

function nextSlide() {
    let block=document.querySelectorAll('.weather__block');
    for(var i=0; i<=block.length;i++){
        if (block[i].className==='weather__block'&&block[++i].className==='weather__block none'){
            --i;
            block[i-2].classList.add('none');
            block[++i].classList.remove('none');
            if (i===block.length-2){
                document.querySelector('.fa-caret-right').remove()
            }
            if(document.querySelector('.fa-caret-left')===null){
                let left=document.createElement('i');
                left.id='prev';
                left.className='fas fa-caret-left';
                document.querySelector('.main').insertBefore(left, weather);
                document.querySelector('#prev').addEventListener('click', prevSlide);
                weather.style.marginLeft='0'
            }
            break;
        }
        
    }
}
function showCurrentDay(i){
    --i;
    currentDay.innerHTML=`
        <span class="city">${city} ,</span> 
        <span>
            ${new Date(data[i].date).getDate()} ${month[new Date(data[i].date).getMonth()]}, 
            ${day[new Date(data[i].date).getDay()]}
        </span>
    `
}
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
