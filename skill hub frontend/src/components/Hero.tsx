import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">🚀 Start Your Journey</span>
        <h1>Learn Modern Technology</h1>
        <p>
          Build real world applications using React, Java and MERN Stack.
          Master in-demand skills with hands-on projects.
        </p>
        <Link to="/courses">
          <button className="hero-btn">Start Learning →</button>
        </Link>
      </div>
      <div className="hero-glow" />
    </section>
  );
}

export default Hero;
