import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import InsertionSort from 'src/Algorithms/InsertionSort'
import BubbleSort from 'src/Algorithms/BubbleSort'
import SelectionSort from 'src/Algorithms/SelectionSort'
import QuickSort from 'src/Algorithms/QuickSort'
import MergeSort from 'src/Algorithms/MergeSort'
import HeapSort from 'src/Algorithms/HeapSort'

function App() {
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
        <Switch>
            <Route path="/insertionsort" component={InsertionSort}/>
            <Route path="/bubblesort" component={BubbleSort}/>
            <Route path="/selectionsort" component={SelectionSort}/>
            <Route path="/mergesort" component={MergeSort}/>
            <Route path="/heapsort" component={HeapSort}/>
            <Route path="/quicksort" component={QuickSort}/>
          </Switch>
      </div>
      {/* Algorithms */}
      </Router>
    </div>
  );
}

export default App;
