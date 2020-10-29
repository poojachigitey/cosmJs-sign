import React, {Component} from 'react';
import './App.css';
import CosmJs from "./container/CosmJs";
import CosmosJs from "./container/CosmosJs";

class App extends Component {
    render() {
        return (
            <div className="App">
                <CosmJs/>
                <CosmosJs />
            </div>
        );
    }
}

export default App;
