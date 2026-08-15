# Paraphraser Lab

A precision paraphrasing prototype built around a different premise: natural writing is not defined by mistakes. The engine reconstructs meaning through perspective, reasoning and expression while protecting factual anchors and enforcing a measurable word-count contract.

## v0.1 features

- Exact word-count mode: 100 words in → 100 words out, or the request is rejected rather than silently returning the wrong count.
- ±1%, ±3%, and custom exact target modes.
- Protected citations, quotations, numbers, currency values, DOI strings and URLs.
- Register preservation plus academic, professional, technical and creative modes.
- Independent semantic fidelity verification.
- Swappable AI models through Vercel AI Gateway.
- Blind A/B/C comparison across Claude Sonnet 5, GPT-5.6 Terra and Gemini 3.6 Flash.
- Local blind-test voting so model preferences can be accumulated during development.

## Architecture

`analyse/protect → reconstruct → restore → count → precision-correct → structural validation → semantic verification → return`

Word count is measured by application code with `Intl.Segmenter`. The model is never trusted to report its own count. Exact mode retries controlled correction passes and rejects the output if it still fails the contract.

## Setup

1. Install Node.js 22+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add a Vercel AI Gateway key as `AI_GATEWAY_API_KEY`.
5. Run `npm run dev`.

The key is used only in server routes. Do not expose it through a `NEXT_PUBLIC_*` variable.

## Models

Defaults can be changed without editing application code:

- `PARAPHRASER_MODEL_ANTHROPIC=anthropic/claude-sonnet-5`
- `PARAPHRASER_MODEL_OPENAI=openai/gpt-5.6-terra`
- `PARAPHRASER_MODEL_GOOGLE=google/gemini-3.6-flash`
- `PARAPHRASER_VERIFIER_MODEL=google/gemini-3.6-flash`

## Tests

Run `npm test`. The first tests cover the deterministic parts of the system: counting, target ranges, protection and restoration.

## Important product constraint

No system can truthfully guarantee a particular result from third-party AI detectors. The engineering target here is stronger and more defensible: produce independently reconstructed, natural, high-quality language while preserving the user's meaning and measurable constraints.

## Next test milestones

- Build a fixed benchmark corpus covering academic, business, technical and creative prose.
- Record blind model preferences by category rather than globally.
- Add automated semantic-drift regression tests.
- Add voice-profile extraction from samples of a user's own writing.
- Add chunk-aware long-document rewriting while maintaining whole-document count parity.
