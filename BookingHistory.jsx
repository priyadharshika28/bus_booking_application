import { useState, useEffect } from 'react';
import api from '../services/api';
import { Ticket, Bus } from 'lucide-react';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/user');
                setBookings(response.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p>Loading your bookings...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h2>My Bookings</h2>
                <p style={{ color: 'var(--text-muted)' }}>View and manage your upcoming and past trips.</p>
            </header>

            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
                    <Ticket size={64} color="#94a3b8" />
                    <h3>No bookings yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You haven't booked any trips yet. Start exploring now!</p>
                    <button className="btn-primary" onClick={() => window.location.href = '/'}>
                        Search Buses
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {bookings.map((booking) => (
                        <div key={booking.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)', overflow: 'hidden' }}>
                            <div style={{ background: '#f8fafc', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', color: '#333' }}>
                                <div>
                                    <Ticket size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} color="var(--primary)" />
                                    <strong>Booking ID: {booking.bookingId}</strong>
                                </div>
                                <div style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                    {booking.status}
                                </div>
                            </div>

                            <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}><Bus size={14} style={{ verticalAlign: 'middle' }} /> Bus Details</p>
                                    <h4 style={{ margin: '0 0 0.3rem 0' }}>{booking.bus.busName}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{booking.bus.busType}</p>
                                </div>

                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Route</p>
                                    <p style={{ fontWeight: 'bold', margin: '0 0 0.3rem 0' }}>{booking.bus.source} → {booking.bus.destination}</p>
                                    <p style={{ fontSize: '0.85rem' }}>{booking.bus.departureTime}</p>
                                </div>

                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Booking Date</p>
                                    <p style={{ fontWeight: 'bold' }}>{new Date(booking.bookingDate).toLocaleDateString()}</p>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '150px' }}>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Total Paid</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e', margin: '0 0 0.3rem 0' }}>${booking.totalAmount}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {booking.bookedSeats.length} Seats: {booking.bookedSeats.map(s => s.seatNumber).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
