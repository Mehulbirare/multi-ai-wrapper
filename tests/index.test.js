const MultiAI = require('../src/index');

// Mock providers locally if needed, but for now just test instantiation
describe('MultiAI Wrapper', () => {
    it('should instantiate correctly', () => {
        const ai = new MultiAI({
            providers: [
                { name: 'openai', apiKey: 'test' },
                { name: 'anthropic', apiKey: 'test' }
            ]
        });
        expect(ai.providers.length).toBe(2);
        expect(ai.providers[0].name).toBe('openai');
    });

    it('should resolve model aliases', () => {
        const ai = new MultiAI();
        expect(ai.resolveModel('smart', 'openai')).toBe('gpt-4o');
        expect(ai.resolveModel('fast', 'anthropic')).toBe('claude-3-haiku-20240307');
    });
});
