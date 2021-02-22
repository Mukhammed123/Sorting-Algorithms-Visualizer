import React from 'react'
import {DFS} from './DFS';
import {BFS} from './BFS';
import './algo.css'

function MazeTable(){
    const location = window.location.href.split("/");

    var node = {};
    const columns = [];
    for(var i=0;i<50;i++){
        columns.push(i);
    }
    
    var rows = []
    for(var r=0; r<25; r++){
        rows.push(r);
    }
    const createdRows = rows.map((row) => {
        return(
            <tr key={`r-${row}`}>{
                columns.map((col) => {
                    node[`${row}-${col}`] = {};
                    node[`${row}-${col}`].id = `${row}-${col}`;
                    var random = Math.random();
                    var el;
                    if(random > 0.65 && (row!==0 || col!==0) && (row!==(rows.length-1) || col!==(columns.length-1))){
                        node[`${row}-${col}`].type = "wall";
                        el = <td key={`${row}-${col}`} id={`${row}-${col}`} style={{position: "relative", textAlign: "center"}}>
                            <img src="/images/brick-wall.svg" style={{width:"100%", height: "auto"}}/>
                        </td>
                    }
                    else if(row===0 && col===0){
                        node[`${row}-${col}`].type = "visited";
                        el = <td key={`${row}-${col}`} id={`${row}-${col}`} style={{position: "relative", textAlign: "center"}}>
                            <img src="/images/rat.svg" id={`i-${row}-${col}`} style={{width: "100%"}}/>
                        </td>
                    }
                    else if(row===(rows.length-1) && col===(columns.length-1)){
                        node[`${row}-${col}`].type = "target";
                        el = <td key={`${row}-${col}`} id={`${row}-${col}`} style={{position: "relative", textAlign: "center"}}>
                            <img src="/images/cheese.svg" style={{width:"100%", height: "auto", zIndex: "1", position: "relative"}}/>
                        </td>
                    }
                    else{
                        el = <td key={`${row}-${col}`} id={`${row}-${col}`} style={{position: "relative", textAlign: "center"}}></td>
                        node[`${row}-${col}`].type = "unvisited";
                    }
                    return(
                        el
                        )
                })
            }
        </tr>
    );
});

function functionCaller(){
    location[location.length-1]==="DFS" ? DFS(node) : BFS(node);
}
    return(
        <section style={{width: "100%", height: "100%"}}>
            <h3 >Stack or Queue</h3>
            <button type="button" onClick={functionCaller}>Run DFS</button>
            <div className="tableDiv">
                <table id="table">
                    {createdRows}
                </table>
            </div>
        </section>
    )
}

export default MazeTable;
// wall by
// Rat by 
// poo by 