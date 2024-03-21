import OpenAI from 'openai';

class OpenAIService {
	private ENDPOINT: string = 'https://api.openai.com/v1/chat/completions';
    private apikey: string = "--------------------------------";
	async chatResponse(prompt: string): Promise<string> { 
		try {

            const request = await fetch(this.ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apikey}`
                },
                body: JSON.stringify({
                    messages: [ { role: "user", content: prompt, } ],
                    model: "gpt-3.5-turbo",
                    max_tokens: 500,
                    temperature: 1,
                }),
            })

            if (!request.ok) {
                throw new Error('Failed to fetch AI response');
            }

            const json = await request.json();
            //console.log("this is the result", json)
            const messageResponse = json.choices[0].message.content;   
			return messageResponse         

        } catch (error) {

            console.error('Error fetching AI response:', error);
            return("An error occurred while processing your request");

        } 
	}
}

export default OpenAIService;
