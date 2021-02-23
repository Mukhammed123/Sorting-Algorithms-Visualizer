import React from 'react'
import './algo.css'
import AlgoBars from './AlgoBars'

function HeapSort(){
    var arr = [], arrIDs=[], animationBars={},animationIndex=0, dict={};
    var elements = Math.floor(Math.random()*10) + 3, random, max=0, bottom;
    // var elements = [5, 21, 65, 39, 17, 57, 25], random, max=0, bottom;

    for(var i=0; i<elements; i++){
        random = Math.floor(Math.random()*100) + 1;
        // var random = elements[i];
        if(random > max) max = random;
        if(!dict[`${random}`]){
            arr.push(random);
            dict[`${random}`] = {left: 0, color: "#4183d7", transition: false, animation: false};
        }
    }
    var n = arr.length;

    function heapify(arr,n, i) 
    { 
    var largest = i; // Initialize largest as root 
    var l = 2*i + 1; // left = 2*i + 1 
    var r = 2*i + 2; // right = 2*i + 2 
  
    // If left child is larger than root 
    if(l < n){
        arrIDs.push(`compare-${arr[l]}-${arr[largest]}`);
        if (arr[l] > arr[largest]){ 
            arrIDs.push(`larger-${arr[l]}-${arr[largest]}`);
            largest = l; 
        }
        else{
            arrIDs.push(`larger-${arr[largest]}-${arr[l]}`);
        }
    }
  
    // If right child is larger than largest so far 
    if(r < n){
        arrIDs.push(`compare-${arr[r]}-${arr[largest]}`);
        if (arr[r] > arr[largest]) {
            arrIDs.push(`larger-${arr[r]}-${arr[largest]}`);
            largest = r; 
        }
        else{
            arrIDs.push(`larger-${arr[largest]}-${arr[r]}`);
        }
    }
  
    // If largest is not root 
    if (largest !== i) 
    { 
        // console.log(`push-${arr[i]}-${arr[largest]}`);
        arrIDs.push(`calculate-${arr[i]}-${arr[largest]}`);
        arrIDs.push(`move-${arr[i]}`);
        arrIDs.push(`move-${arr[largest]}`);
        arrIDs.push(`up-${arr[i]}-${arr[largest]}`);
        var temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp
  
        // Recursively heapify the affected sub-tree 
        heapify(arr, n, largest); 
    } 
} 
  
// main function to do heap sort 
    function heapSort() 
    { 
        console.log(arr);
        var i;
        // Build heap (rearrange array) 
        for (i = parseInt(n / 2) - 1; i >= 0; i--) 
            heapify(arr,n, i); 
    
        // One by one extract an element from heap 
        for (i=n-1; i>0; i--) 
        { 
            // Move current root to end
            // console.log(`push-${arr[0]}-${arr[i]}`);
            arrIDs.push(`calculate-${arr[0]}-${arr[i]}`);
            arrIDs.push(`move-${arr[0]}`);
            arrIDs.push(`move-${arr[i]}`);
            arrIDs.push(`up-${arr[0]}-${arr[i]}`);
            var temp = arr[i];
            arr[i] = arr[0];
            arr[0] = temp;
            arrIDs.push(`fixed-${arr[i]}`);
            // call max heapify on the reduced heap 
            heapify(arr,i, 0); 
        } 
        // console.log(arr);
        // console.log(arrIDs);
        var element;
        for(i=0;i<arr.length;i++){
            element = document.getElementById(`${arr[i]}`);
            element.style.transition = "bottom 0.7s linear, left 0.7s linear";
            element.style.transitionDelay = "0.1s";
            animationBars[`${arr[i]}`] = element;
        }
        var rect = animationBars[`${max}`].getBoundingClientRect();
        bottom = rect.bottom - rect.top + 20;
        // console.log(bottom);
        var check = arrIDs[0].split("-");
        var num1 = check[1];
        var num2 = check[2];
        dict[`${num2}`].animation = true;
        animationBars[`${num1}`].style.animation= "blueToWhite 0.4s forwards";
        animationBars[`${num2}`].style.animation = "blueToWhite 0.4s forwards";
        dict[`${num1}`].color = "#FEFFB5";
        dict[`${num2}`].color = "#FEFFB5";
        animationBars[`${num1}`].style.color = "#767680";
        animationBars[`${num2}`].style.color = "#767680";
        animationBars[`${num2}`].addEventListener("animationend",startAnimation);
    }

    function compareFunction(){
        var check = arrIDs[animationIndex].split("-");
        if(dict[`${check[1]}`].color !== "#FEFFB5"){
            dict[`${check[1]}`].color = "#FEFFB5";
            dict[`${check[1]}`].animation = true;
            animationBars[`${check[1]}`].style.color = "#767680";
            animationBars[`${check[1]}`].style.animation = "blueToWhite 0.4s forwards";
            animationBars[`${check[1]}`].addEventListener("animationend",startAnimation);
            if(dict[`${check[2]}`].color !== "#FEFFB5"){
                dict[`${check[2]}`].color = "#FEFFB5";
                animationBars[`${check[2]}`].style.color = "#767680";
                animationBars[`${check[2]}`].style.animation = "blueToWhite 0.4s forwards";
            }
        }
        else if(dict[`${check[2]}`].color !== "#FEFFB5"){
            dict[`${check[2]}`].color = "#FEFFB5";
            dict[`${check[2]}`].animation = true;
            animationBars[`${check[2]}`].style.color = "#767680";
            animationBars[`${check[2]}`].style.animation = "blueToWhite 0.4s forwards";
            animationBars[`${check[2]}`].addEventListener("animationend",startAnimation);
        }
        else
            startAnimation();
    }

    function largerFunction(){
        var check = arrIDs[animationIndex].split("-");
        if(dict[`${check[1]}`].color !== "rgb(241, 44, 44)"){
            dict[`${check[1]}`].color = "rgb(241, 44, 44)";
            dict[`${check[1]}`].animation = true;
            animationBars[`${check[1]}`].style.color = "#F1F1F1";
            animationBars[`${check[1]}`].style.animation = "whiteToRed 1s forwards";
            animationBars[`${check[1]}`].addEventListener("animationend",startAnimation);
            if(dict[`${check[2]}`].color === "#FEFFB5"){
                animationBars[`${check[2]}`].style.color = "#F1F1F1";
                dict[`${check[2]}`].color = "#4183d7";
                animationBars[`${check[2]}`].style.animation = "whiteToBlue 0.4s forwards";
            }
            else if(dict[`${check[2]}`].color === "rgb(241, 44, 44)"){
                animationBars[`${check[2]}`].style.color = "#F1F1F1";
                dict[`${check[2]}`].color = "#4183d7";
                animationBars[`${check[2]}`].style.animation = "redToBlue 0.4s forwards";
            }
        }
        else{
            if(dict[`${check[2]}`].color === "#FEFFB5"){
                animationBars[`${check[2]}`].style.color = "#F1F1F1";
                dict[`${check[2]}`].color = "#4183d7";
                animationBars[`${check[2]}`].style.animation = "whiteToBlue 0.4s forwards";
                dict[`${check[2]}`].animation = true;
                animationBars[`${check[2]}`].addEventListener("animationend",startAnimation);
            }
            else if(dict[`${check[2]}`].color === "rgb(241, 44, 44)"){
                animationBars[`${check[2]}`].style.color = "#F1F1F1";
                dict[`${check[2]}`].color = "#4183d7";
                animationBars[`${check[2]}`].style.animation = "redToBlue 0.4s forwards";
                dict[`${check[2]}`].animation = true;
                animationBars[`${check[2]}`].addEventListener("animationend",startAnimation);
            }
            else
                startAnimation();
        }
    }

    function moveUp(){
        var check = arrIDs[animationIndex].split("-");
        for(var i=1;i<3;i++)
            animationBars[`${check[i]}`].style.bottom = `0px`;
        dict[`${check[1]}`].transition = true;
        animationBars[`${check[1]}`].addEventListener("transitionend",startAnimation);
    }
    function calculateDistance(){
        var check = arrIDs[animationIndex].split("-");
        var rect1 = animationBars[`${check[1]}`].getBoundingClientRect();
        var rect2 = animationBars[`${check[2]}`].getBoundingClientRect();
        var distance = rect2.left - rect1.left;
        dict[`${check[1]}`].left += distance;
        dict[`${check[2]}`].left -= distance;
        startAnimation();
    }
    function moveHandler(){
        var check = arrIDs[animationIndex].split("-");
        animationBars[`${check[1]}`].style.left = `${dict[`${check[1]}`].left}px`;
        animationBars[`${check[1]}`].style.bottom = `-${bottom}px`;
        dict[`${check[1]}`].transition = true;
        animationBars[`${check[1]}`].addEventListener("transitionend",startAnimation);
    }
    function fixedPosition(){
        var check = arrIDs[animationIndex].split("-");
        dict[`${check[1]}`].color = "#caa708";
        dict[`${check[1]}`].animation = true;
        animationBars[`${check[1]}`].style.animation = "redToOrange 0.4s forwards";
        animationBars[`${check[1]}`].addEventListener("animationend", startAnimation);
    }

    function startAnimation(){
        var check = arrIDs[animationIndex].split("-"),i;
        for(i=1;i<3;i++){
            if(dict[`${check[i]}`]){
                if(dict[`${check[i]}`].animation){
                    animationBars[`${check[i]}`].removeEventListener("animationend",startAnimation);
                    dict[`${check[i]}`].animation = false;
                }
                if(dict[`${check[i]}`].transition){
                    animationBars[`${check[i]}`].removeEventListener("transitionend",startAnimation);
                    dict[`${check[i]}`].transition = false;
                }
            }
        }
        animationIndex++;
        if(animationIndex < arrIDs.length){
            check = arrIDs[animationIndex].split("-");
            switch(check[0]){
                case "compare":
                    compareFunction();
                    break;
                case "larger":
                    largerFunction();
                    break;
                case "up":
                    moveUp();
                    break;
                case "calculate":
                    calculateDistance();
                    break;
                case "move":
                    moveHandler();
                    break;
                default:
                    fixedPosition();
                    break;
            }
        }
        else{
            // console.log(arr);
            for(i=0;i<arr.length;i++){
                // console.log(dict[`${arr[i]}`])
                if(dict[`${arr[i]}`].color === "#4183d7"){
                    // console.log("CALLED")
                    dict[`${arr[i]}`].color = "#caa708";
                    animationBars[`${arr[i]}`].style.animation = "blueToOrange 0.4s forwards";
                }
                else if(dict[`${arr[i]}`].color === "rgb(241, 44, 44)"){
                    dict[`${arr[i]}`].color = "#caa708";
                    animationBars[`${arr[i]}`].style.animation = "redToOrange 0.4s forwards";
                }
            }
        }
    }
    return (
        <section className="algoSection">
            <h1 className="text-center">Heap Sort</h1>
            <ul className="sortCanvas">
                {arr.map((value) => {
                    var algobar = <AlgoBars number={value} maxValue={max} key={value}/>
                    return(algobar);
                })}
            </ul>
            <button onClick={heapSort} className="btn btn-primary position-absolute top-0 left-0 ms-5">Sort</button>
        </section>
    )
}

export default HeapSort;
