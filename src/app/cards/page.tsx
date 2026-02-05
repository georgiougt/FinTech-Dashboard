"use client";

import CreditCardVisual from '@/components/CreditCardVisual';
import { Plus, Snowflake, Sliders, Shield, Loader2 } from 'lucide-react';
import Modal from '@/components/Modal';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext'; // To get user name for cards if we want
import { Card } from '@/lib/api'; // Assuming type exists or define locally
import Link from 'next/link';

export default function CardsPage() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCards() {
            try {
                const res = await fetch('/api/cards');
                if (res.ok) {
                    const data = await res.json();
                    setCards(data);
                    if (data.length > 0) setSelectedCardId(data[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch cards:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCards();
    }, []);

    const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

    const toggleFreeze = async () => {
        if (!selectedCard) return;
        // In a real app we would call API to toggle freeze
        // For now, UI update only as an example of interaction
        setCards(prev => prev.map(card =>
            card.id === selectedCardId ? { ...card, isFrozen: !card.isFrozen } : card
        ));
    };

    if (loading) {
        return <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}><Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 16px' }} />Loading cards...</div>;
    }

    if (cards.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ marginBottom: '24px', opacity: 0.5 }}>
                    <CreditCardVisual
                        id="demo"
                        last4="0000"
                        holder="YOUR NAME"
                        expiry="00/00"
                        limit={0}
                        isFrozen={false}
                        color="linear-gradient(135deg, #333, #111)"
                    />
                </div>
                <h2 style={{ color: '#F6F1E8', marginBottom: '8px' }}>No Cards Found</h2>
                <p style={{ color: '#C9C1B8', marginBottom: '24px' }}>You haven't issued any cards yet.</p>
                <Link href="/accounts" className="btn-primary">
                    Go to Accounts to Issue Card
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700 }}>Cards</h1>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, cursor: 'not-allowed' }} title="Coming Soon">
                    <Plus size={20} />
                    New Virtual Card
                </button>
            </div>

            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '32px', marginBottom: '32px' }}>
                {cards.map(card => (
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

            {selectedCard && (
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
            )}
        </div>
    );
}
