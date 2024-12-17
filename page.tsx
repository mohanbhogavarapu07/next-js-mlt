'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState<string>('');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to translate.');
      return;
    }

    setError('');
    setLoading(true);
    setTranslations({});

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranslations(data.translations);
      } else {
        setError(data.error || 'Failed to fetch translations');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f9fafb',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '10px', color: '#333333' }}>Text Translator</h1>
        <p style={{ marginBottom: '20px', color: '#555555' }}>
          Enter text and see translations in 5 languages.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          rows={4}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
            outline: 'none',
          }}
        />
        <button
          onClick={handleTranslate}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: '#ffffff',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</p>
        )}

        {Object.keys(translations).length > 0 && (
          <div
            style={{
              marginTop: '20px',
              textAlign: 'left',
            }}
          >
            <h2 style={{ marginBottom: '10px', color: '#333333' }}>Translations:</h2>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {Object.entries(translations).map(([language, translation]) => (
                <li
                  key={language}
                  style={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#444444',
                  }}
                >
                  <strong style={{ color: '#0070f3' }}>{language}:</strong> {translation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
