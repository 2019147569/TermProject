document.getElementById("baseball_list").style.display = "none";
document.getElementById("football_list").style.display = "none";

document.getElementById("baseball").addEventListener("click", function(){
    document.getElementById("baseball_list").style.display = "block";
    document.getElementById("football_list").style.display = "none";
});

document.getElementById("football").addEventListener("click", function(){
    document.getElementById("baseball_list").style.display = "none";
    document.getElementById("football_list").style.display = "block";
});

fetch('baseball.json')
.then( response => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
})
.then( json => initialize_b(json) )
.catch( err => console.error(`Fetch problem: ${err.message}`) );
console.log("zz");
function initialize_b(list){
    document.getElementById("baseball_list").childNodes.forEach(function(each){
        each.addEventListener("click", function(e){
            var main = document.getElementById("main");
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
            let index = 0;
            if(e.target.getAttribute('value')=="0"){
                if (navigator.geolocation) {
                    var latitude = 0;
                    var longitude = 0;
                    navigator.geolocation.getCurrentPosition(function(position){
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                        let distance = Math.pow(list[0].Latitude - latitude, 2) + Math.pow(list[0].Longitude - longitude, 2);
                        for(let i=1;i<list.length;i++){
                            let new_dist = Math.pow(list[i].Latitude - latitude, 2) + Math.pow(list[i].Longitude - longitude, 2);
                            if(new_dist < distance){
                                distance = new_dist;
                                index = i;
                            }
                        }
                    });
                    console.log(index);
                }else{
                    main.innerHTML="Failed:Not allowed to get your location"
                    return;
                }
            }else{
                index = parseInt(e.target.getAttribute('value')) - 1;
            }

            const url = `images/${list[index].Sit_image}`;
            fetch(url)
            .then( response => {
              if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
              }
              return response.blob();
            })
            .then( blob => show(blob, list) )
            .catch( err => console.error(`Fetch problem: ${err.message}`) );
    
            function show(blob, list){
                const objectURL = URL.createObjectURL(blob);
                const image = document.createElement('img');
                const heading = document.createElement('h2');
                const form = document.createElement("form");
                const selection = document.createElement('select');
                for(let i=0;i<list[index].Sits_kakao.length;i++){
                    let option = document.createElement('option');
                    option.innerHTML = list[index].Sits_kakao[i].name;
                    option.setAttribute("value", i);
                    option.style.color = list[index].Sits_kakao[i].color;
                    selection.appendChild(option);
                }
                selection.setAttribute('name', 'seat');
                const submit = document.createElement('button');
                
                submit.onclick = function(){
                    
                }
                
                submit.innerHTML = '좌석이미지 불러오기';
                submit.style.cssText  = 'width: 220px; height: 50px; color: white; background-color: black; outline: none; margin:2px';
                selection.style.cssText  = 'width: 220px; height: 50px; color: white; background-color: black; outline: none; margin:2px';
                form.setAttribute('method', 'get');
                form.setAttribute('action', `/stadium/${list[index].id}`);
                form.appendChild(submit);
                form.appendChild(selection);

                const sportSelect = document.createElement('input');
                sportSelect.setAttribute('type', 'hidden');
                sportSelect.setAttribute('name', 'sport');
                sportSelect.setAttribute('value', 'baseball');
                form.appendChild(sportSelect);

    
                heading.innerHTML = list[index].name;
                image.src = objectURL;
                image.alt = list[index].name;
                
                main.appendChild(heading);
                main.appendChild(image);
                main.appendChild(form);
            }
        });
    });
}

function show_img(blob){
    const main = document.getElementById("main");
    const image = document.createElement('img');
    image.src = blob;
    main.appendChild(image);
}

fetch('football.json')
    .then( response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then( json => initialize_f(json) )
    .catch( err => console.error(`Fetch problem: ${err.message}`) );        
        
function initialize_f(list){
    document.getElementById("football_list").childNodes.forEach(function(each){
        each.addEventListener("click", function(e){
            var main = document.getElementById("main");
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
            let index = 0;
            if(e.target.getAttribute('value')=="0"){
                if (navigator.geolocation) {
                    var latitude = 0;
                    var longitude = 0;
                    navigator.geolocation.getCurrentPosition(function(position){
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                        for(let i=1;i<list.length;i++){
                            let new_dist = Math.pow(list[i].Latitude - latitude, 2) + Math.pow(list[i].Longitude - longitude, 2);
                            if(new_dist < distance){
                                distance = new_dist;
                                index = i;
                            }
                        }
                    });
                    let distance = Math.pow(list[0].Latitude - latitude, 2) + Math.pow(list[0].Longitude - longitude, 2);

                }else{
                    main.innerHTML="Failed:Not allowed to get your location"
                    return;
                }
            }else{
                index = parseInt(e.target.getAttribute('value')) - 1;
            }

            const url = `images/${list[index].Sit_image}`;
            fetch(url)
            .then( response => {
              if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
              }
              return response.blob();
            })
            .then( blob => show(blob, list) )
            .catch( err => console.error(`Fetch problem: ${err.message}`) );
    
            function show(blob, list){
                const objectURL = URL.createObjectURL(blob);
                const image = document.createElement('img');
                const heading = document.createElement('h2');
                const form = document.createElement("form");
                const selection = document.createElement('select');
                for(let i=0;i<list[index].Sits_kakao.length;i++){
                    let option = document.createElement('option');
                    option.innerHTML = list[index].Sits_kakao[i].name;
                    option.setAttribute("value", i);
                    option.style.color = list[index].Sits_kakao[i].color;
                    selection.appendChild(option);
                }
                selection.setAttribute('name', 'seat');
                const submit = document.createElement('button');

                submit.innerHTML = '좌석이미지 불러오기';
                submit.style.cssText  = 'width: 220px; height: 50px; color: white; background-color: black; outline: none; margin:2px';
                selection.style.cssText  = 'width: 220px; height: 50px; color: white; background-color: black; outline: none; margin:2px';
                form.setAttribute('method', 'get');
                form.setAttribute('action', `/stadium/${list[index].id}`);
                form.appendChild(submit);
                form.appendChild(selection);

                
                const sportSelect = document.createElement('input');
                sportSelect.setAttribute('type', 'hidden');
                sportSelect.setAttribute('name', 'sport');
                sportSelect.setAttribute('value', 'football');
                form.appendChild(sportSelect);

                heading.innerHTML = list[index].name;
    
                image.src = objectURL;
                image.alt = list[index].name;
                
                main.appendChild(heading);
                main.appendChild(image);
                main.appendChild(form);
            }
        });
    });
}