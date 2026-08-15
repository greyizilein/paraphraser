# Paraphraser Lab

A precision paraphrasing prototype built around a different premise: natural writing is not defined by mistakes. The engine reconstructs meaning through perspective, reasoning and expression while protecting factual anchors and enforcing a measurable word-count contract.

## v0.2 reconstruction engine

- One full reconstruction call generates three structurally different candidates from the same protected meaning.
- Local deterministic scoring ranks candidates for sentence-length regularity, canned transitions, repeated openings and excessive source-structure overlap.
- Exact count no longer triggers repeated whole-passage rewrites. If correction is needed, only a selected sentence is edited, with at most two local precision passes.
- Exact, ±1%, ±3%, and custom target modes remain enforced by application code.
- Citations, quotations, numbers, currency values, DOI strings and URLs remain protected.
- Independent semantic-fidelity verification remains separate from the writing model.
- Claude Sonnet 5, GPT-5.6 Terra and Gemini 3.6 Flash remain swappable through Vercel AI Gateway.
- The UI exposes naturalness diagnostics and candidate-ranking data for development testing.

## Architecture

`protect meaning → reconstruct 3 candidates → restore → local naturalness rank → local count edit if needed → protected-element check → semantic verification → return`

The model is never trusted to report its own word count. The application uses `Intl.Segmenter` consistently on both the client and server. Exact mode rejects an output that still misses the contract after local correction rather than repeatedly polishing the whole passage.

## Setup

1. Install Node.js 22+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` if developing outside Vercel.
4. Use Vercel AI Gateway authentication through `AI_GATEWAY_API_KEY` or Vercel OIDC.
5. Run `npm run dev`.

Secrets are server-side only. Never expose them through `NEXT_PUBLIC_*` variables.

## Tests

Run `npm test`. Regression tests cover counting, target ranges, protected-content round trips, source-structure overlap and penalties for repetitive canned prose.

## Product constraint

Third-party AI detectors are probabilistic and can flag genuine human writing. The product therefore does not claim a guaranteed detector score. The engineering target is independently reconstructed, natural, high-quality language that preserves meaning and measurable constraints.

## Next test milestone

Use a fixed benchmark corpus and record, for every input, the source detector result, output detector result, model, naturalness diagnostics, word-count parity and human preference. Changes should be judged against the same corpus before being promoted.
