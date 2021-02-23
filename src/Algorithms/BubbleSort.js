import React from 'react'

import "./algo.css"
import AlgoBars from './AlgoBars';

function BubbleSort(){
    var arrIDs=[], animationBars={},globalPushDistance,animationIndex=0;
    var comparing, bottom, move=0, animationFinished=true, listSorted=false, arr=[];

    var elements = Math.floor(Math.random()*10) + 3, random, max=0, dict={};

    for(var i=0; i<elements; i++){
        random = Math.floor(Math.random()*100) + 1;
        if(random > max) max = random;
        if(!dict[`${random}`]){
            arr.push(random);
            dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
        }
    }
    // var [inputList, setInputList ] = useState(`${arr}`);
    // var [listNumber, setListNumber] = useState(arr);
    // const updateListNumber = (event) => {
    //     setInputList(event.target.value);
    //     // console.log(event.target.value);
    //     var temp = event.target.value.split(",");
    //     var flag = true, tempArr = [];
    //     for(var i=0; i<temp.length;i++) {
    //         temp[i] = temp[i].trim();
    //         if(isNaN(temp[i])) {
    //             alert("The list must contain only decimal numbers");
    //             flag = false;
    //             break;
    //         } else if(temp[i].length > 0) tempArr.push(Number(temp[i]));
    //     }
    //     // console.log(tempArr);
    //     if(flag){
    //         setListNumber(tempArr);
    //         arr = [...listNumber];
    //         console.log(arr);
    //         console.log(listNumber);
    //     }
    // }

    // function submitList() {
    //     var temp = listNumber.split(',');
    //     var newList = [];
    //     if (temp.length > 2) {
    //         for(var j=0; j<temp.length; j++){
    //             temp[j] = temp[j].trim();
    //             if(!isNaN(temp[j])){
    //                 newList.push(Number(temp[j]));
    //             }
    //             else {
    //                 alert("The list must contain only decimal numbers!");
    //                 break;
    //             }
    //         }
    //     }
    //     if(newList.length > 2) {
    //         arr = [...newList];
    //     }
    // }

    function sortList(){
        if(!listSorted){
            animationFinished = false;
            var temp,key=1, index=-1,counter=0;
            arrIDs.push(`${arr[0]}-blueToRed`);
            counter++;
            for(var i=arr.length; i>0; i--){
                arrIDs.push(`${arr[0]}-comparing`);
                counter++;
                for(var j=0; key<i;j++){
                    key = j + 1;
                    if(arr[j] > arr[key]){
                        if(index===-1) index = counter;
                        arrIDs.push(`${arr[j]}-${arr[key]}`);
                        arrIDs.push(`${arr[key]}-push`);
                        temp = arr[j];
                        arr[j] = arr[key];
                        arr[key] = temp;
                    }
                    else if(arr[key] && key!==i){
                        arrIDs.push(`${arr[j]}-${arr[key]}`);
                        arrIDs.push(`${arr[j]}-unsorted`);
                        arrIDs.push(`${arr[key]}-comparing`);
                        counter+=3
                    }
                }
                arrIDs.push(`${arr[key-1]}-sorted`);
                counter++;
                key=1;
            }
            // console.log(arr);
            // console.log(listNumber);
            for(i=0;i<arr.length; i++){
                // console.log(arr[i]);
                animationBars[`${arr[i]}`] = document.getElementById(`${arr[i]}`);
                animationBars[`${arr[i]}`].style.transition = "left 0.7s, bottom 0.7s";
            }
            temp = arrIDs[0].split("-")[0];
            var rect, rect2;
            animationHandler();
            rect = animationBars[`${max}`].getBoundingClientRect();
            bottom = rect.bottom - rect.top + 20;
            // console.log(index)
            // console.log(arrIDs)
            temp = arrIDs[index].split("-");
            rect = animationBars[`${temp[0]}`].getBoundingClientRect();
            rect2 = animationBars[`${temp[1]}`].getBoundingClientRect();
            globalPushDistance = rect2.left - rect.left;
            listSorted = true;
        }
        else{
            if(!animationFinished)
                alert("The animation is not finished!");
            else
                alert("The list is sorted");
        }
    }


    function comparingFunction(){
        var check = arrIDs[animationIndex].split("-")[0];
        move = dict[`${check}`].left;
        comparing = check;
        if(dict[`${check}`].color === "blue"){
            animationBars[`${check}`].style.animation = "blueToRed 0.3s forwards";
        }
        else if(dict[`${check}`].color === "green"){
            animationBars[`${check}`].style.animation = "greenToRed 0.3s forwards";
        }
        dict[`${check}`].color = "red";
        dict[`${check}`].animation = true;
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
        var check = arrIDs[animationIndex].split("-")[0];
        if(dict[`${check}`].animation){
            dict[`${check}`].animation = false;
            animationBars[`${check}`].removeEventListener("animationend", moveUp);
        }
        if(dict[`${check}`].transition){
            dict[`${check}`].transition = false;
            animationBars[`${check}`].removeEventListener("transitionend", moveUp);
        }
        dict[`${check}`].bottom += bottom;
        dict[`${check}`].transition = true;
        animationBars[`${check}`].style.bottom = `${dict[`${check}`].bottom}px`;
        animationBars[`${check}`].addEventListener("transitionend",animationHandler);
    }
    function greenFunction(){
        var check = arrIDs[animationIndex].split("-");
        dict[`${check[1]}`].color = "green";
        dict[`${check[1]}`].animation = true;
        animationBars[`${check[1]}`].style.animation = "blueToGreen .7s forwards";
        animationBars[`${check[1]}`].addEventListener("animationend", animationHandler);
    }

    function sortedHandler(){
        var check = arrIDs[animationIndex-1].split("-"),element;
        if(dict[`${check[1]}`] && dict[`${check[1]}`].color === "green"){
            element = animationBars[`${check[1]}`];
            dict[`${check[1]}`].color = "orange";
            element.style.animation = "greenToOrange 0.3s forwards";
        }
        if(dict[`${comparing}`].left === move){
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
        dict[`${check}`].left -= globalPushDistance;
        dict[`${comparing}`].left += globalPushDistance;
        dict[`${check}`].transition = true;
        animationBars[`${check}`].style.left = `${dict[`${check}`].left}px`;
        animationBars[`${check}`].addEventListener("transitionend", greenToBlue);
    }

    function greenToBlue(){
        var check = arrIDs[animationIndex].split("-")[0];
        if(dict[`${check}`].transition){
            dict[`${check}`].transition = false;
            animationBars[`${check}`].removeEventListener("transitionend", greenToBlue);
        }
        dict[`${check}`].animation = true;
        animationBars[`${check}`].style.animation = "greenToBlue 0.3s forwards";
        animationBars[`${check}`].addEventListener("animationend", animationHandler);
    }

    function unsortedHandler(){
        var check = arrIDs[animationIndex].split("-")[0];
        dict[`${check}`].color = "blue";
        dict[`${check}`].animation = true;
        animationBars[`${check}`].style.animation = "redToBlue 0.7s forwards";
        animationBars[`${check}`].addEventListener("animationend",moveUnsorted);
    }

    function moveUnsorted(){
        if(dict[`${comparing}`].animation){
            dict[`${comparing}`].animation = false;
            animationBars[`${comparing}`].removeEventListener("animationend", moveUnsorted);
        }
        if(dict[`${comparing}`].left === move)
            moveUp();
        else{
            dict[`${comparing}`].transition = true;
            animationBars[`${comparing}`].style.left = `${dict[`${comparing}`].left}px`;
            animationBars[`${comparing}`].addEventListener("transitionend", moveUp);
        }
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
                case "unsorted":
                    unsortedHandler();
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
            {/* <div className="input-group px-5 mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Enter List of Numbers"
                aria-label="Enter List of Numbers"
                aria-describedby="button-addon2"
                onChange={updateListNumber}
                value={inputList}
                disabled = {animationFinished ? false : true}
                />
        <button onClick={submitList} className="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
        </div> */}
            <div className="algobarsContainer position-relative">
                <h1 className="text-center">Bubble Sort</h1>
                <ul className="sortCanvas">
                    {arr.map((value) => {
                        var algobar = <AlgoBars number={value} maxValue={max} key={value}/>
                        return(algobar);
                    })}
                </ul>
                <button onClick={sortList} className="btn btn-primary position-absolute top-0 left-0 ms-5">Sort</button>
            </div>
        </section>
    )
}

export default BubbleSort;