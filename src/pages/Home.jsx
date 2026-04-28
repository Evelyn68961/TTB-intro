import { Link } from 'react-router-dom';
import {
  WhatIsTTBIcon,
  MethodologyIcon,
  ApplicationsIcon,
  DemoIcon,
} from '../components/HomeCardIcons';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>How Long Until Treatment Helps?</h1>
        <p className="hero-subtitle">
          Clinical trials tell us <em>If</em> a treatment works.
          <br />
          Time-to-Benefit analysis tells us <em>When</em>.
        </p>
        <Link to="/what-is-ttb" className="cta-button">
          Learn About TTB →
        </Link>
      </section>
    
    <div className="home-content">

      <section className="intro">
        <h2>The Missing Piece in Clinical Decision-Making</h2>
        <p>
          When a doctor prescribes a preventive medication, patients rarely ask
          "Does it work?" — they trust the evidence. But they should be asking
          a different question:
        </p>
        <blockquote>
          "How long do I need to take this before it actually helps me?"
        </blockquote>
        <p>
          For an 85-year-old patient with limited life expectancy, a medication
          that takes 3 years to show benefit may never help them. Time-to-Benefit
          research gives clinicians and patients the information they need to
          make these decisions together.
        </p>
      </section>

      <section className="features">
        <h2>Explore</h2>
        <div className="feature-grid">
          <Link to="/what-is-ttb" className="feature-card">
            <div className="card-icon-wrap"><WhatIsTTBIcon /></div>
            <div className="card-text">
              <h3>What is TTB?</h3>
              <p>Understand the concept and why it matters for patient care.</p>
            </div>
          </Link>

          <Link to="/methodology" className="feature-card">
            <div className="card-icon-wrap"><MethodologyIcon /></div>
            <div className="card-text">
              <h3>Methodology</h3>
              <p>Learn how TTB is calculated from clinical trial data.</p>
            </div>
          </Link>

          <Link to="/applications" className="feature-card">
            <div className="card-icon-wrap"><ApplicationsIcon /></div>
            <div className="card-text">
              <h3>Clinical Applications</h3>
              <p>See TTB estimates for statins, bisphosphonates, GLP-1 RAs, and more.</p>
            </div>
          </Link>

          <Link to="/demo" className="feature-card">
            <div className="card-icon-wrap"><DemoIcon /></div>
            <div className="card-text">
              <h3>Interactive Demo</h3>
              <p>Adjust parameters and see how TTB changes in real-time.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
    </div>
  );
}