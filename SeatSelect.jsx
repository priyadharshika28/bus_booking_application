import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Bus, Armchair, ChevronLeft } from 'lucide-react';

const SeatSelect = () => {
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [busRes, seatsRes] = await Promise.all([
          api.get(`/buses/${busId}`),
          api.get(`/seats/${busId}`)
        ]);
        setBus(busRes.data.data);
        setSeats(seatsRes.data.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [busId]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;
    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        busId: parseInt(busId),
        seatIds: selectedSeats
      });
      setShowSuccess(true);
      setTimeout(() => navigate('/history'), 3000);
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    }
    setBookingLoading(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Loading seats...</p>
      </div>
    );
  }

  const totalPrice = selectedSeats.length * (seats[0]?.price || 0);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <button onClick={() => navigate(-1)} className="btn-primary" style={{ marginBottom: '2rem', backgroundColor: '#64748b' }}>
        <ChevronLeft size={20} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
        Back to Search
      </button>

      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        {/* Seat Map */}
        <div style={{ flex: '1', minWidth: '300px', padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
            <Bus size={20} style={{ verticalAlign: 'middle' }} /> <strong>FRONT OF BUS</strong>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
            {seats.map((seat, index) => {
              const isSelected = selectedSeats.includes(seat.id);
              const isBooked = seat.booked;
              
              let bgColor = '#f8fafc';
              let color = '#333';
              let borderColor = '#cbd5e1';
              let cursor = 'pointer';

              if (isBooked) {
                bgColor = '#e2e8f0';
                color = '#94a3b8';
                cursor = 'not-allowed';
              } else if (isSelected) {
                bgColor = 'var(--primary)';
                color = 'white';
                borderColor = 'var(--primary)';
              }

              return (
                <div 
                  key={seat.id} 
                  style={{ gridColumn: (index % 4 === 2) ? '3' : 'auto' }}
                >
                  <button
                    onClick={() => !isBooked && toggleSeat(seat.id)}
                    disabled={isBooked}
                    style={{
                      width: '100%',
                      padding: '1rem 0',
                      borderRadius: '8px',
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      color: color,
                      cursor: cursor,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Armchair size={24} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{seat.seatNumber}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem' }}>
            <div><span style={{ display: 'inline-block', width: '15px', height: '15px', background: '#f8fafc', border: '1px solid #cbd5e1', verticalAlign: 'middle', marginRight: '5px' }}></span> Available</div>
            <div><span style={{ display: 'inline-block', width: '15px', height: '15px', background: 'var(--primary)', verticalAlign: 'middle', marginRight: '5px' }}></span> Selected</div>
            <div><span style={{ display: 'inline-block', width: '15px', height: '15px', background: '#e2e8f0', verticalAlign: 'middle', marginRight: '5px' }}></span> Booked</div>
          </div>
        </div>

        {/* Booking Summary */}
        <div style={{ width: '350px', padding: '2rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
          <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Booking Summary</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p><strong>Bus:</strong> {bus?.busName}</p>
            <p><strong>Route:</strong> {bus?.source} → {bus?.destination}</p>
            <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? seats.filter(s => selectedSeats.includes(s.id)).map(s => s.seatNumber).join(', ') : 'None'}</p>
          </div>

          <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
            <span style={{ fontSize: '1.2rem' }}>Total fare:</span>
            <br />
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>${totalPrice}</span>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleBooking}
            disabled={selectedSeats.length === 0 || bookingLoading}
            style={{ width: '100%' }}
          >
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#ef4444', background: '#fef2f2', padding: '1rem', borderRadius: '8px' }}>
            Tickets are non-refundable after booking. Please double-check your selection before confirming.
          </p>
        </div>
      </div>

      {showSuccess && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', maxWidth: '400px' }}>
            <h2 style={{ color: '#22c55e', margin: '0 0 1rem 0' }}>Booking Confirmed!</h2>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
              Your tickets have been booked successfully. Redirecting to history...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelect;
