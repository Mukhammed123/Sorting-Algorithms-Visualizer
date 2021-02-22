import React from 'react'
import "./algo.css"
import AlgoBars from './AlgoBars';

function MergeSort(){
    var arr=[], arrIDs=[], animationBars={},globalPushDistance=0,animationIndex=-1, dict={}, color,index;
    var elements = Math.floor(Math.random()*10) + 3, random, max=0, bottom,colorCounter=0, listSorted=false, animationFinished=false;
    var colorList = ["#31DE0A","#84DE0A","#D1DE0A","#DEBB0A","#DE910A","#DE740A","#DE4A0A","#DE0A0A","#0ADE81",
                    "#0ADEB7 ","#0A9BDE","#0A54DE","#2D0ADE","#840ADE ","#BE0ADE","#DE0AC8","#DE0A8A ","#DE0A67"];
                    // [18, 8, 34, 25, 37, 88, 9, 5, 20, 73]
    // var elements = [11, 99, 73, 29, 100, 13, 41, 75, 81], random, max=0, bottom, colorCounter=0, listSorted=false, animationFinished=false;
    for(var i=0; i<elements; i++){
        random = Math.floor(Math.random()*100) + 1;
        index = i;
        if(index >= colorList.length){
            index = colorCounter;
            colorCounter++;
        }
        // var random = elements[i];
        if(random > max) max = random;
        if(!dict[`${random}`]){
            arr.push(random);
            dict[`${random}`] = {left: 0, bottom:0, original:0, parent: `${random}`, color: `${colorList[index]}`, transition: false};
        }
    }
    console.log(arr)
    function merge(l,m,r){
        var i,j,k;
        var n1 = m - l + 1;
        var n2 = r - m;

        var L = [], R = [];
        for(i=0; i<n1; i++)
            L.push(arr[l+i]);
        for(j=0;j<n2;j++)
            R.push(arr[m+1+j]);

        i=0; j=0; k=l;
        var temp = [],x;
        for(x=l;x<=r;x++)
            temp.push(arr[x]);


        while(i<n1 && j<n2){
            if(L[i] <= R[j]){
                arrIDs.push(`${L[i]}-${R[j]}`);
                arr[k] = L[i];
                i++;
            }
            else{
                arrIDs.push(`${R[j]}-${L[i]}`);
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        var counter=0;
        var str = "up";
        for(x=r;x>=l;x--){
            str += `-${temp[counter]}`;
            counter++;
        }
        if(str.split("-").length > 1)
            arrIDs.push(str);
        
        while(i<n1){
            arr[k] = L[i];
            i++; k++;
        }

        while(j<n2){
            arr[k] = R[j];
            j++; k++;
        }
    }

    function sortFunction(l,r){
        if(l < r){
            var m = l + (r - l)/2;
            m = parseInt(m);
            sortFunction(l,m);
            sortFunction(m+1,r);
            merge(l,m,r);
        }
    }

    function functionCaller(){
        if(!listSorted){
            var element;
            // console.log(arr);
            for(var i=0;i<arr.length;i++){
                element = document.getElementById(`${arr[i]}`);
                animationBars[`${arr[i]}`] = element;
                element.style.transition = "background-color 0.3s, bottom 0.7s linear, left 0.7s linear";
                element.style.transitionDelay = "0.7s, bottom 0s left 0s";
                element.style.backgroundColor = dict[`${arr[i]}`].color;
            }
            // console.log(`added to ${arr[i-1]} startAnimation`);
            element.addEventListener("transitionend", startAnimation);
        }
        else{
            if(!animationFinished)
                alert("The animation is not finished!");
            else
                alert("The list is sorted");
        }
    }
    var leftOver = [],leftOverIndex=0;
    function startAnimation(){
        // console.log(`removed from ${arr[arr.length-1]} startAnimation`);
        document.getElementById(`${arr[arr.length-1]}`).removeEventListener("transitionend", startAnimation);
        sortFunction(0,arr.length-1);
        listSorted = true;
        // console.log(arrIDs);
        var rect,rect2,temp,i;
        rect = animationBars[`${max}`].getBoundingClientRect();
        bottom = rect.bottom - rect.top + 20;
        temp = arrIDs[0].split("-");
        rect = animationBars[`${temp[0]}`].getBoundingClientRect();
        rect2 = animationBars[`${temp[1]}`].getBoundingClientRect();
        globalPushDistance = Math.abs(rect.left - rect2.left);
        for(i=0;i<arr.length;i++){
            rect = animationBars[`${arr[i]}`].getBoundingClientRect();
            dict[`${arr[i]}`].original = rect.left;
        }
        animationHandler();
    }

    function moveUpHandler(){
        var check = arrIDs[animationIndex-1].split("-");
        // console.log(`added to ${check[1]} moveDown`);
        dict[`${check[1]}`].color = color;
        dict[`${check[1]}`].transition = true;
        animationBars[`${check[1]}`].style.backgroundColor = color;
        animationBars[`${check[1]}`].style.color = "#F1F1F1";
        animationBars[`${check[1]}`].addEventListener("transitionend",moveDown);
    }
    function moveDown(){
        var check = arrIDs[animationIndex-1].split("-");
        dict[`${check[1]}`].transition = false;
        // console.log(`removed from ${check[1]} moveDown`);
        animationBars[`${check[1]}`].removeEventListener("transitionend",moveDown);
        dict[`${check[1]}`].transition = true;
        if(checkDistance(check[1])){ 
            dict[`${check[1]}`].left += globalPushDistance;
            while(checkDistance(check[1]))
                dict[`${check[1]}`].left += globalPushDistance;
        }
        // console.log(`added to ${check[1]} moveUp`);
        dict[`${check[1]}`].bottom = -bottom;
        animationBars[`${check[1]}`].style.left = `${dict[`${check[1]}`].left}px`;
        animationBars[`${check[1]}`].style.bottom = `-${bottom}px`;
        animationBars[`${check[1]}`].addEventListener("transitionend",moveUp);
    }

    function moveUp(){
        var x = animationIndex-1;
        while(x>=arrIDs.length-1)
            x--;
        var prevCheck = arrIDs[x].split("-");
        if(dict[`${prevCheck[1]}`].transition){
            dict[`${prevCheck[1]}`].transition = false;
            // console.log(`removed from ${prevCheck[1]} moveUp`);
            animationBars[`${prevCheck[1]}`].removeEventListener("transitionend",moveUp);
        }
        var check = arrIDs[x+1].split("-"),i;
        leftOver = [];
        leftOverIndex = 0;
        for(var j=1;j<check.length;j++){
            if(dict[`${check[j]}`].bottom === 0){
                leftOver.push(check[j]);
            }
        }
        // console.log(check)
        // console.log(leftOver)
        if(leftOver.length === 0){
            for(i=1;i<check.length;i++){
                dict[`${check[i]}`].bottom = 0;
                animationBars[`${check[i]}`].style.bottom = `0px`;
            }
            // console.log(`added to ${check[i-1]} animationHandler`);
            dict[`${check[i-1]}`].transition = true;
            animationBars[`${check[i-1]}`].addEventListener("transitionend", animationHandler);
        }
        else{
            var temporary;
            if(leftOver.length > 1)
            for(var index=1;index<leftOver.length;index++){
                for(var y=0;y<index;y++){
                    if(leftOver[index] < leftOver[y]){
                        temporary = leftOver[index];
                        leftOver[index] = leftOver[y];
                        leftOver[y] = temporary;
                    }
                }
            }
            finishLeftOver();
        }
    }
    function finishLeftOver(){
        // console.log("finishLeftOver is CALLED")
        var flag = true;
        if(leftOverIndex < leftOver.length){
            if(leftOverIndex>0 && dict[`${leftOver[leftOverIndex-1]}`].transition){
                dict[`${leftOver[leftOverIndex-1]}`].transition = false;
                // console.log(`removed from ${leftOver[leftOverIndex-1]} finishLeftOver`);
                animationBars[`${leftOver[leftOverIndex-1]}`].removeEventListener("transitionend",finishLeftOver);
            }
            if(dict[`${leftOver[leftOverIndex]}`].color !== color){
                dict[`${leftOver[leftOverIndex]}`].color = color;
                // console.log(`added to ${leftOver[leftOverIndex]} moveDownLeftOver`);
                animationBars[`${leftOver[leftOverIndex]}`].style.backgroundColor = color;
                animationBars[`${leftOver[leftOverIndex]}`].style.color = "#F1F1F1";
                animationBars[`${leftOver[leftOverIndex]}`].addEventListener("transitionend",moveDownLeftOver);
            }
            else{
                flag = false;
                leftOverIndex++;
                moveDownLeftOver();
            }
        }
        else{
            if(dict[`${leftOver[leftOverIndex-1]}`] && dict[`${leftOver[leftOverIndex-1]}`].transition){
                dict[`${leftOver[leftOverIndex-1]}`].transition = false;
                // console.log(`removed from ${leftOver[leftOverIndex-1]} finishLeftOver`);
                animationBars[`${leftOver[leftOverIndex-1]}`].removeEventListener("transitionend",finishLeftOver);
            }
            moveEverythingUp();
        }
        if(flag)
            leftOverIndex++;
    }
    function moveDownLeftOver(){
        // console.log("moveDownLeftOver is CALLED")
        // console.log(`removed from ${leftOver[leftOverIndex-1]} moveDownLeftOver`);
        animationBars[`${leftOver[leftOverIndex-1]}`].removeEventListener("transitionend",moveDownLeftOver);
        if(checkDistance(leftOver[leftOverIndex-1])){ 
            dict[`${leftOver[leftOverIndex-1]}`].left += globalPushDistance;
            while(checkDistance(leftOver[leftOverIndex-1]))
                dict[`${leftOver[leftOverIndex-1]}`].left += globalPushDistance;
        }
        dict[`${leftOver[leftOverIndex-1]}`].transition = true;
        dict[`${leftOver[leftOverIndex-1]}`].bottom = -bottom;
        animationBars[`${leftOver[leftOverIndex-1]}`].style.left = `${dict[`${leftOver[leftOverIndex-1]}`].left}px`;
        animationBars[`${leftOver[leftOverIndex-1]}`].style.bottom = `-${bottom}px`;
        // console.log(`added to ${leftOver[leftOverIndex-1]} finishLeftOver`);
        animationBars[`${leftOver[leftOverIndex-1]}`].addEventListener("transitionend",finishLeftOver);
    }
    function moveEverythingUp(){
        // console.log("moveEverythingUp is CALLED")
        // console.log(`removed from ${leftOver[leftOverIndex-1]} moveEverythingUp`);
        animationBars[`${leftOver[leftOver.length-1]}`].removeEventListener("transitionend",moveEverythingUp);
        var check = arrIDs[animationIndex].split("-");
        for(var i=1;i<check.length;i++){
            dict[`${check[i]}`].bottom = 0;
            animationBars[`${check[i]}`].style.bottom = "0px";
        }
        dict[`${check[i-1]}`].transition = true;
        animationBars[`${check[i-1]}`].addEventListener("transitionend",animationHandler);
    }
    function comparingFunction(){
        var check = arrIDs[animationIndex].split("-");
        dict[`${check[1]}`].parent = check[0];
        if(dict[`${dict[`${check[0]}`].parent}`].color !== "#FEFFB5")
            color = dict[`${dict[`${check[0]}`].parent}`].color;
        if(dict[`${check[0]}`].color !== "#FEFFB5"){
            dict[`${check[0]}`].transition = true;
            dict[`${check[0]}`].color = "#FEFFB5";
            // console.log(`added to ${check[0]} changeBackColor`);
            animationBars[`${check[0]}`].style.backgroundColor = "#FEFFB5";
            animationBars[`${check[0]}`].style.color = "#767680";
            animationBars[`${check[0]}`].addEventListener("transitionend",changeBackColor);
            if(dict[`${check[1]}`].color !== "#FEFFB5"){
                dict[`${check[1]}`].transition = true;
                dict[`${check[1]}`].color = "#FEFFB5";
                animationBars[`${check[1]}`].style.backgroundColor = "#FEFFB5";
                animationBars[`${check[1]}`].style.color = "#767680";
            }
        }
        else{
            dict[`${check[1]}`].color = "#FEFFB5";
            dict[`${check[1]}`].transition = true;
            // console.log(`added to ${check[1]} changeBackColor`);
            animationBars[`${check[1]}`].style.backgroundColor = "#FEFFB5";
            animationBars[`${check[1]}`].style.color = "#767680";
            animationBars[`${check[1]}`].addEventListener("transitionend",changeBackColor);
            if(dict[`${check[0]}`].color !== "#FEFFB5"){
                dict[`${check[0]}`].transition = true;
                dict[`${check[0]}`].color = "#FEFFB5";
                animationBars[`${check[0]}`].style.backgroundColor = "#FEFFB5";
                animationBars[`${check[0]}`].style.color = "#767680";
            }
        }
    }
        
    function changeBackColor(){
        var check = arrIDs[animationIndex].split("-");
        if(dict[`${check[1]}`].transition){
            dict[`${check[1]}`].transition = false;
            // console.log(`removed from ${check[1]} changeBackColor`);
            animationBars[`${check[1]}`].removeEventListener("transitionend",changeBackColor);
        }
        if(dict[`${check[0]}`].transition){
            dict[`${check[0]}`].transition = false;
            // console.log(`removed from ${check[0]} changeBackColor`);
            animationBars[`${check[0]}`].removeEventListener("transitionend",changeBackColor);
        }
        dict[`${check[0]}`].transition = true;
        dict[`${check[0]}`].color = color;
        // console.log(`added to ${check[0]} readyToMove`);
        animationBars[`${check[0]}`].style.backgroundColor = `${color}`;
        animationBars[`${check[0]}`].style.color = "#F1F1F1";
        animationBars[`${check[0]}`].addEventListener("transitionend",readyToMove);
    }

    function readyToMove(){
        var check = arrIDs[animationIndex].split("-");
        if(dict[`${check[1]}`].transition){
            dict[`${check[1]}`].transition = false;
            // console.log(`removed from ${check[1]} readyToMove`);
            animationBars[`${check[1]}`].removeEventListener("transitionend",readyToMove);
        }
        if(dict[`${check[0]}`].transition){
            dict[`${check[0]}`].transition = false;
            // console.log(`removed from ${check[0]} readyToMove`);
            animationBars[`${check[0]}`].removeEventListener("transitionend",readyToMove);
        }
        var rect1,rect2,distance=0;
        rect1 = animationBars[`${check[0]}`].getBoundingClientRect();
        rect2 = animationBars[`${check[1]}`].getBoundingClientRect();
        if(rect1.left > rect2.left){
            // dict[`${check[1]}`].left += globalPushDistance;
            distance = rect1.left - rect2.left;
            dict[`${check[0]}`].left -= distance;
            while(checkDistance(check[0]))
                dict[`${check[0]}`].left += globalPushDistance;
        }
        else if(checkDistance(check[0])){
            dict[`${check[0]}`].left += globalPushDistance;
            while(checkDistance(check[0])){
                dict[`${check[0]}`].left += globalPushDistance;
            }
        }
        dict[`${check[0]}`].transition = true;
        dict[`${check[0]}`].bottom = -bottom;
        // console.log(`added to ${check[0]} animationHandler`);
        animationBars[`${check[0]}`].style.left = `${dict[`${check[0]}`].left}px`;
        animationBars[`${check[0]}`].style.bottom = `-${bottom}px`;
        animationBars[`${check[0]}`].addEventListener("transitionend",animationHandler);
        
    }
    function checkDistance(check){
        var rect1,rect2,rect1_bottom;
        check = parseInt(check);
        rect1_bottom = animationBars[`${check}`].getBoundingClientRect();
        rect1 = dict[`${check}`].original + dict[`${check}`].left;
        for(var i=0;i<arr.length;i++){
            if(arr[i] !== check){
                rect2 = animationBars[`${arr[i]}`].getBoundingClientRect();
                if(rect1 === rect2.left && rect1_bottom.bottom !== rect2.bottom){
                    return true;
                }
            }
        }
        return false;
    }
    function animationHandler(){
        animationIndex++;
        if(animationIndex < arrIDs.length){
            var check,x;
            if(animationIndex > 0){
                check = arrIDs[animationIndex-1].split("-");
                for(x=0;x<check.length;x++){
                    if(dict[`${check[x]}`] && dict[`${check[x]}`].transition){
                        dict[`${check[x]}`].transition = false;
                        // console.log(`removed from ${check[x]} animationHandler`);
                        animationBars[`${check[x]}`].removeEventListener("transitionend",animationHandler);
                    }
                }
            }
            check = arrIDs[animationIndex].split("-");
            for(x=0;x<check.length;x++){
                if(dict[`${check[x]}`] && dict[`${check[x]}`].transition){
                    dict[`${check[x]}`].transition = false;
                    // console.log(`removed from ${check[x]} animationHandler`);
                    animationBars[`${check[x]}`].removeEventListener("transitionend",animationHandler);
                }
            }
            if(check[0]==="up")
                moveUpHandler();
            else
                comparingFunction();
        }
    }


    return(
        <section className="algoSection">
            <h1>Merge Sort</h1>
            <ul className="sortCanvas">
                {arr.map((value) => {
                    var algobar = <AlgoBars number={value} maxValue={max} key={value}/>
                    return(algobar);
                })}
            </ul>
            <button onClick={functionCaller}>Sort</button>
        </section>
    )
}

export default MergeSort;