export const trendingToolsPrompt = (countryFilter: string) => {
  let prompt = `Research and list the top 5 trending AI tools currently available`;
  if (countryFilter) {
    prompt = `Research and list the top trending AI tools currently available`;
    prompt += ` from ${countryFilter}`;
  }
  prompt += `. Please ensure your response spans a diverse range of categories such as coding assistants, design tools, automation, productivity, and data analytics. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience.
    - Key features and standout functionalities.
    - Additional information such as pricing, company, origin, and tags when available.
    - The current trend status, and whether the tool is featured.
    - List the pros and cons of each tool its compulsary.
  
    Return your answer strictly as a JSON array or JSON where each element is an object conforming to the following TypeScript interface:
  
    export interface AITool {
      id: string;                     // Unique identifier for the tool.
      name: string;                   // Name of the tool.
      description: string;            // A concise bio summarizing its primary use case, key features, target audience, and unique selling points.
      category: string;               // Main category (e.g., Coding, Design, Automation, Productivity, Data Analytics etc...).
      subcategory?: string;           // (Optional) More specific category if applicable.
      url: string;                    // Official website or landing page URL.
      logoUrl: string;                // URL to the tool's logo image.
      pricing?: array;                // Pricing details provided as a JSON Array and it contains type should be free or premium, plan and cost are the keys.
      company?: string;               // (Optional) Name of the company behind the tool.
      origin?: string;                // (Optional) Country or region of origin.
      trending?: boolean;             // (Optional) Indicates if the tool is currently trending.
      featured?: boolean;             // (Optional) Indicates if the tool is featured.
      tags?: string[];                // (Optional) A list of tags relevant to the tool.
      features: string[];             // A List of key features about the tool
      pros: string[];                 // A List of pros about the tool
      cons: string[];                // A List of cons about the tool
      rating: number;                 // (Optional) User rating on a scale of 1 to 5.
      users: string;                 // (Optional) Number of users who have used the tool.
      created: string;
      updated: string;
    }
  
    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
}

export const categoryToolsPrompt = (category: string, countryFilter: string) => {
  let prompt = `Research and list the top 5 ${category} AI tools currently available`;
  if (countryFilter) {
    prompt = `Research and list the top ${category} AI tools currently available`;
    prompt += ` from ${countryFilter}`;
  }
  prompt += `. Please ensure your response should be the category based ai tools only. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience.
    - Key features and standout functionalities.
    - Additional information such as pricing, company, origin, and tags when available.
    - The current trend status, and whether the tool is featured.
    - List the pros and cons of each tool.
  
    Return your answer strictly as a JSON array or JSON where each element is an object conforming to the following TypeScript interface:
  
    export interface AITool {
      id: string;                     // Unique identifier for the tool.
      name: string;                   // Name of the tool.
      description: string;            // A concise bio summarizing its primary use case, key features, target audience, and unique selling points.
      category: string;               // Main category (e.g., Coding, Design, Automation, Productivity, Data Analytics etc...).
      subcategory?: string;           // (Optional) More specific category if applicable.
      url: string;                    // Official website or landing page URL.
      logoUrl: string;                // URL to the tool's logo image.
      pricing?: array;                // Pricing details provided as a JSON Array and it contains type should be free or premium, plan and cost are the keys.
      company?: string;               // (Optional) Name of the company behind the tool.
      origin?: string;                // (Optional) Country or region of origin.
      trending?: boolean;             // (Optional) Indicates if the tool is currently trending.
      featured?: boolean;             // (Optional) Indicates if the tool is featured.
      tags?: string[];                // (Optional) A list of tags relevant to the tool.
      features: string[];             // A List of key features about the tool
      pros: string[];                 // A List of pros about the tool
      cons: string[];                // A List of cons about the tool
      rating: number;                 // (Optional) User rating on a scale of 1 to 5.
      users: string;                 // (Optional) Number of users who have used the tool.
      created: string;
      updated: string;
    }
  
    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
}

export const newToolsPrompt = () => {
  let prompt = `Research and list the top 10 new AI tools that have recently been launched from last month to now`;
  // if (countryFilter) {
    // prompt = `Research and list the top new AI tools that have recently been launched`;
    // prompt += ` from ${countryFilter}`;
  // }
  prompt += `. Please ensure your response spans a diverse range of categories such as coding assistants, design tools, automation, productivity, and data analytics. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience.
    - Key features and standout functionalities.
    - Additional information such as pricing, company, origin, and tags when available.
    - The current trend status, and whether the tool is featured.
    - List the pros and cons of each tool.
  
    Return your answer strictly as a JSON array or JSON where each element is an object conforming to the following TypeScript interface:
  
    export interface AITool {
      id: string;                     // Unique identifier for the tool.
      name: string;                   // Name of the tool.
      description: string;            // A concise bio summarizing its primary use case, key features, target audience, and unique selling points.
      category: string;               // Main category (e.g., Coding, Design, Automation, Productivity, Data Analytics etc...).
      subcategory?: string;           // (Optional) More specific category if applicable.
      url: string;                    // Official website or landing page URL.
      logoUrl: string;                // URL to the tool's logo image.
      pricing?: array;                // Pricing details provided as a JSON Array and it contains type should be free or premium, plan and cost are the keys.
      company?: string;               // (Optional) Name of the company behind the tool.
      origin?: string;                // (Optional) Country or region of origin.
      trending?: boolean;             // (Optional) Indicates if the tool is currently trending.
      featured?: boolean;             // (Optional) Indicates if the tool is featured.
      tags?: string[];                // (Optional) A list of tags relevant to the tool.
      features: string[];             // A List of key features about the tool
      pros: string[];                 // A List of pros about the tool
      cons: string[];                // A List of cons about the tool
      rating: number;                 // (Optional) User rating on a scale of 1 to 5.
      users: string;                 // (Optional) Number of users who have used the tool.
      created: string;
      updated: string;
    }
  Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
}