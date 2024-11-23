import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="hero">
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Travel. Relax. Memories.</h1>
        <p className="home-para">
          With travel trip you can experience new travel and the best tourist
          destinations.
        </p>
        <div className="home-button">
          <Link to="/book-a-new-trip">
            <button type="button" className="home-button1">
              Book a new trip
            </button>
          </Link>
        </div>
      </div>
      <div className="home-image">
        <img
          src="https://ik.imagekit.io/6nnzgbkjv4/home_image.png?updatedAt=1731652208295"
          alt="home"
          className="home-img-logo"
        />
      </div>
    </div>
  </div>
)

export default Home
