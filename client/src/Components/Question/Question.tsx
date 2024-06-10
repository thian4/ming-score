import { useState, useEffect, FC, ChangeEvent } from 'react'
import styled, { keyframes, css } from 'styled-components'

export interface QuestionProps {
  question: string
  options: {
    a: number
    b: number
    c: number
  }
  correctAnswer: string
  onAnswerSelected: (isCorrect: boolean) => void
  reset?: boolean
}

const Question: FC<QuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswerSelected,
  reset = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  )

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value
    setSelectedOption(selected)

    if (selected !== undefined) {
      const isCorrect = selected === correctAnswer
      onAnswerSelected(isCorrect)
    }
  }

  useEffect(() => {
    if (reset) {
      setSelectedOption(undefined)
    }
  }, [reset])

  return (
    <Wrap>
      <QuestionText>{question}</QuestionText>
      <Options>
        {Object.entries(options).map(([key, value]) => (
          <OptionLabel
            key={key}
            isSelected={selectedOption === key}
            isCorrect={selectedOption !== undefined && key === correctAnswer}
            isIncorrect={
              selectedOption !== undefined &&
              selectedOption === key &&
              key !== correctAnswer
            }
          >
            <HiddenRadioButton
              type="radio"
              value={key}
              checked={selectedOption === key}
              onChange={handleOptionChange}
              disabled={selectedOption !== undefined}
            />
            {key}. {value}
          </OptionLabel>
        ))}
      </Options>
    </Wrap>
  )
}

export default Question

const Wrap = styled.div`
  display: grid;
  place-items: flex-start;
  margin-bottom: 8%;
`

const QuestionText = styled.h4`
  margin-bottom: 10px;
`

const Options = styled.div`
  margin-left: 15px;
`

const blink = keyframes`
  50% {
    opacity: 0;
  }
`

const OptionLabel = styled.label<{
  isSelected?: boolean
  isCorrect?: boolean
  isIncorrect?: boolean
}>`
  display: block;
  margin-bottom: 5px;
  color: ${({ isCorrect, isIncorrect }) =>
    isCorrect ? 'green' : isIncorrect ? 'red' : 'black'};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  ${({ isCorrect }) =>
    isCorrect &&
    css`
      animation: ${blink} 0.3s linear;
      animation-iteration-count: 2;
    `}
`

const HiddenRadioButton = styled.input`
  display: none;
`
