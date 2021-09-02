// Write your code here

import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {iplTeam} = props
  const {id, name, teamImageUrl} = iplTeam

  return (
    <Link className="team-link" to={`/team-matches/${id}`}>
      <li className="team-card">
        <img className="team-image" src={teamImageUrl} alt={name} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
