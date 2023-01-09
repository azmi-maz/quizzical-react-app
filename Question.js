import React from "react"

export default function Question(props) {
    const [one, two, three, four] = props.choices
    // console.log(props.correct_answer)
    
    function newNameOne(chooseAnswer) {
        if (!props.isStatus){
            if (chooseAnswer === "picked") {
                return "choices-choosen"
            } else {
                return "choices"
            }
    } else {
            if (chooseAnswer === "picked" && props.correct_answer === one) {
                return "choices-chosencorrectly"
            } else if (chooseAnswer === "picked" && props.correct_answer != one){
                return "choices-chosewrong"
            } else if (chooseAnswer != "picked" && props.correct_answer === one){
                return "choices-chosencorrectly"
            } else {
                return "choices-ghost"
            }
    }
    }
    
        function newNameTwo(chooseAnswer) {
        if (!props.isStatus){
            if (chooseAnswer === "picked") {
                return "choices-choosen"
            } else {
                return "choices"
            }
    } else {
            if (chooseAnswer === "picked" && props.correct_answer === two) {
                return "choices-chosencorrectly"
            } else if (chooseAnswer === "picked" && props.correct_answer != two){
                return "choices-chosewrong"
            } else if (chooseAnswer != "picked" && props.correct_answer === two){
                return "choices-chosencorrectly"
            } else {
                return "choices-ghost"
            }
    }
    }
    
        function newNameThree(chooseAnswer) {
        if (!props.isStatus){
            if (chooseAnswer === "picked") {
                return "choices-choosen"
            } else {
                return "choices"
            }
    } else {
            if (chooseAnswer === "picked" && props.correct_answer === three) {
                return "choices-chosencorrectly"
            } else if (chooseAnswer === "picked" && props.correct_answer != three){
                return "choices-chosewrong"
            } else if (chooseAnswer != "picked" && props.correct_answer === three){
                return "choices-chosencorrectly"
            } else {
                return "choices-ghost"
            }
    }
    }
    
        function newNameFour(chooseAnswer) {
        if (!props.isStatus){
            if (chooseAnswer === "picked") {
                return "choices-choosen"
            } else {
                return "choices"
            }
    } else {
            if (chooseAnswer === "picked" && props.correct_answer === four) {
                return "choices-chosencorrectly"
            } else if (chooseAnswer === "picked" && props.correct_answer != four){
                return "choices-chosewrong"
            } else if (chooseAnswer != "picked" && props.correct_answer === four){
                return "choices-chosencorrectly"
            } else {
                return "choices-ghost"
            }
    }
    }
    
    
    function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
    }
    
    return (
        <div className="main-questionbox">
            <div className="questions">
                {`Q.  ${props.question}`}
            </div>
            <div className="choices-box">
            
                <button className={`${newNameOne(props.choosenAnswer.one)}`}
                onClick={props.changeHandlerOne}>
                {props.choices[0]}
                </button>
                
                <button className={`${newNameTwo(props.choosenAnswer.two)}`}
                onClick={props.changeHandlerTwo}>
                {props.choices[1]}
                </button>
                
                <button className={`${newNameThree(props.choosenAnswer.three)}`}
                onClick={props.changeHandlerThree}>
                {props.choices[2]}
                </button>
                
                <button className={`${newNameFour(props.choosenAnswer.four)}`}
                onClick={props.changeHandlerFour}>
                {props.choices[3]}
                </button>
                
            </div>
        </div>
    )
}