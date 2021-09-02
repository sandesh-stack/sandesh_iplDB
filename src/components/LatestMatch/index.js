// Write your code here

import './index.css'

const LatestMatch = props => {
  const {matchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    secondInnings,
    venue,
    result,
    manOfTheMatch,
    umpires,
  } = matchDetails

  return (
    <div className="latest-match-details">
      <div className="left-container">
        <div>
          <p className="competing-team">{competingTeam}</p>
          <p className="date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="venue">{result}</p>
        </div>
        <img
          className="competing-team-img"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <hr className="hr-line" />
      <div className="right-container">
        <p className="sub-heading">First Innings</p>
        <p className="value">{firstInnings}</p>
        <p className="sub-heading">Second Innings</p>
        <p className="value">{secondInnings}</p>
        <p className="sub-heading">Man of The Match</p>
        <p className="value">{manOfTheMatch}</p>
        <p className="sub-heading">Umpires</p>
        <p className="value">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
