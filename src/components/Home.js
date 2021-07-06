import React from 'react'
import { Link } from 'react-router-dom';
import './Styles.css'

export default function Home() {
	return (
		<div className="App-header">

			<h1 to="/quiz"> Film Trivia Quiz </h1>

			{/* <img src="./imgs/people.png" /> */}

			<Link className="buttonLink blue" to="/quiz"> Play </Link>

		</div>
	)
}
