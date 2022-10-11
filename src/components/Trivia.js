import React, { useEffect, useState } from 'react'
import useSound from "use-sound"

import play from '../sounds/play.mp3'
import correct from '../sounds/correct.mp3'
import wrong from '../sounds/wrong.mp3'

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("current")

    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    // play sound at start of question
    useEffect(() => {
        letsPlay();
    }, [letsPlay])

    useEffect(() => {
        setCurrentQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration)
    }

    const handleClick = (ans) => {
        setSelectedAnswer(ans);
        setClassName("answer active");

        // waiting for 3 seconds then check answer and start animation
        delay(3000, () => setClassName(ans.correct ? "answer correct" : "answer wrong"))

        // answer checking 3 sec delay and animation 3 sec delay then move to next question or stop
        delay(5000, () => {
            if (ans.correct) {
                correctAnswer();
                delay(3000, () => {
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer(null)
                })
            }
            else {
                wrongAnswer();
                delay(1000, () => {
                    setStop(true)
                })
            }
        })
    }

    return (
        <div className='trivia'>
            <div className='question'>{currentQuestion?.question}</div>
            <div className='answers'>
                {
                    currentQuestion?.answers.map((ans) => {
                        return <div
                            className={selectedAnswer === ans ? className : "answer"}
                            onClick={() => handleClick(ans)}
                        >{ans.text}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Trivia