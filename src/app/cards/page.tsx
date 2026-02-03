"use client";

import CreditCardVisual from '@/components/CreditCardVisual';
import { Plus, Snowflake, Sliders, Shield } from 'lucide-react';
import Modal from '@/components/Modal';
import { useState } from 'react';

const CARDS = [
    { id: 1, last4: '4421', holder: 'AKIRA KUROSAWA', expiry: '12/28', limit: 5000, isFrozen: false },
    { id: 2, last4: '8812', holder: 'AKIRA KUROSAWA', expiry: '08/29', limit: 10000, isFrozen: false },
    { id: 3, last4: '1102', holder: 'STUDIO VENTURES', expiry: '03/27', limit: 15000, isFrozen: true },
];

export default function CardsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(1);
    const [cardStates, setCardStates] = useState(CARDS);

    const selectedCard = cardStates.find(c => c.id === selectedCardId) || cardStates[0];

    const toggleFreeze = () => {
        setCardStates(prev => prev.map(card =>
            card.id === selectedCardId ? { ...card, isFrozen: !card.isFrozen } : card
        ));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700 }}>Cards</h1>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} />
                    New Virtual Card
                </button>
            </div>

            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '32px', marginBottom: '32px' }}>
                {cardStates.map(card => (
                    <div
                        key={card.id}
                        onClick={() => setSelectedCardId(card.id)}
                        style={{
                            cursor: 'pointer',
                            transform: selectedCardId === card.id ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.2s ease',
                            opacity: selectedCardId === card.id ? 1 : 0.6,
                            position: 'relative'
                        }}
                    >
                        <CreditCardVisual {...card} />
                        {selectedCardId === card.id && (
                            <div style={{
                                position: 'absolute',
                                bottom: '-8px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60%',
                                height: '3px',
                                background: 'linear-gradient(90deg, #FF4D6D, #C8A44D)',
                                borderRadius: '2px'
                            }} />
                        )}
                    </div>
                ))}
            </div>

            <div className="card" style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#F6F1E8' }}>Card Settings</h2>
                <p style={{ fontSize: '14px', color: '#C9C1B8', marginBottom: '24px' }}>
                    Managing card •••• {selectedCard.last4}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#C8A44D' }}>
                                <Snowflake size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#F6F1E8' }}>Freeze Card</div>
                                <div style={{ fontSize: '14px', color: '#C9C1B8' }}>Temporarily disable this card</div>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                            <input
                                type="checkbox"
                                checked={selectedCard.isFrozen}
                                onChange={toggleFreeze}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: selectedCard.isFrozen ? '#FF4D6D' : '#C9C1B8', transition: '.4s', borderRadius: '34px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '18px', width: '18px',
                                    left: selectedCard.isFrozen ? '28px' : '4px', bottom: '4px', backgroundColor: 'white',
                                    transition: '.4s', borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#2BB673' }}>
                                <Sliders size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#F6F1E8' }}>Spending Limit</div>
                                <div style={{ fontSize: '14px', color: '#C9C1B8' }}>Current limit: ${selectedCard.limit.toLocaleString()}</div>
                            </div>
                        </div>
                        <button style={{ color: '#F6F1E8', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#1B2A41' }}>
                                <Shield size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#F6F1E8' }}>Show PIN</div>
                                <div style={{ fontSize: '14px', color: '#C9C1B8' }}>View your 4-digit PIN</div>
                            </div>
                        </div>
                        <button style={{ color: '#F6F1E8', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Virtual Card">
                <div style={{ color: '#C9C1B8', padding: '20px 0' }}>
                    <p>This will create a new virtual card linked to your Main Checking account.</p>
                    <div style={{ marginTop: '24px' }}>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={() => setIsModalOpen(false)}>Confirm Creation</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
