import React from "react"
import {nanoid} from "nanoid"
import FrontPage from "./FrontPage"
import Question from "./Question"
import Confetti from "react-confetti"

export default function App() {
    
    React.useEffect(function () {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => setData(data.results))
    }, [])
    
    function gameRestart() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => setData(data.results))
    }
    
    function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
    }
    
    const [quizData, setQuizData] = React.useState([])
    
    const [show, setShow] = React.useState(false)
    
    const [status, setStatus] = React.useState(false)
    
    const [isClicked, setIsClicked] = React.useState(false)
    
    
    function playGame() {
        setShow(prevState => !prevState)
    }
    
    function setData(arr) {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            let correctArr = [decodeHtml(arr[i].correct_answer)]
            let correctArrString = decodeHtml(arr[i].correct_answer)
            
            let incorrectArr = []
                for (let j = 0; j < arr[i].incorrect_answers.length; j++) {
                    incorrectArr.push(decodeHtml(arr[i].incorrect_answers[j]))
                }
                
            let combinedArr = correctArr.concat(incorrectArr)
            let shuffledArr = combinedArr.sort(() => Math.random() - 0.5)
            newArr.push({
                ...arr[i],
                correct_answer_forScoring: correctArrString,
                id: nanoid(),
                choices: shuffledArr,
                choosenAnswer: {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four"
                }
            })
        }
        setQuizData(newArr)
    }
    
    // console.log(quizData)
    
    function changeHandler(id, num) {
        setQuizData(prevState => prevState.map(item => {
            if (item.id === id) {
                if (item.choosenAnswer.one === num) {
                return {...item, 
                choosenAnswer: {one: "picked", two: "two", three: "three", four: "four"}}
                } else if (item.choosenAnswer.two === num) {
                return {...item, 
                choosenAnswer: {one: "one", two: "picked", three: "three", four: "four"}}
                } else if (item.choosenAnswer.three === num) {
                return {...item, 
                choosenAnswer: {one: "one", two: "two", three: "picked", four: "four"}}
                } else if (item.choosenAnswer.four === num) {
                return {...item, 
                choosenAnswer: {one: "one", two: "two", three: "three", four: "picked"}}
                } else { return item }
            } else {
                return item
            }
        }))
    }
    
    function checkAnswer() {
        let score = 0     
        for (let i = 0; i < quizData.length; i++) {
            let chooseThis = quizData[i].choosenAnswer
            
                if (chooseThis.one === "picked" && quizData[i].choices[0] === quizData[i].correct_answer_forScoring) {
                    score += 1
                } else if (chooseThis.two === "picked" && quizData[i].choices[1] === quizData[i].correct_answer_forScoring){
                    score += 1
                } else if (chooseThis.three === "picked" && quizData[i].choices[2] === quizData[i].correct_answer_forScoring){
                    score += 1
                } else if (chooseThis.four === "picked" && quizData[i].choices[3] === quizData[i].correct_answer_forScoring){
                    score += 1
                } else {
                    score += 0
                }
        }
        return score
    }
    
    function checkCounter() {
        let counter = 0     
        for (let i = 0; i < quizData.length; i++) {
            let chooseThis = quizData[i].choosenAnswer
            
                if (chooseThis.one === "picked") {
                    counter += 1
                } else if (chooseThis.two === "picked"){
                    counter += 1
                } else if (chooseThis.three === "picked"){
                    counter += 1
                } else if (chooseThis.four === "picked"){
                    counter += 1
                } else {
                    counter += 0
                }
        }
        return counter
    }
    
    function endGame() {
        setStatus(true)
        setIsClicked(true)
    }
    
    function resetGame() {
        setStatus(false)
        setIsClicked(false)
        setShow(true)
        gameRestart()
    }

    const questionData = quizData.map(item => {
        
        return (
            <Question
                key={item.id}
                id={item.id}
                question={decodeHtml(item.question)}
                correct_answer={decodeHtml(item.correct_answer)}
                choices={item.choices}
                choosenAnswer={item.choosenAnswer}
                changeHandlerOne={() => changeHandler(item.id, item.choosenAnswer.one)}
                changeHandlerTwo={() => changeHandler(item.id, item.choosenAnswer.two)}
                changeHandlerThree={() => changeHandler(item.id, item.choosenAnswer.three)}
                changeHandlerFour={() => changeHandler(item.id, item.choosenAnswer.four)}
                isStatus={status}
            />
        )
    })
    
    function test() {
        console.log(quizData)
    }
    
    return (
        <main>
            <img src="./images/blobs-small-bottomleft.png" className="small-bottom"/>
            <img src="./images/blobs-1-bottomleft.png" className="top"/>
            <div>
            {!show && <FrontPage startGame={playGame}/>}
            {(status && checkAnswer() === 5) ? <Confetti /> : <div></div>}
            {show && <div>
                {questionData}
            </div>}
            {status && 
                <div className="finish-line">
                   <p className="score-line">
                     {`You scored ${checkAnswer()}/5 correct answers`}
                    </p>
                    <button className="play-again-button" onClick={resetGame}>Play again</button>
                </div>}
            {show && !isClicked && (checkCounter() === 5) && <button className="check-button" onClick={endGame}>Check answers</button>}
            </div>
        </main>
    )
}