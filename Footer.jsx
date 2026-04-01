import { Link } from 'react-router-dom';
import { Bus, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-card" style={{ margin: '4rem 1rem 1rem', padding: '3rem 2rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            <Bus size={32} color="var(--primary)" />
            <span>SwiftBus</span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Experience the future of bus travel. Fast, reliable, and comfortable bookings at your fingertips.</p>
        </div>

        <div>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/">Search Buses</Link></li>
            <li><Link to="/history">My Bookings</Link></li>
            <li><Link to="/login">Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Connect</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="btn-ghost" style={{ padding: '0.6rem', borderRadius: '50%' }}><Github size={20} /></a>
            <a href="#" className="btn-ghost" style={{ padding: '0.6rem', borderRadius: '50%' }}><Twitter size={20} /></a>
            <a href="#" className="btn-ghost" style={{ padding: '0.6rem', borderRadius: '50%' }}><Mail size={20} /></a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} SwiftBus Ticketing System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
