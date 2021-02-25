import React, { useState } from 'react'
import './algo.css'
import AlgoBars from './AlgoBars'
// why did you not use transition instead of animation
// because I need delay and transition changes color
// gradually, but I need sudden changes with delays.

function SelectionSort(){
    var arr=[], arrIDs=[], animationBars={},distance,dict = {}, max=0;
    var animationIndex, fullAnimation=[], borderDistance=0;

    var elements = Math.floor(Math.random()*10) + 5, random, listSorted=false, animationFinished=true;
    // var elements = [62, 28, 76, 91, 18, 21, 7, 51, 54, 99, 3];

    for(var i=0; i<elements; i++){
        random = Math.floor(Math.random()*100) + 1;
        if(random > max) max = random;
        if(!dict[`${random}`]){
            arr.push(random);
            dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
        }
    }
    const [, setListNumber] = useState(arr);
    function generateList() {
        if(!animationFinished)
            alert("The animation has not been finished!");
        else {
            arr = [];
            dict = {};
            elements = Math.floor(Math.random()*10) + 3;

            for(var i=0; i<elements; i++){
                random = Math.floor(Math.random()*100) + 1;
                if(random > max) max = random;
                if(!dict[`${random}`]){
                    arr.push(random);
                    dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
                }
            }
            setListNumber(arr);
        }
    }

    function sortList(){
        if(!listSorted){
            animationFinished = false;
            var temp,key=1,index=0,prevKey, foundKey = false, moved = false, i;
            for(i=0; i<arr.length-1; i++){
                foundKey = false;
                moved = false;
                key = arr[i];
                prevKey = key;
                for(var j=i+1; j<arr.length;j++){
                    fullAnimation.push(`${key}-${arr[j]}`);
                    if(key > arr[j]){
                        foundKey = true;
                        prevKey = key;
                        fullAnimation.push(`${key}-${arr[j]}-Ccolor-${prevKey}`);
                        key = arr[j];
                        index = j;
                    }
                    else if(key < arr[j] && !foundKey){
                        fullAnimation.push(`${arr[j]}-${key}-Ccolor-${prevKey}`);
                        foundKey = true;
                    }
                }
                if(arr[i] !== key){
                    fullAnimation.push(`${arr[i]}-${arr[index]}-CPlace`);
                    fullAnimation.push(`${arr[index]}-${arr[index]}-${arr[index]}-${arr[index]}-move`);
                    moved = true;
                    arrIDs.push(`${arr[i]}-${arr[index]}`);
                    temp = arr[i];
                    arr[i] = arr[index];
                    arr[index] = temp;
                }
                if(!moved){
                    moved = true;
                    fullAnimation.push(`${key}-${key}-${key}-${key}-move`);
                }
            }
            fullAnimation.push(`${arr[i]}-${arr[i]}-${arr[i]}-${arr[i]}-move`);
            for(i=0;i<arr.length;i++){
                animationBars[`${arr[i]}`] = document.getElementById(`${arr[i]}`);
                animationBars[arr[i]].style.transition = "left 0.7s";
            }
            
            animationIndex=1;
            var num1, num2;
            num1 = parseInt(fullAnimation[0].split("-")[0]);
            num2 = parseInt(fullAnimation[0].split("-")[1]);
            animationBars[`${num1}`].style.animation = "blueToGreen 0.7s forwards";
            animationBars[`${num2}`].style.animation = "blueToGreen 0.7s forwards"; // green
            dict[`${num1}`].color = "green";
            dict[`${num2}`].color = "green";
            dict[`${num1}`].animation = true;
            animationBars[num1].addEventListener("animationend", onAnimationEnd);
            listSorted = true;
        }
        else{
            if(!animationFinished)
                alert("The animation is not finished!");
            else
                alert("The list is sorted");
        }
    }

    function onAnimationEnd(){
        var rect1, rect2, check, prevCheck, border;
        if(animationIndex < fullAnimation.length){
            prevCheck = fullAnimation[animationIndex-1].split("-");
            for(var i=1; i>=0; i--){
                check = fullAnimation[animationIndex-i].split("-");
                if(check.length > 1){
                    if(dict[`${check[1]}`].animation){
                        animationBars[`${check[1]}`].removeEventListener("animationend", onAnimationEnd);
                        dict[`${check[1]}`].animation = false;
                    }
                    if(dict[`${check[0]}`].animation){
                        animationBars[check[0]].removeEventListener("animationend", onAnimationEnd);
                        dict[`${check[0]}`].animation = false;
                    }

                    if(dict[`${check[1]}`].transition){
                        animationBars[`${check[1]}`].removeEventListener("transitionend", onAnimationEnd);
                        dict[`${check[1]}`].transition = false;
                    }
                    if(dict[`${check[0]}`].transition){
                        animationBars[check[0]].removeEventListener("transitionend", onAnimationEnd);
                        dict[`${check[0]}`].transition = false;
                    }
                }
            }
            // either two green or one red and one green
            if(check.length === 2){
                if(prevCheck.length === 5 || prevCheck.length < 2)
                    prevCheck = fullAnimation[animationIndex-2].split("-");
                if(prevCheck.length < 2)
                    prevCheck = fullAnimation[animationIndex-3].split("-");
                if(dict[`${prevCheck[0]}`].color === "green"){
                    animationBars[`${prevCheck[0]}`].style.animation = "greenToBlue 0.7s forwards";
                    dict[`${prevCheck[0]}`].color = "blue";
                }
                if(dict[`${prevCheck[1]}`].color === "green"){
                    animationBars[`${prevCheck[1]}`].style.animation = "greenToBlue 0.7s forwards";
                    dict[`${prevCheck[1]}`].color = "blue";
                }
                if(dict[`${check[0]}`].color === "blue"){
                    animationBars[`${check[0]}`].style.animation = "blueToGreen 0.7s forwards";
                    dict[`${check[0]}`].color = "green";
                }
                if(dict[`${check[1]}`].color === "blue"){
                    animationBars[`${check[1]}`].style.animation = "blueToGreen 0.7s forwards";
                    dict[`${check[1]}`].color = "green";
                }
                dict[`${check[1]}`].animation = true;
                animationBars[`${check[1]}`].addEventListener("animationend", onAnimationEnd);
            }
            else if(check.length === 3){// swap bars
                animationBars[`${prevCheck[1]}`].style.animation = "greenToBlue 0.7s forwards";
                dict[`${prevCheck[1]}`].color = "blue";

                if(dict[`${check[1]}`].color === "red"){
                    animationBars[`${check[1]}`].style.animation = "redToBlue 0.7s forwards";
                    dict[`${check[1]}`].color = "blue";
                }

                rect1 = animationBars[`${check[0]}`].getBoundingClientRect();
                rect2 = animationBars[`${check[1]}`].getBoundingClientRect();
                distance = rect2.left - rect1.left;
                dict[`${check[0]}`].left += distance;
                dict[`${check[1]}`].left -= distance;
                animationBars[`${check[0]}`].style.left = `${dict[`${check[0]}`].left}px`;
                animationBars[`${check[1]}`].style.left = `${dict[`${check[1]}`].left}px`;
                dict[`${check[0]}`].transition = true;
                animationBars[`${check[1]}`].addEventListener("transitionend", onAnimationEnd);
            }
            else if(check.length === 4){ // change color to red
                if(animationIndex > 2){
                    animationBars[`${check[3]}`].style.animation = "redToBlue 0.7s forwards";
                    dict[`${check[3]}`].color = "blue";
                }
                if(dict[`${check[1]}`].color !== "red"){
                    animationBars[`${check[1]}`].style.animation = "greenToRed 0.7s forwards";
                    dict[`${check[1]}`].color = "red";
                }
                if(dict[`${check[0]}`].color === "green"){
                    animationBars[`${check[0]}`].style.animation = "greenToBlue 0.7s forwards";
                    dict[`${check[0]}`].color = "blue";
                }
                dict[`${check[1]}`].animation = true;
                animationBars[`${check[1]}`].addEventListener("animationend", onAnimationEnd);
            }
            else if(fullAnimation[animationIndex].split("-")[4] === "move"){
                if(dict[`${check[1]}`].color === "red"){
                    animationBars[`${check[1]}`].style.animation = "redToBlue 0.7s forwards";
                    dict[`${check[1]}`].color = "blue";
                }
                if(dict[`${prevCheck[1]}`].color === "green"){
                    animationBars[`${prevCheck[1]}`].style.animation = "greenToBlue 0.7s forwards";
                    dict[`${prevCheck[1]}`].color = "blue";
                }
                var temp=fullAnimation[animationIndex].split("-")[1];
                border = document.getElementById("border");
                rect1 = border.getBoundingClientRect();
                rect2 = animationBars[`${temp}`].getBoundingClientRect();
                distance = rect2.right - rect1.left;
                borderDistance += distance;
                distance = rect2.left - rect1.left;
                dict[`${temp}`].left -= distance;
                border.style.transition = "left 0.7s";
                border.style.left = `${borderDistance}px`;
                animationBars[`${temp}`].style.left = `${dict[`${temp}`].left}px`;
                animationBars[`${temp}`].addEventListener("transitionend", onAnimationEnd);
            }
            animationIndex++;
            // animationBars[prevAnim].addEventListener("transitionend", onAnimationEnd);
        }
        else{
            animationFinished = true;
        }
    }

    return(
        <section className="algoSection">
            <div className="algobarsContainer position-relative">
                <h1 className="text-center">Selection Sort</h1>
                <ul className="sortCanvas">
                    <li id="border" style={{backgroundColor: "purple", width: ".2em",
                    margin: "0 0 0.5em 0.5em", padding: 0, left: 0, height: "50%"}}></li>
                    {arr.map((value) => {
                        var algobar = <AlgoBars number={value} maxValue={max} key={value}/>
                        return(algobar);
                    })}
                </ul>
                <div className="position-absolute top-0 start-0 ms-5">
                    <button onClick={sortList} className="btn btn-primary">Sort</button>
                    <button onClick={generateList} className="btn btn-primary ms-1">Random</button>
                </div>
            </div>
        </section>
    )
}

export default SelectionSort;