"use client";

import { useEffect, useState } from 'react';

export default function DebugPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/debug')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setData({ error: err.message });
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '40px', background: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'monospace' }}>
            <h1>System Debug</h1>
            {loading ? (
                <p>Running diagnostics...</p>
            ) : (
                <pre style={{ background: '#222', padding: '20px', borderRadius: '8px', overflow: 'auto' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}
