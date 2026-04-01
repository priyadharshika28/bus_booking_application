import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bus, User, LogOut, History, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
        <Bus size={32} color="var(--primary)" />
        <span>SwiftBus</span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" className="nav-link">Home</Link>
        {user ? (
          <>
            <Link to="/history" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <History size={18} />
              Bookings
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '20px', background: 'var(--glass)' }}>
                <User size={18} />
                <span>{user.fullName}</span>
              </div>
              <button onClick={handleLogout} className="btn-ghost" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
                <LogOut size={20} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login">
              <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LogIn size={18} />
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={18} />
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .nav-link {
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: var(--primary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
