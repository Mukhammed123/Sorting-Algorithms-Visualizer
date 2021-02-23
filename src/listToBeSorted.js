var elements = Math.floor(Math.random()*10) + 3, random, max=0, dict={};

const listOfNumbers = {
    data : [],
    changeList: (list) => {
        console.log("Exported");
        console.log(list);
        var i;
        if(list.length === 0){
            for(i=0; i<elements; i++){
                random = Math.floor(Math.random()*100) + 1;
                if(random > max) max = random;
                if(!dict[`${random}`]){
                    listOfNumbers.data.push(random);
                    dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
                }
            }
        }
        else {
            dict = {}; max = 0; listOfNumbers.data = [];
            for(i=0; i<list.length; i++) {
                random = list[i];
                if(random > max) max = random;
                if(!dict[`${random}`]){
                    listOfNumbers.data.push(random);
                    dict[`${random}`] = {left: 0, bottom:0, color: "blue", transition: false, animation: false, sorted: false, comparing: false};
                }
            }
        }
    }
}

listOfNumbers.changeList([]);

export { max, dict, listOfNumbers}

