import React from "react";
import "./algo.css";
import AlgoBars from "./AlgoBars";

function QuickSort() {
  var arr = [],
    arrIDs = [],
    animationBars = {},
    animationIndex = 0,
    dict = {};
  var elements = Math.floor(Math.random() * 10) + 3,
    random,
    max = 0,
    bottom,
    prevPivot,
    listSorted=false,
    animationFinished=false;
  // var elements = [5, 21, 65, 39, 17, 57, 25], random, max=0, bottom, prevPivot, pivot=elements[elements.length-1];

  for (var i = 0; i < elements; i++) {
    random = Math.floor(Math.random() * 100) + 1;
    // var random = elements[i];
    if (random > max) max = random;
    if (!dict[`${random}`]) {
      arr.push(random);
      dict[`${random}`] = {
        left: 0,
        color: "#4183d7",
        transition: false,
        animation: false,
      };
    }
  }
  var pivot = arr[arr.length - 1];
  var n = arr.length;
  function partition(arr, low, high) {
    var i = low - 1; // index of smaller element
    prevPivot = pivot;
    pivot = arr[high]; // pivot
    if (pivot === prevPivot) arrIDs.push(`pivot-${pivot}`);
    else {
      arrIDs.push(`prevPivot-${prevPivot}`);
      arrIDs.push(`pivot-${pivot}`);
    }
    var temp;

    for (var j = low; j < high; j++) {
      // # If current element is smaller than the pivot
      arrIDs.push(`compare-${arr[j]}-${pivot}`);
      if (arr[j] < pivot) {
        arrIDs.push(`smaller-${arr[j]}`);
        // # increment index of smaller element
        i = i + 1;
        if (arr[i] === arr[j]) arrIDs.push(`changeBack-${arr[i]}`);
        else {
          arrIDs.push(`calculate-${arr[i]}-${arr[j]}`);
          arrIDs.push(`move-${arr[i]}`);
          arrIDs.push(`move-${arr[j]}`);
          arrIDs.push(`up-${arr[i]}-${arr[j]}`);
          arrIDs.push(`changeBack-${arr[j]}`);
        }
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      } else {
        arrIDs.push(`changeBack-${arr[j]}`);
      }
    }
    if (arr[i + 1] === arr[high]) arrIDs.push(`changeBack-${arr[i + 1]}`);
    else {
      arrIDs.push(`calculate-${arr[i + 1]}-${arr[high]}`);
      arrIDs.push(`move-${arr[i + 1]}`);
      arrIDs.push(`move-${arr[high]}`);
      arrIDs.push(`up-${arr[i + 1]}-${arr[high]}`);
    }
    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  }

  // # The main function that implements QuickSort
  // # arr[] --> Array to be sorted,
  // # low  --> Starting index,
  // # high  --> Ending index

  // # Function to do Quick sort
  function quickSort(arr, low, high) {
    if (low < high) {
      // # pi is partitioning index, arr[p] is now
      // # at right place
      var pi = partition(arr, low, high);

      // # Separately sort elements before
      // # partition and after partition
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  function startSorting() {
    if(!listSorted){
      //console.log(arr);
      quickSort(arr, 0, n - 1);
      listSorted = true;
      //console.log(arr);
      //console.log(arrIDs);
      for (var i = 0; i < arr.length; i++) {
        animationBars[`${arr[i]}`] = document.getElementById(`${arr[i]}`);
        animationBars[`${arr[i]}`].style.transition = "left 0.7s, bottom 0.7s";
        animationBars[`${arr[i]}`].style.transitionDelay = "0.1s";
      }
      var rect = animationBars[`${max}`].getBoundingClientRect();
      bottom = rect.bottom - rect.top + 20;
      // console.log(bottom);
      var check = arrIDs[0].split("-");
      var num1 = check[1];
      dict[`${num1}`].animation = true;
      animationBars[`${num1}`].style.animation = "blueToGreen 0.4s forwards";
      dict[`${num1}`].color = "rgb(37, 223, 37)";
      animationBars[`${num1}`].addEventListener("animationend", animationHandler);
    }
    else{
      if(!animationFinished)
        alert("The animation is not finished");
      else
        alert("The list is sorted");
    }
  }
  function compareFunction() {
    var check = arrIDs[animationIndex].split("-");
    if (dict[`${check[1]}`].color === "#4183d7") {
      dict[`${check[1]}`].animation = true;
      animationBars[`${check[1]}`].style.color = "#767680";
      dict[`${check[1]}`].color = "#FEFFB5";
      animationBars[`${check[1]}`].style.animation =
        "blueToWhite 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else if (dict[`${check[1]}`].color === "rgb(241, 44, 44)") {
      animationBars[`${check[1]}`].style.color = "#767680";
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "#FEFFB5";
      animationBars[`${check[1]}`].style.animation = "redToWhite 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else animationHandler();
  }
  function changeBackColor() {
    var check = arrIDs[animationIndex].split("-");
    if (dict[`${check[1]}`].color === "#FEFFB5") {
      animationBars[`${check[1]}`].style.color = "#F1F1F1";
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "#4183d7";
      animationBars[`${check[1]}`].style.animation =
        "whiteToBlue 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else if (dict[`${check[1]}`].color === "rgb(241, 44, 44)") {
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "#4183d7";
      animationBars[`${check[1]}`].style.animation = "redToBlue 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else if (dict[`${check[1]}`].color === "rgb(37, 223, 37)") {
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "#4183d7";
      animationBars[`${check[1]}`].style.animation =
        "greenToBlue 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else animationHandler();
  }
  function smallerFucntion() {
    var check = arrIDs[animationIndex].split("-");
    if (dict[`${check[1]}`].color === "#FEFFB5") {
      animationBars[`${check[1]}`].style.color = "#F1F1F1";
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "rgb(241, 44, 44)";
      animationBars[`${check[1]}`].style.animation = "whiteToRed 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else if (dict[`${check[1]}`].color === "#4183d7") {
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "rgb(241, 44, 44)";
      animationBars[`${check[1]}`].style.animation = "blueToRed 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else animationHandler();
  }
  function pivotFunction() {
    var check = arrIDs[animationIndex].split("-");
    if (dict[`${check[1]}`].color === "#4183d7") {
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "rgb(37, 223, 37)";
      animationBars[`${check[1]}`].style.animation =
        "blueToGreen 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else if (dict[`${check[1]}`].color === "#FEFFB5") {
      animationBars[`${check[1]}`].style.color = "#F1F1F1";
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "rgb(37, 223, 37)";
      animationBars[`${check[1]}`].style.animation =
        "whiteToGreen 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else if (dict[`${check[1]}`].color === "rgb(241, 44, 44)") {
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "rgb(37, 223, 37)";
      animationBars[`${check[1]}`].style.animation = "redToGreen 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else animationHandler();
  }
  function prevPivotFunction() {
    var check = arrIDs[animationIndex].split("-");
    if (dict[`${check[1]}`].color === "rgb(37, 223, 37)") {
      dict[`${check[1]}`].animation = true;
      dict[`${check[1]}`].color = "#4183d7";
      animationBars[`${check[1]}`].style.animation =
        "greenToBlue 0.6s forwards";
      animationBars[`${check[1]}`].addEventListener(
        "animationend",
        animationHandler
      );
    } else animationHandler();
  }
  function moveUp() {
    var check = arrIDs[animationIndex].split("-");
    for (var i = 1; i < 3; i++)
      animationBars[`${check[i]}`].style.bottom = `0px`;
    dict[`${check[1]}`].transition = true;
    animationBars[`${check[1]}`].addEventListener(
      "transitionend",
      animationHandler
    );
  }
  function calculateDistance() {
    var check = arrIDs[animationIndex].split("-");
    var rect1 = animationBars[`${check[1]}`].getBoundingClientRect();
    var rect2 = animationBars[`${check[2]}`].getBoundingClientRect();
    var distance = rect2.left - rect1.left;
    dict[`${check[1]}`].left += distance;
    dict[`${check[2]}`].left -= distance;
    animationHandler();
  }
  function moveHandler() {
    var check = arrIDs[animationIndex].split("-");
    animationBars[`${check[1]}`].style.left = `${dict[`${check[1]}`].left}px`;
    animationBars[`${check[1]}`].style.bottom = `-${bottom}px`;
    dict[`${check[1]}`].transition = true;
    animationBars[`${check[1]}`].addEventListener(
      "transitionend",
      animationHandler
    );
  }
  function animationHandler() {
    var check = arrIDs[animationIndex].split("-"),
      i;
    for (i = 1; i < 3; i++) {
      if (dict[`${check[i]}`]) {
        if (dict[`${check[i]}`].animation) {
          animationBars[`${check[i]}`].removeEventListener(
            "animationend",
            animationHandler
          );
          dict[`${check[i]}`].animation = false;
        }
        if (dict[`${check[i]}`].transition) {
          animationBars[`${check[i]}`].removeEventListener(
            "transitionend",
            animationHandler
          );
          dict[`${check[i]}`].transition = false;
        }
      }
    }
    animationIndex++;
    if (animationIndex < arrIDs.length) {
      check = arrIDs[animationIndex].split("-");
      switch (check[0]) {
        case "compare":
          compareFunction();
          break;
        case "changeBack":
          changeBackColor();
          break;
        case "smaller":
          smallerFucntion();
          break;
        case "calculate":
          calculateDistance();
          break;
        case "move":
          moveHandler();
          break;
        case "pivot":
          pivotFunction();
          break;
        case "up":
          moveUp();
          break;
        default:
          prevPivotFunction();
          break;
      }
    } else {
      for (i = 0; i < arr.length; i++) {
        if (dict[`${arr[i]}`].color === "rgb(37, 223, 37)") {
          //console.log("Worked");
          dict[`${arr[i]}`].color = "#4183d7";
          animationBars[`${arr[i]}`].style.animation =
            "greenToBlue 0.6s forwards";
        }
      }
      animationFinished = true;
    }
  }
  return (
    <section className="algoSection">
    <h1 className="text-center">Quick Sort</h1>
      <ul className="sortCanvas">
        {arr.map((value) => {
          var algobar = <AlgoBars number={value} maxValue={max} key={value} />;
          return algobar;
        })}
      </ul>
      <button onClick={startSorting} className="btn btn-primary position-absolute top-0 left-0 ms-5">Sort</button>
    </section>
  );
}

export default QuickSort;
