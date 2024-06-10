import { useEffect, useState } from 'react'
import { getScores, IScore } from 'Api/score'
import styled from 'styled-components'
import { format } from 'date-fns'

export default function Scores() {
  const [scores, setScores] = useState<IScore[]>([])

  useEffect(() => {
    getScores().then((scores) => {
      setScores(scores)
    })
  }, [])

  return (
    <Container>
      <StyledTable>
        <StyledThead>
          <tr>
            <StyledTh>Name</StyledTh>
            <StyledTh>Score</StyledTh>
            <StyledTh>Date & Time</StyledTh>
          </tr>
        </StyledThead>
        <StyledTbody>
          {scores.map((score) => (
            <tr key={score.id}>
              <StyledTd>{score.name}</StyledTd>
              <StyledTd>{score.score}</StyledTd>
              <StyledTd>
                {score.updatedAt &&
                  format(new Date(score.updatedAt), 'dd/mm/yyyy H:mm a')}
              </StyledTd>
            </tr>
          ))}
        </StyledTbody>
      </StyledTable>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1em;
  font-family: 'Arial, sans-serif';
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

const StyledThead = styled.thead`
  background-color: #009879;
  color: #ffffff;
  text-align: left;
`

const StyledTh = styled.th`
  padding: 12px 15px;
`

const StyledTbody = styled.tbody`
  tr {
    border-bottom: 1px solid #dddddd;
  }

  tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
`

const StyledTd = styled.td`
  padding: 12px 15px;
`
