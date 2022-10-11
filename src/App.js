import { useEffect, useState } from 'react'

import Trivia from './components/Trivia';
import Timer from './components/Timer';
import Start from './components/Start';

import { data } from './data'
import { moneyPyramid } from './moneyPyramid'

import './App.css'

const App = () => {
  const [username, setUsername] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0")

  useEffect(() => {
    if (questionNumber === 16) {
      setEarned("$ 1000000");
      setStop(true);
    }
    questionNumber > 1 && setEarned(moneyPyramid.find((item) => item.id === questionNumber - 1).amount)
  }, [questionNumber])

  return (
    <div className='app'>
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className='main'>
            {stop ? <h1 className='endText'>You earned: {earned}</h1> : (
              <>
                <div className='top'>
                  <div className='timer'>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>

                <div className='bottom'>
                  <Trivia
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )
            }

          </div>

          {/* Pyramid container */}
          <div className='pyramid'>
            <ul className='moneyList'>
              {
                moneyPyramid.map((item) => (
                  <li key={item.id} className={questionNumber === item.id ? "moneyListItem active" : "moneyListItem"}>
                    <span className='moneyListItemNumber'>{item.id}</span>
                    <span className='moneyListItemAmount'>{item.amount}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </>
      )}

    </div>
  )
}

export default App