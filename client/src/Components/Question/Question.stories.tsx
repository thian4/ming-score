import React from 'react'
import { ComponentStory } from '@storybook/react'
import QuestionBlock, { type QuestionProps } from './Question'

export default {
  component: QuestionBlock,
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
}

const Template: ComponentStory<typeof QuestionBlock> = (args) => (
  <QuestionBlock {...args} />
)

export const Default = Template.bind({})

Default.args = {
  question: '17 rounded off to the nearest 10 is..',
  options: {
    a: 10,
    b: 20,
    c: 17,
  },
  correctAnswer: 'b',
  onAnswerSelected: (isCorrect: boolean) => {
    console.log(isCorrect ? 'Correct!' : 'Incorrect!')
  },
  reset: false,
} as QuestionProps
