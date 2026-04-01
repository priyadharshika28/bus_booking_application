import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Shield, Clock, CreditCard } from 'lucide-react';

const Home = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (from && to && date) {
      navigate(`/buses?from=${from}&to=${to}&date=${date}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Your Journey Starts Here</h1>
        <p className="hero-subtitle">
          Book bus tickets to over 5,000 destinations with ease. Safe, fast, and comfortable travel at the best prices.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form container">
          <div className="form-group">
            <label><MapPin size={16} /> From</label>
            <input 
              type="text" 
              placeholder="Source City" 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><MapPin size={16} /> To</label>
            <input 
              type="text" 
              placeholder="Destination City" 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><Calendar size={16} /> Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button type="submit" className="btn-primary">
            <Search size={20} /> Search
          </button>
        </form>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Why Choose SwiftBus?</h2>
          <p>We provide the best ticketing experience with premium features.</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <Shield size={32} color="#4ade80" />
              <h3>Secure Booking</h3>
              <p>Your data and transactions are always protected with industry-standard encryption.</p>
            </div>
            
            <div className="feature-card">
              <Clock size={32} color="#60a5fa" />
              <h3>Real-time Updates</h3>
              <p>Get instant notifications about your bus status and any schedule changes.</p>
            </div>
            
            <div className="feature-card">
              <CreditCard size={32} color="#f472b6" />
              <h3>Instant Confirmation</h3>
              <p>Receive your e-ticket immediately after booking. No more queues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to explore?</h2>
          <p>Join thousands of travelers who trust SwiftBus for their daily commute and long-distance travel.</p>
          <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Start Booking Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
