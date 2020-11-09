import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App() {

  //HOOKS initialization
  // First parameter is state variable, then a function that updates the state
  const [robots, setRobots] = useState([]) //useState('initial state to be updated')
  const [searchfield, setSearchfield] = useState('');

  //State is sliced

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
  }, []); //after rendering this function is run
  // second parameter must be set to avoid repeated rerender
  // run when something is changed in the second parameter
  // empty array means only run once a la componentDidMount

  const onSearchChange = (event) => {
    setSearchfield(event.target.value) // state of searchfiled is set here
  }

  const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

  return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }

export default App;