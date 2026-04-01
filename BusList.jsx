import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Bus, Filter, ArrowRight } from 'lucide-react';

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    
    // Parse query params
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');
    const to = queryParams.get('to');
    const date = queryParams.get('date');

    useEffect(() => {
        const fetchBuses = async () => {
            setLoading(true);
            try {
                const response = await api.get('/buses');
                let allBuses = response.data.data;
                
                // Filter buses if search criteria provided
                if (from && to) {
                    allBuses = allBuses.filter(bus => 
                        bus.source.toLowerCase().includes(from.toLowerCase()) && 
                        bus.destination.toLowerCase().includes(to.toLowerCase())
                    );
                }
                
                setBuses(allBuses);
            } catch (err) {
                setError('Failed to fetch buses. Please try again.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchBuses();
    }, [from, to]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p>Loading buses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h2>Available Buses</h2>
                    <p>{from && to ? `From ${from} to ${to} • ${date}` : 'All available routes'}</p>
                </div>
                <button className="btn-primary" style={{ backgroundColor: '#475569' }}>
                    <Filter size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
                    Filters
                </button>
            </header>

            {buses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', border: '1px solid #e5e4e7', borderRadius: '8px' }}>
                    <Bus size={64} color="#94a3b8" />
                    <h3>No buses found</h3>
                    <p>Sorry, we couldn't find any buses for this route and date.</p>
                    <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
                        Try another search
                    </button>
                </div>
            ) : (
                <div>
                    {buses.map((bus) => (
                        <div key={bus.id} className="bus-card">
                            <div className="bus-info">
                                <Bus size={32} color="var(--primary)" />
                                <div>
                                    <h3 style={{ margin: 0 }}>{bus.busName}</h3>
                                    <small>{bus.busType}</small>
                                </div>
                            </div>

                            <div className="bus-time-route">
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{bus.departureTime}</p>
                                    <p style={{ color: 'var(--text-muted)' }}>{bus.source}</p>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <ArrowRight size={20} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{bus.arrivalTime}</p>
                                    <p style={{ color: 'var(--text-muted)' }}>{bus.destination}</p>
                                </div>
                            </div>

                            <div className="price-section">
                                <p className="price">${bus.price}</p>
                                <button className="btn-primary" onClick={() => navigate(`/seat-select/${bus.id}`)}>
                                    Select Seats
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusList;
