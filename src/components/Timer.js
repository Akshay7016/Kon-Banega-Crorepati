import { useEffect, useState } from 'react'

const Timer = ({ setStop, questionNumber }) => {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer === 0) {
            setStop(true);
        }

        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        // Clean-up function
        return () => clearInterval(interval)
    }, [timer, setStop]);

    // For new question assign 30 seconds timing
    useEffect(() => {
        setTimer(30);
    }, [questionNumber])

    return timer;
}

export default Timer