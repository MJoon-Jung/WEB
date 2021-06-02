window.addEventListener("load",function(){
    let blocks = document.querySelectorAll(".block");
    let numbers = new Array(50);
    let h = document.querySelector("h1");

    for(let i = 0; i < numbers.length; i++){
        numbers[i] = i+1;
    }
    let count = 0;
    while(count < 50){
        let n = Math.floor(Math.random() * 25);
        let m = Math.floor(Math.random() * 25);
        let k = Math.floor(Math.random() * 25 + 25);
        let l = Math.floor(Math.random() * 25 + 25);

        let temp;
        temp = numbers[n];
        numbers[n] = numbers[m];
        numbers[m] = temp;

        temp = numbers[k];
        numbers[k] = numbers[l];
        numbers[l] = temp;
        count++;
    }

    for(let i = 0; i < 25; i++){
        blocks[i].innerHTML = numbers[i];
    }
    let b = 25;
    let z= 1;
    for(let i = 0; i < blocks.length; i++){        
        blocks[i].addEventListener("click", function(){
            if(blocks[i].innerHTML == z){
                if(z == 1){
                }
                setTimeout(function(){              
                    if(b <50){
                        blocks[i].innerHTML = numbers[b++];
                    }
                    else{
                        blocks[i].innerHTML = "";
                    }
                    z++;
                },700)
                blocks[i].innerHTML = "";
            }
        })
    }
})