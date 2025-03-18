const toolInterface = `export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  url: string;
  logoUrl: string  // valid logo url;
  pricing?: array  // pricing: [{type: , plan: , cost: , features: ["","",""] recommended: true or false};
  company?: string;
  origin?: string;
  trending?: boolean;
  featured?: boolean;
  tags?: string[];
  features: string[];
  pros: string[]  //more than 5 pros;
  cons: string[]  //more than 5 cons;
  rating: number;
  users: string;
  reviews?: number;
  useCases?: string[] // better usecases more than 6;
  integrations?: string[];
  alternatives?: {
    id: string;
    name: string;
    logoUrl: string // valid logo url;
  }[];
  testimonials?: {
    author: string;
    company: string;
    content: string;
    rating: number;
  }[];
  created: string;
  updated: string;
}`;

export const trendingToolsPrompt = (countryFilter: string) => {
  let prompt = `Research and list the top 10 trending AI tools currently available`;
  if (countryFilter) {
    prompt = `Research and list the top trending AI tools currently available`;
    prompt += ` from ${countryFilter}`;
  }
  prompt += `. Please ensure your response spans a diverse range of categories. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience
    - Key features and standout functionalities
    - Pricing details and user statistics
    - User testimonials and reviews
    - Use cases and integrations
    - Similar tools and alternatives
    - All additional metadata and statistics

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};

export const categoryToolsPrompt = (category: string, countryFilter: string) => {
  let prompt = `Research and list the top 10 ${category} AI tools currently available`;
  if (countryFilter) {
    prompt = `Research and list the top ${category} AI tools currently available`;
    prompt += ` from ${countryFilter}`;
  }
  prompt += `. Please ensure your response includes comprehensive tool details including:
    - Detailed feature sets and capabilities
    - User reviews and testimonials
    - Integration possibilities
    - Real-world use cases
    - Alternative tools in the same category

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};

export const newToolsPrompt = () => {
  let prompt = `Research and list the top 20 newly launched AI tools currently available`;
  prompt += `. Include detailed information about:
    - Feature sets and capabilities
    - Early user reviews and feedback
    - Market positioning and alternatives
    - Integration capabilities
    - Use cases and target audiences

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};