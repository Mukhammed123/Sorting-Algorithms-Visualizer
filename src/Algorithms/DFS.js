
export const DFS = (nodes) => {
    console.log("Hello world from DFS");
    console.log(nodes)

    var stack = [], foundWay = false, copyOfNodes, gotCheese=false, bottomDistance = 0,height, rightDistance = 0, rect, rect2, toAnimate = [], prev = "", directions = [];
    var img, temp, element, att, width, index=-1;
    function runDFS(nodes){
        copyOfNodes = nodes;
        stack.push(nodes["0-0"]);

        while(stack.length > 0){
            foundWay = false;
            prev = stack[stack.length - 1].id;
            observeNodes();
            // Calculate direction to backtrack
            if(!foundWay && stack.length > 1){
                stack.pop();
                toAnimate.push(`${prev}_${stack[stack.length - 1].id}`);
                var coordinates = toAnimate[toAnimate.length-1].split("_");
                var c1 = Number(coordinates[0].split("-")[1]),  r1 = Number(coordinates[0].split("-")[0]);
                var c2 = Number(coordinates[1].split("-")[1]), r2 = Number(coordinates[1].split("-")[0]);
                // Goes left
                if(r1 === r2 && c1 > c2)
                    directions.push("goLeft");
                else if(r1 === r2 && c1 < c2)
                    directions.push("goRight");
                else if(r1 > r2 && c1 === c2)
                    directions.push("goUp");
                else if(r1 < r2 && c1 === c2)
                    directions.push("goDown");
                else if(r1 > r2 && c1 > c2)
                    directions.push("goUpLeft");
                else if(r1 < r2 && c1 < c2)
                    directions.push("goDownRight");
                else if(r1 < r2 && c1 > c2)
                    directions.push("goDownLeft");
                else if(r1 > r2 && c1 < c2)
                    directions.push("goUpRight");
            }
            else if(stack.length == 1){
                stack.pop();
            }

            else if(prev !== copyOfNodes[`${row}-${col}`].id)
                toAnimate.push(`${prev}_${copyOfNodes[`${row}-${col}`].id}`);

            if(gotCheese)
                break;
            }
            
            rect = document.getElementById(`0-0`).getBoundingClientRect();
            rect2 = document.getElementById(`0-1`).getBoundingClientRect();
            rightDistance = rect2.left - rect.left;
            rect = document.getElementById(`0-0`).getBoundingClientRect();
            rect2 = document.getElementById(`1-0`).getBoundingClientRect();
            bottomDistance = rect2.bottom - rect.bottom;
            height = rect.bottom - rect.top;
            bottomDistance += height;
            toAnimateFunction();
    }

    var row, col;
    function observeNodes(){
        var i = stack.length - 1;
        var index = stack[i].id;
        var currentNode = stack[i];
        var coordinates = index.split("-");
        row = parseInt(coordinates[0]);
        col = parseInt(coordinates[1]);

        // Goes up
        if (row > 1 && (copyOfNodes[`${row-1}-${col}`].type == "unvisited" || copyOfNodes[`${row-1}-${col}`].type == "target")){
            foundWay = true;
            row--;
            directions.push("goUp");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes Up right
        else if (row > 1 && col < 48 && (copyOfNodes[`${row-1}-${col+1}`].type == "unvisited" || copyOfNodes[`${row-1}-${col+1}`].type == "target")){
            foundWay = true;
            row--;
            col++;
            directions.push("goUpRight");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes right
        else if (col < 48 && (copyOfNodes[`${row}-${col+1}`].type == "unvisited" || copyOfNodes[`${row}-${col+1}`].type == "target")){
            foundWay = true;
            col++;
            directions.push("goRight");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes down right
        else if (row < 19 && col < 48 && (copyOfNodes[`${row+1}-${col+1}`].type == "unvisited" || copyOfNodes[`${row+1}-${col+1}`].type == "target")){
            foundWay = true;
            row++;
            col++;
            directions.push("goDownRight");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes down
        else if (row < 19 && (copyOfNodes[`${row+1}-${col}`].type == "unvisited" || copyOfNodes[`${row+1}-${col}`].type == "target")){
            foundWay = true;
            row++;
            directions.push("goDown");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes down left
        else if (col > 1 && row < 19 && (copyOfNodes[`${row+1}-${col-1}`].type == "unvisited" || copyOfNodes[`${row+1}-${col-1}`].type == "target")){
            foundWay = true;
            col--;
            row++;
            directions.push("goDownLeft");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes left
        else if (col > 1 && (copyOfNodes[`${row}-${col-1}`].type == "unvisited" || copyOfNodes[`${row}-${col-1}`].type == "target")){
            foundWay = true;
            col--;
            directions.push("goLeft");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }
        // Goes up left
        else if (col > 1 && row > 1 && (copyOfNodes[`${row-1}-${col-1}`].type == "unvisited" || copyOfNodes[`${row-1}-${col-1}`].type == "target")){
            foundWay = true;
            col--;
            row--;
            directions.push("goUpLeft");
            if (copyOfNodes[`${row}-${col}`].type == "target")
            gotCheese = true;
        }

        if(foundWay){
            copyOfNodes[`${row}-${col}`].type = "visited";
            stack.push(copyOfNodes[`${row}-${col}`]);
        }
    }
    runDFS(nodes);
    console.log(toAnimate);
    console.log(directions);
    // console.log(document.getElementById(`0-0`))

    console.log(rightDistance);
    console.log(bottomDistance);

    function move(dest, dir){
        var el = document.getElementById("i-" + dest[0]);
        el.style.position = "absolute";
        el.style.transition = "1s";
        
        if(dir==="goUp"){
            el.style.bottom = `${bottomDistance}px`;
        }
        else if(dir==="goUpRight"){
            el.style.bottom = `${bottomDistance}px`;
            el.style.left = `${rightDistance}px`;
        }
        else if(dir==="goRight"){
            el.style.left = `${rightDistance}px`;
        }
        else if(dir==="goDownRight"){
            el.style.left = `${rightDistance}px`;
            el.style.bottom = `-${bottomDistance}px`;
        }
        else if(dir==="goDown"){
            el.style.bottom = `-${bottomDistance}px`;
        }
        else if(dir==="goDownLeft"){
            el.style.left = `-${rightDistance}px`;
            el.style.bottom = `-${bottomDistance}px`;
        }
        else if(dir==="goLeft"){
            el.style.left = `-${rightDistance}px`;
        }
        else if(dir==="goUpLeft"){
            el.style.left = `-${rightDistance}px`;
            el.style.bottom = `${bottomDistance}px`;
        }

        el.addEventListener("transitionend", ()=>{
            var temp = document.getElementById(dest[1]);
            temp = temp.getElementsByTagName("img")[0];
            temp.style.opacity = "1";
            el.style.opacity = "0";
            temp.id = `el-${dest[1]}`;
            toAnimateFunction();
        });
        
    }

    
    function toAnimateFunction(){
        index++;
        var coord;
        console.log(index)
        if(index < toAnimate.length){
            coord = toAnimate[index].split("_");
            img = document.getElementById("i-" + coord[0]);
            temp = document.getElementById(coord[1]);
            element = document.createElement("img");
            att = document.createAttribute("src");
            
            width = img.width;
            att.value = "/images/rat.svg";
            element.setAttributeNode(att);
            element.className = "secondMouse";
            element.style.width = `${width}px`;
            temp.appendChild(element);
            
            move(coord,`${directions[index]}`);
        }
    }

    // index++;
    // while(i < toAnimate.length){

    //     var appendTo = toAnimate[i].split("_")[1];
    //     appendTo = document.getElementById(appendTo);
    //     var image = document.createElement("img");
    //     var att = document.createAttribute("src");
    //     att.value = "imgs/rat.png";
    //     image.setAttributeNode(att);
    //     image.className = "secondMouse";
    //     appendTo.appendChild(image);
    //     imgs.push(image);

    //     imgs[i].style.animationDuration = `${1}s`;
    //     imgs[i].style.animationFillMode = "forwards";

    //     imgs[i].onanimationend = () => {
    //     // replacing rats process
    //     imgs[index].className = "firstMouse";
    //     imgs[index].style.animationName = `${directions[index]}`;
    //     imgs[index-1].style.opacity = "0";

    //     // Setting shit's attributes
    //     var shit = document.createElement("img");
    //     var att = document.createAttribute("src");
    //     att.value = "imgs/shit.jpg";
    //     shit.setAttributeNode(att);
    //     shit.className = "shit";

    //     // push the position of the rat in to the stack
    //     if(index < stackEvents.length){
    //         sevt = stackEvents[index].split(" ")[0];
    //         var li = document.createElement("li");
    //         li.style.transform = "rotate(180deg)";
    //         li.style.backgroundColor = "#DE1A0A";
    //         li.style.color = "white";
    //         li.style.padding = "2px";

    //         var styles = window.getComputedStyle(stackElement);
    //         var height = Number(styles.height.split("px")[0]); // height of the stack
    //         var data = stackElement.getElementsByTagName("li"); // all stack items
    //         // li.style.listStyle = "none";
    //         if(sevt === "push"){

    //         li.style.fontSize = "13px";
    //         var text = document.createTextNode(`${toAnimate[index].split("_")[1]}`);
    //         li.appendChild(text);
    //         stackElement.appendChild(li);
    //         // hide li overflow
    //         if(height > 520){
    //             data[hide].style.display = "none";
    //             hide++;
    //         }
    //         }
    //         // show hidden li
    //         else if(sevt === "pop"){
    //         var elmts = stackElement.getElementsByTagName("li");
    //         elmts = elmts[elmts.length - 1];
    //         stackElement.removeChild(elmts);

    //         if(height < 520 && hide > 0){
    //             hide--;
    //             data[hide].style.display = "list-item";
    //         }
    //         }
    //     }

    //     // check if index is less tha toAnimate length, append shit image
    //     if(index < toAnimate.length){
    //         from = toAnimate[index].split("_")[0]; to = toAnimate[index].split("_")[1];
    //         dataDiv = document.getElementById(`${from}`);
    //         dataDiv.appendChild(shit);
    //     }
    //     // index for animation end
    //     index++;
    //     }
    //     i++;
    // }
    // }
}