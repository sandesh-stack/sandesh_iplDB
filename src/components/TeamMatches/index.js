// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const colors = [
  {
    id: 'RCB',
    teamBg: 'rcb-bg',
  },
  {
    id: 'KKR',
    teamBg: 'kkr-bg',
  },
  {
    id: 'CSK',
    teamBg: 'csk-bg',
  },
  {
    id: 'SH',
    teamBg: 'srh-bg',
  },
  {
    id: 'KXP',
    teamBg: 'kxp-bg',
  },
  {
    id: 'MI',
    teamBg: 'mi-bg',
  },
  {
    id: 'RR',
    teamBg: 'rr-bg',
  },
  {
    id: 'DC',
    teamBg: 'dc-bg',
  },
]

let bgColor

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: []}

  componentDidMount = async () => {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    const {latestMatchDetails, recentMatches, teamBannerUrl} = formattedData
    const updatedMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }
    const updatedRecentMatches = recentMatches.map(eachItem => ({
      id: eachItem.id,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      matchStatus: eachItem.match_status,
      result: eachItem.result,
    }))
    const updatedTeamMatchesData = {
      latestMatchDetails: updatedMatchDetails,
      recentMatches: updatedRecentMatches,
      teamBannerUrl,
    }
    this.setState({isLoading: false, teamMatchesData: updatedTeamMatchesData})
  }

  getBgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const backgroundColor = colors.filter(eachColor => eachColor.id === id)
    const color = backgroundColor[0].teamBg
    return color
  }

  renderTeamDetails = () => {
    const {teamMatchesData} = this.state
    const {latestMatchDetails, recentMatches, teamBannerUrl} = teamMatchesData
    return (
      <div className="team-fixtures">
        <img className="banner-img" src={teamBannerUrl} alt="team banner" />
        <p className="matches">Latest Matches</p>
        <LatestMatch matchDetails={latestMatchDetails} />
        <ul className="recent-matches">
          {recentMatches.map(eachMatch => (
            <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    bgColor = this.getBgColor()
    return (
      <div className={`team-matches-bg ${bgColor}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderTeamDetails()
        )}
      </div>
    )
  }
}

export default TeamMatches
