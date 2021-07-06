import React from 'react'
import './Layout.css'

export default function layout() {
	return (
		<div class="parent">
			<header class="pink section">Header</header>
			<div class="left-side blue section" contenteditable>Left Sidebar</div>
			<main class="section coral" contenteditable> Main Content</main>
			<div class="right-side yellow section" contenteditable>Right Sidebar</div>
			<footer class="green section">Footer</footer>
		</div>
	)
}
