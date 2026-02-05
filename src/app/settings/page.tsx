"use client";

import { useState, useEffect } from 'react';
import { User, Moon, Shield, DollarSign, Save, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const { user, loading: userLoading, updateUser } = useUser();

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state separate from profile data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    // Populate form data when user data loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save changes');
            }

            // Optimistically update context immediately
            updateUser({
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            });

            // Force a router refresh to update server components if needed
            // router.refresh();

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);

        } catch (err: any) {
            console.error('Settings save error:', err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (userLoading && !user) {
        return <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}><Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 16px' }} />Loading settings...</div>;
    }

    return (
        <div style={{ maxWidth: '800px' }}>
            <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Settings</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Profile Section */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <User className="text-sakura" size={24} />
                        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#F6F1E8' }}>Profile</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#C9C1B8', fontSize: '14px' }}>Full Name</label>
                            <input
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,193,184,0.18)', color: '#F6F1E8' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#C9C1B8', fontSize: '14px' }}>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Official Email"
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(201,193,184,0.18)',
                                    color: '#F6F1E8',
                                    opacity: 0.7,
                                    cursor: 'not-allowed'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#C9C1B8', fontSize: '14px' }}>Phone</label>
                            <input
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,193,184,0.18)', color: '#F6F1E8' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {saved && (
                            <div style={{ color: '#2BB673', fontSize: '14px', fontWeight: 500 }}>
                                ✓ Changes saved successfully
                            </div>
                        )}
                        {error && (
                            <div style={{ color: '#FF4D6D', fontSize: '14px', fontWeight: 500 }}>
                                ⚠ {error}
                            </div>
                        )}
                        <button
                            className="btn-primary"
                            onClick={handleSave}
                            disabled={saving}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', opacity: saving ? 0.7 : 1 }}
                        >
                            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <Moon className="text-sakura" size={24} />
                        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#F6F1E8' }}>Preferences</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: '#F6F1E8', fontWeight: 500 }}>Dark Mode</div>
                                <div style={{ fontSize: '14px', color: '#C9C1B8' }}>Always on for the true Tokyo night experience</div>
                            </div>
                            <div style={{ pointerEvents: 'none', opacity: 0.5 }}>
                                {/* Fake toggle strictly ON */}
                                <div style={{ width: '50px', height: '26px', background: '#FF4D6D', borderRadius: '34px', position: 'relative' }}>
                                    <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', right: '4px', top: '4px' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: '#F6F1E8', fontWeight: 500 }}>Reduced Motion</div>
                                <div style={{ fontSize: '14px', color: '#C9C1B8' }}>Minimize animations</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                                <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                                <span className="slider" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#C9C1B8', borderRadius: '34px' }}>
                                    <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: '4px', bottom: '4px', backgroundColor: 'white', borderRadius: '50%' }} />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <Shield className="text-sakura" size={24} />
                        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#F6F1E8' }}>Security</h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: '#F6F1E8', fontWeight: 500 }}>Two-Factor Authentication</div>
                            <div style={{ fontSize: '14px', color: '#C9C1B8' }}>Extra security for your account</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                            <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                            <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2BB673', borderRadius: '34px' }}>
                                <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', right: '4px', bottom: '4px', backgroundColor: 'white', borderRadius: '50%' }} />
                            </span>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
}
