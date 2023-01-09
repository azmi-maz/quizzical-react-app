import React from "react"

export default function FrontPage(props) {
    return (
       <div> 
            <img src="./images/blobs-topright.png" className="big-bottom"/>
            <img src="./images/blobs-1-bottomleft.png" className="top"/>
                <div className="front-page">
                    <p className="front-title">Quizzical</p>
                    <p className="front-desc">General Knowledge Multiple Choice Trivia Questions. <br/><br/>Are you ready?</p>
                    <button className="start-button" onClick={props.startGame}>Start quiz</button>
                </div>
        </div>
    )
}