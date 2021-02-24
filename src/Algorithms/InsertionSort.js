import React, { useState } from 'react'

import './algo.css'
import AlgoBars from './AlgoBars';

function InsertionSort(){
    var arr=[], arrIDs=[], animationBars={},globalPushDistance, animationIndex=0, dict={}, sorted=false, animationFinished=true;
    var elements = Math.floor(Math.random()*10) + 3, random, max=0, comparing, bottom;
    // var elements = [62, 28, 54, 99, 3], random, max=0, bottom, comparing;

    for(var i=0; i<elements; i++){
        random = Math.floor(Math.random()*100) + 1;
        // var random = elements[i];
        if(random > max) max = random;
        if(!dict[`${random}`]){
            arr.push(random);
            dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
        }
    }

    const [_, setListNumber] = useState([]);

    for(var i=0; i<elements; i++){
        random = Math.floor(Math.random()*100) + 1;
        if(random > max) max = random;
        if(!dict[`${random}`]){
            arr.push(random);
            dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
        }
    }
    function generateList() {
        if(!animationFinished)
            alert("The animation has not been finished!");
        else {
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
        if(!sorted){
            animationFinished = false;
            // console.log(arr);
            var temp,key,chosen=arr[0],counter=0, index=-1,j,num1,num2, i;
            arrIDs.push(`${arr[0]}-sorted`);
            for(i=1; i<arr.length; i++){
                key=i;
                chosen = arr[key];
                arrIDs.push(`${arr[i]}-comparing`);
                counter++;
                for(j=i-1; j>=0;j--){
                    if(arr[key] < arr[j]){
                        if(index===-1)
                            index=counter;
                        arrIDs.push(`${arr[key]}-${arr[j]}`);
                        arrIDs.push(`${arr[j]}-push`);
                        counter+=2;
                        temp = arr[key];
                        arr[key] = arr[j];
                        arr[j] = temp;
                        chosen = arr[j];
                        key--;
                    }
                    else {
                        num1 = arr[key];
                        num2 = arr[j];
                        break;
                    }
                }
                if(num1 && num2 && !arrIDs.includes(`${num1}-${num2}`)){
                    arrIDs.push(`${num1}-${num2}`);
                }
                arrIDs.push(`${chosen}-sorted`);
                counter+=2;
            }
            for(i=0;i<arr.length; i++){
                animationBars[`${arr[i]}`] = document.getElementById(`${arr[i]}`);
                animationBars[`${arr[i]}`].style.transition = "left 0.7s, bottom 0.7s";
            }
            temp = arrIDs[0].split("-")[0];
            var rect, rect2;
            dict[temp].sorted = true;
            dict[temp].color = "orange";
            dict[temp].animation = true;
            // console.log(`animation is added to ${temp}`);
            animationBars[temp].style.animation = "greenToOrange 0.7s forwards";
            animationBars[temp].addEventListener("animationend", animationHandler);
            rect = animationBars[`${max}`].getBoundingClientRect();
            bottom = rect.bottom - rect.top + 20;
            // console.log(arrIDs);
            // console.log(arr);
            temp = arrIDs[index+1].split("-");
            rect = animationBars[`${temp[0]}`].getBoundingClientRect();
            rect2 = animationBars[`${temp[1]}`].getBoundingClientRect();
            globalPushDistance = rect.left - rect2.left;
        }
        else{
            if(!animationFinished)
                alert("The animation is not finished!");
            else
                alert("The list is sorted!");
        }
        sorted = true;
    }

    function comparingFunction(){
        var check = arrIDs[animationIndex].split("-")[0];
        comparing = check;
        dict[`${check}`].color = "red";
        dict[`${check}`].animation = true;
        animationBars[`${check}`].style.animation = "blueToRed 0.3s forwards";
        animationBars[`${check}`].addEventListener("animationend",moveDown);
    }

    function moveDown(){
        var check = arrIDs[animationIndex].split("-")[0];
        if(dict[`${check}`].animation){
            dict[`${check}`].animation = false;
            animationBars[`${check}`].removeEventListener("animationend", moveDown);
        }
        dict[`${check}`].bottom -= bottom;
        dict[`${check}`].transition = true;
        animationBars[`${check}`].style.bottom = `${dict[`${check}`].bottom}px`;
        animationBars[`${check}`].addEventListener("transitionend",animationHandler);
    }
    function moveUp(){
        if(dict[`${comparing}`].animation){
            dict[`${comparing}`].animation = false;
            animationBars[`${comparing}`].removeEventListener("animationend", moveUp);
        }
        dict[`${comparing}`].bottom += bottom;
        dict[`${comparing}`].transition = true;
        animationBars[`${comparing}`].style.bottom = `${dict[`${comparing}`].bottom}px`;
        animationBars[`${comparing}`].addEventListener("transitionend",animationHandler);
    }
    function greenFunction(){
        var check = arrIDs[animationIndex].split("-");
        dict[`${check[1]}`].color = "green";
        dict[`${check[1]}`].animation = true;
        animationBars[`${check[1]}`].style.animation = "blueToGreen 0.7s forwards";
        animationBars[`${check[1]}`].addEventListener("animationend", animationHandler);
    }

    function sortedHandler(){
        var check = arrIDs[animationIndex-1].split("-"),element;
        if(dict[`${check[1]}`] && dict[`${check[1]}`].color === "green"){
            element = animationBars[`${check[1]}`];
            dict[`${check[1]}`].color = "orange";
            element.style.animation = "greenToOrange 0.3s forwards";
        }
        if(dict[`${comparing}`].left === 0){
            comparingToSorted();
        }
        else{
            element = animationBars[`${comparing}`];
            dict[`${comparing}`].transition = true;
            element.style.left = `${dict[`${comparing}`].left}px`;
            element.addEventListener("transitionend",comparingToSorted);
        }
    }

    function comparingToSorted(){
        var element = animationBars[`${comparing}`];
        if(dict[`${comparing}`].transition){
            dict[`${comparing}`].transition = false;
            element.removeEventListener("transitionend", comparingToSorted);
        }
        dict[`${comparing}`].color = "orange";
        dict[`${comparing}`].sorted = true;
        dict[`${comparing}`].animation = true;
        element.style.animation = "redToOrange 0.7s forwards";
        element.addEventListener("animationend",moveUp);
    }

    function pushHandler(){
        var check = arrIDs[animationIndex].split("-")[0];
        dict[`${check}`].left += globalPushDistance;
        dict[`${comparing}`].left -= globalPushDistance;
        dict[`${check}`].transition = true;
        animationBars[`${check}`].style.left = `${dict[`${check}`].left}px`;
        animationBars[`${check}`].addEventListener("transitionend", greenToOrange);
    }

    function greenToOrange(){
        var check = arrIDs[animationIndex].split("-")[0];
        if(dict[`${check}`].transition){
            dict[`${check}`].transition = false;
            animationBars[`${check}`].removeEventListener("transitionend", greenToOrange);
        }
        dict[`${check}`].animation = true;
        animationBars[`${check}`].style.animation = "greenToOrange 0.3s forwards";
        animationBars[`${check}`].addEventListener("animationend", animationHandler);
    }

    function animationHandler(){
        animationIndex++;
        if(animationIndex < arrIDs.length){
            var check = arrIDs[animationIndex].split("-");
            var prevCheck = arrIDs[animationIndex-1].split("-");

            if(dict[`${prevCheck[0]}`].transition){
                animationBars[`${prevCheck[0]}`].removeEventListener("transitionend",animationHandler);
                dict[`${prevCheck[0]}`].transition = false;
            }
            if(prevCheck[1].length <= 3 && dict[`${prevCheck[1]}`].transition){
                animationBars[`${prevCheck[1]}`].removeEventListener("transitionend",animationHandler);
                dict[`${prevCheck[1]}`].transition = false;
            }
            if(dict[`${prevCheck[0]}`].animation){
                animationBars[`${prevCheck[0]}`].removeEventListener("animationend",animationHandler);
                dict[`${prevCheck[0]}`].animation = false;
            }
            if(prevCheck[1].length <= 3 && dict[`${prevCheck[1]}`].animation){
                animationBars[`${prevCheck[1]}`].removeEventListener("animationend",animationHandler);
                dict[`${prevCheck[1]}`].animation = false;
            }
            // console.log(check[1]);
            switch(check[1]){
                case "comparing":
                    comparingFunction();
                    break;
                case "sorted":
                    sortedHandler();
                    break;
                case "push":
                    pushHandler();
                    break;
                default:
                    greenFunction();
                    break;
            }
        }
        else{
            animationFinished = true;
        }
    }

    return(
        <section className="algoSection">
            <div className="algobarsContainer position-relative">
                <h1 className="text-center">Insertion Sort</h1>
                <ul className="sortCanvas">
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

export default InsertionSort

// Code for Safari 3.1 to 6.0
// document.getElementById("myDIV").addEventListener("webkitTransitionEnd", myFunction);