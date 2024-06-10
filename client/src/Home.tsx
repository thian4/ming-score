import { useState, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Question } from 'Components'
import { saveScore } from 'Api/score'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const [username, setUsername] = useState('')
  const [showQuestions, setShowQuestions] = useState(false)
  const [isUsernameReadOnly, setIsUsernameReadOnly] = useState(false)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [shakeInstructionText, setShakeInstructionText] = useState(false)

  const [resetFlag, setResetFlag] = useState(false)
  const [scorePercentage, setScorePercentage] = useState(0)

  const navigate = useNavigate()

  const questions = [
    {
      question: '17 rounded off to the nearest 10 is..',
      options: {
        a: 10,
        b: 20,
        c: 17,
      },
      correctAnswer: 'b',
    },
    {
      question: '45 rounded off to the nearest 10 is..',
      options: {
        a: 50,
        b: 45,
        c: 40,
      },
      correctAnswer: 'a',
    },
    {
      question: '75 rounded off to the nearest 10 is..',
      options: {
        a: 70,
        b: 80,
        c: 175,
      },
      correctAnswer: 'b',
    },
    {
      question: '19 rounded to the nearest 10 is..',
      options: {
        a: 20,
        b: 10,
        c: 19,
      },
      correctAnswer: 'a',
    },
    {
      question: '64 rounded off to the nearest 10 is..',
      options: {
        a: 64,
        b: 70,
        c: 60,
      },
      correctAnswer: 'b',
    },
    {
      question: '0 rounded off to the nearest 10 is..',
      options: {
        a: 10,
        b: 1,
        c: 0,
      },
      correctAnswer: 'c',
    },
    {
      question: '98 rounded off to the nearest 10 is..',
      options: {
        a: 80,
        b: 100,
        c: 89,
      },
      correctAnswer: 'b',
    },
    {
      question: '199 rounded off to the nearest 10 is..',
      options: {
        a: 190,
        b: 100,
        c: 200,
      },
      correctAnswer: 'c',
    },
    {
      question: '94 rounded off to the nearest 10 is..',
      options: {
        a: 100,
        b: 94,
        c: 90,
      },
      correctAnswer: 'a',
    },
    {
      question: '165 rounded off to the nearest 10 is..',
      options: {
        a: 160,
        b: 170,
        c: 150,
      },
      correctAnswer: 'b',
    },
    {
      question: '445 rounded off to the nearest 10 is..',
      options: {
        a: 450,
        b: 440,
        c: 500,
      },
      correctAnswer: 'a',
    },
    {
      question: '999 rounded off to the nearest 10 is..',
      options: {
        a: 990,
        b: 1000,
        c: 909,
      },
      correctAnswer: 'b',
    },
  ]

  useEffect(() => {
    if (username) {
      const timer = setTimeout(() => {
        setIsUsernameReadOnly(true)
        setShowQuestions(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [username])

  const handleAnswerSelected = (isCorrect: boolean) => {
    setAnsweredCount((prev) => prev + 1)

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  const handleScoreInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (answeredCount < questions.length) {
      setShakeInstructionText(true)
      setTimeout(() => setShakeInstructionText(false), 500)
    }
  }

  useEffect(() => {
    if (answeredCount > 0) {
      setScorePercentage((correctAnswers / answeredCount) * 100)
    }
  }, [answeredCount, correctAnswers])

  useEffect(() => {
    if (answeredCount === questions.length) {
      const payload = {
        id: uuidv4(),
        name: username,
        score: +scorePercentage.toFixed(2),
      }

      saveScore(payload).then((): void => {
        console.log('Score saved successfully!')
      })
    }
  }, [
    answeredCount,
    questions.length,
    correctAnswers,
    scorePercentage,
    username,
  ])

  const handleReset = () => {
    setShowQuestions(false)
    setIsUsernameReadOnly(false)
    setCorrectAnswers(0)
    setAnsweredCount(0)
    setUsername('')
    setResetFlag(!resetFlag)
    setScorePercentage(0)
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Rounding Off to Nearest 10</Title>
      </TitleContainer>
      <InfoContainer>
        <Label>Name:</Label>
        <input
          name="username"
          type="text"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          readOnly={isUsernameReadOnly}
        />
        <Label>Score:</Label>
        <input
          name="score"
          type="text"
          readOnly
          value={answeredCount !== 0 ? `${scorePercentage.toFixed(2)}%` : ``}
          onClick={handleScoreInputClick}
        />
      </InfoContainer>

      <QuestionWrapperOuter show={showQuestions}>
        {answeredCount !== questions.length ? (
          <Instruction shaking={shakeInstructionText}>
            Click on the correct answers below:
          </Instruction>
        ) : (
          <Flex>
            <button onClick={handleReset}>Reset all</button>
            <button
              onClick={() => {
                navigate('/scores')
              }}
            >
              View scores
            </button>
          </Flex>
        )}

        <QuestionWrapper>
          {questions.map((question) => (
            <Question
              key={question.question}
              {...question}
              onAnswerSelected={handleAnswerSelected}
              reset={resetFlag}
            />
          ))}
        </QuestionWrapper>
      </QuestionWrapperOuter>
    </Container>
  )
}

export default Home

const Container = styled.div`
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`

const TitleContainer = styled.div`
  background-color: #f1f1f1;
  border-radius: 20px;
  padding: 10px;
  margin: 0 40px 20px;
`

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  font-family: 'Courier New', Courier;
  font-weight: bold;
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: 'Courier New', Courier;
  font-weight: bold;

  input {
    border: none;
    border-bottom: 2px solid;
    width: 100%;
    outline: none;

    &:first-of-type {
      margin-right: 20px;
    }

    &:read-only {
      cursor: default;
    }
  }
`

const Label = styled.label`
  font-size: 18px;
  margin-right: 10px;
`

const shake = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`

const Instruction = styled.p<{ shaking: boolean }>`
  font-size: 16px;
  margin-bottom: 20px;
  ${({ shaking }) =>
    shaking &&
    css`
      animation: ${shake} 0.5s linear;
    `}
`

const QuestionWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 20%;
`

const QuestionWrapperOuter = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin: 30px 0;
`
