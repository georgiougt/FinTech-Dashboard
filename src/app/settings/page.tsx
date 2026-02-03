"use client";

import { useState } from 'react';
import { User, Moon, Shield, DollarSign, Save } from 'lucide-react';
import { USER_PROFILE } from '@/lib/data';

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        name: USER_PROFILE.name,
        email: 'akira.kurosawa@example.com',
        phone: '+81 90 1234 5678'
    });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // In a real app, this would make an API call to save the data
        console.log('Saving profile data:', formData);

        // Show success message
        setSaved(true);

        // Hide success message after 3 seconds
        setTimeout(() => setSaved(false), 3000);
    };

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
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                type="email"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,193,184,0.18)', color: '#F6F1E8' }}
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
                        <button
                            className="btn-primary"
                            onClick={handleSave}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}
                        >
                            <Save size={18} />
                            Save Changes
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
