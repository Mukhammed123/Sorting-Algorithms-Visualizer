var elements = Math.floor(Math.random()*10) + 3, random, max=0, dict={}, arr=[];

const changeList = (list) => {
    console.log("Exported");
    var i;
    if(list.length === 0){
        for(i=0; i<elements; i++){
            random = Math.floor(Math.random()*100) + 1;
            if(random > max) max = random;
            if(!dict[`${random}`]){
                arr.push(random);
                dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
            }
        }
    }
    else {
        dict = {}; max = 0; arr = [];
        for(i=0; i<list.length; i++) {
            random = list[i];
            if(random > max) max = random;
            if(!dict[`${random}`]){
                arr.push(random);
                dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
            }
        }
    }
}

changeList([]);


export { changeList, max, dict, arr }

