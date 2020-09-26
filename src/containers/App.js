/* import { render } from "@testing-library/react"; */
import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css"
import ErrorBoundry from "../components/ErrorBoundry"
/* import Scroll from "../components/Scroll" */

class App extends React.Component {
    constructor() {
        super()
        //state = things that can change and affect our app
        this.state = {
            robots: [],
            searchfield: "",
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {
                this.setState({ robots: users })
            });
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length) {
            return <h1 className="tc f1">Loading...</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    {/* <Scroll> */}
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                    {/* </Scroll> */}
                </div>
            );
        }
    }
}

export default App;