import { NextResponse } from 'next/server';
import { translateText, SUPPORTED_LANGUAGES } from 'my-language-translator';

export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text input is required' }, { status: 400 });
    }

    // Translate text into all supported languages
    const translations = {};
    for (const lang in SUPPORTED_LANGUAGES) {
      translations[SUPPORTED_LANGUAGES[lang]] = await translateText(text, lang);
    }

    return NextResponse.json({ translations });
  } catch (error) {
    return NextResponse.json(
      { error: 'Translation failed', details: error.message },
      { status: 500 }
    );
  }
}
