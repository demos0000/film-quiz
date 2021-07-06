import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './Quiz.css'


function Quiz() {
	const resetToFirstQuestion = 0
	const [questions, setQuestions] = useState([]);
	const [questionActive, SetQuestionActive] = useState(0); // 0 at start
	const [score, SetScore] = useState(0); // 0 at start
	const [endOfQuiz, setEndOfQuiz ] = useState(false); // 
	const [final, setFinal] = useState( { } );
	const history = useHistory();

	useEffect( () => {
		fetchQuizQuestions()
	},[])

	async function fetchQuizQuestions(){

		setEndOfQuiz(false);  			// Place here for performance reasons
		SetScore(resetToFirstQuestion)  // Place here for performance reasons
		SetQuestionActive(resetToFirstQuestion)

		// Film
		let apiFilm = "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"

		const res = await fetch(apiFilm);
		const data = await res.json();
		let apiObjData = data.results;

		let newApiData = apiObjData.map((obj, index) => {

			obj.incorrect_answers.push(obj.correct_answer)
			shuffle(obj.incorrect_answers)

			return {
				question: htmlspecialchars(obj.question),
				correct_answer: htmlspecialchars(obj.correct_answer),
				choices : [ 
					htmlspecialchars(obj.incorrect_answers[0]),
					htmlspecialchars(obj.incorrect_answers[1]),
					htmlspecialchars(obj.incorrect_answers[2]),
					htmlspecialchars(obj.incorrect_answers[3]) ]
			} // return object for apiObjData 

		}) // end: apiObjData map
		setQuestions( newApiData ) 
	}  // end: fetchQuizQuestions()

	function shuffle(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	function htmlspecialchars(str) {
		if (typeof(str) == "string") {
			str = str.replace(/&#039;/g, "'");
			str = str.replace(/&quot;/g, "\"");
			str = str.replace(/&amp;/g, "&"); 
			str = str.replace(/&lt;/g, "<");
			str = str.replace(/&gt;/g, ">");
		 }
		return str;
	}

	function checkResponse(selected, correctAnswer) {
		if ( selected.toLowerCase() === correctAnswer.toLowerCase() ) {
			SetScore( score + 1);
			nextQuestion();
		} else {
			nextQuestion();
		}
	}

	const nextQuestion = () => {
		if( questionActive + 1 ===  questions.length ){
			resetQuiz();

		} else {
			SetQuestionActive( questionActive + 1 )
		}
	}

	// Resets variables and data so as to not have
	// useState colliions and quiz replay-linging data
	const resetQuiz = () => {
		// Reset hooks
		setEndOfQuiz( true )
		SetQuestionActive(-1);
		setFinal({ score: score, count :questions.length  })

		setQuestions([]); // api questions reset
	}

	const exitQuiz = () => {
		resetQuiz();
		history.push('/');
	}


	return (
		<div className="App-header">
			{
				endOfQuiz ? (
				<div className="summary">

					<h4>Your final score is {final.score} out of {final.count}</h4>
					{ final.score === final.count ? <h2>You got a perfect score!!</h2>:'' }

					<h4>Want to play again?</h4>
					<button className="button blue" onClick={ fetchQuizQuestions }>Yes</button>
					<button className="button-exit" onClick={ exitQuiz }>Exit</button>

				</div>

				) : ( 
					// start of ternary AA
					questions.length !== 0 ?  (  
					<div className="App-header-quiz">
						<h4>{ `Question ${questionActive + 1} of ${questions.length}` }</h4>
						<h4>{ questions[questionActive].question}</h4>
						<ul> { questions[questionActive].choices.map( (select, index) => (
							<button 
								style={{  }} 
								className="button-quiz blue"
								key={index} 
								onClick={ 
									() => checkResponse(select, questions[questionActive].correct_answer) } >
									{ select }
							</button>
							))
							}
						</ul>
						<div class="section-exit">
							<div class="section-center">
								<button className="button-exit" onClick={ exitQuiz }>Exit</button>
							</div>
						</div>

					</div>
					) : ''  
					// End of ternary AA

				)
			}

		</div>

	)
}

export default Quiz;
