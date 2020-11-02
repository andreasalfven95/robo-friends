/* import { render } from "@testing-library/react"; */
import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css"
import ErrorBoundry from "../components/ErrorBoundry"
/* import Scroll from "../components/Scroll" */

function App() {
    /* constructor() {
        super()
        //state = things that can change and affect our app
        this.state = {
            robots: [],
            searchfield: "",
        } */

    //REACT HOOKS, below is the STATES
    //useState returns the state (robots) and the function that changes that state(setRobots)
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState("");

    /* componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {
                this.setState({ robots: users })
            });
    } */

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => { setRobots(users) });
    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (!robots.length) {
        return <h1 className="tc f1">Loading...</h1>
    } else {
        return (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                {/* <Scroll> */}
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
                {/* </Scroll> */}
            </div>
        );
    }
}

export default App;