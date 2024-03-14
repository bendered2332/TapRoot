import OpenAI from 'openai';

export class OpenAIService {
	private openai: OpenAI;

	constructor(apiKey: string) {
			// Initialize OpenAI with your API key
			this.openai = new OpenAI({ apiKey });
	}

	// send a prompt and get completion
	async sendChat(prompt: string): Promise<string> {
		try {
			// passing the model witht he prompt
			const params: OpenAI.Chat.ChatCompletionCreateParams = {
				messages: [{ role: 'user', content: prompt }],
				model: 'gpt-3.5-turbo',
			};

			// call being made
			const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(params);
			let completionText :string = "";

			// simple null check for response
			if(chatCompletion.choices[0]?.message.content) {
				completionText = chatCompletion.choices[0]?.message.content; 
				return completionText;
			} else {
				console.error('Error: Completion text not found in response');
					return "Prompt Failed."; // Return null explicitly
			}

		} catch (error) {
			console.error('Error in service:', error);
			throw error;
		}
	}
}
