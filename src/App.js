import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import React, {useState} from 'react'

import InsertionSort from 'src/Algorithms/InsertionSort'
import BubbleSort from 'src/Algorithms/BubbleSort'
import SelectionSort from 'src/Algorithms/SelectionSort'
import QuickSort from 'src/Algorithms/QuickSort'
import MergeSort from 'src/Algorithms/MergeSort'
import HeapSort from 'src/Algorithms/HeapSort'
import EnterList from './Components/EnterList'
import { arr } from 'src/listToBeSorted'

function App() {
  var [listNumber, setListNumber] = useState(arr);
  const updateListNumber = (event) => {
    setListNumber(event.target.value);
    console.log(event.target.value)
  }
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <nav className="d-block px-5">
          <ul className="d-flex justify-content-between my-3 ps-0">
            <li className="list-unstyled d-block h-100">
              <Link
                to="/insertionsort"
                className="text-decoration-none text-light"
              >
                insertionsort
              </Link>
            </li>
            <li className="list-unstyled d-block h-100">
              <Link
                to="/bubblesort"
                className="text-decoration-none text-light"
              >
                bubblesort
              </Link>
            </li>
            <li className="list-unstyled d-block h-100">
              <Link
                to="/selectionsort"
                className="text-decoration-none text-light"
              >
                selectionsort
              </Link>
            </li>
            <li className="list-unstyled d-block h-100">
              <Link
                to="/mergesort"
                className="text-decoration-none text-light"
              >
                mergesort
              </Link>
            </li>
            <li className="list-unstyled d-block h-100">
              <Link
                to="/heapsort"
                className="text-decoration-none text-light"
              >
                heapsort
              </Link>
            </li>
            <li className="list-unstyled d-block h-100">
              <Link
                to="/quicksort"
                className="text-decoration-none text-light"
              >
                quicksort
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="content">
        <div className="input-group px-5">
        <input
         type="text"
         className="form-control"
         placeholder="Enter List of Numbers"
         aria-label="Enter List of Numbers"
         aria-describedby="button-addon2"
         onChange={updateListNumber}
         value={listNumber}
         />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
        </div>
        <Switch>
            <Route path="/insertionsort" component={InsertionSort}/>
            <Route path="/bubblesort" component={BubbleSort}/>
            <Route path="/selectionsort" component={SelectionSort}/>
            <Route path="/mergesort" component={MergeSort}/>
            <Route path="/heapsort" component={HeapSort}/>
            <Route path="/quicksort" component={QuickSort}/>
          </Switch>
      </div>
      <EnterList/>
      {/* Algorithms */}
      </Router>
    </div>
  );
}

export default App;
