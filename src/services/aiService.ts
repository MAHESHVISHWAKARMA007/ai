import OpenAI from 'openai';
import { APIResponse, PresentationStyle } from '../types';
import { faker } from '@faker-js/faker';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const hasValidApiKey = API_KEY && 
  API_KEY !== 'YOUR_API_KEY' && 
  API_KEY !== 'API_KEY_ADDED' && 
  API_KEY.startsWith('sk-');

const openai = hasValidApiKey ? new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
}) : null;

// Helper to generate a deterministic, highly-reliable image URL from Picsum Photos.
const getImageUrl = (query: string, width: number, height: number) => {
  // Use a simple hash of the query to get a consistent "random" image.
  // This ensures the same slide content always gets the same image, providing stability.
  const seed = query.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  // Using the absolute value to ensure the seed is positive.
  const positiveSeed = Math.abs(seed);
  return `https://picsum.photos/seed/${positiveSeed}/${width}/${height}`;
};

const generateMockPresentation = (topic: string, style: PresentationStyle): APIResponse => {
  const topicKeywords = topic.toLowerCase();
  const isHealthcare = topicKeywords.includes('health') || topicKeywords.includes('medical');
  const isTech = topicKeywords.includes('ai') || topicKeywords.includes('tech') || topicKeywords.includes('digital');
  
  const generateDetailedContent = (slideType: string) => {
    // This function remains the same, generating detailed text content.
    // ... (content generation logic is unchanged)
    const sentences = [];
    
    switch (slideType) {
      case 'introduction':
        sentences.push(`In today's rapidly evolving landscape, ${topic.toLowerCase()} represents a transformative force that is reshaping industries and redefining possibilities. This comprehensive analysis explores the multifaceted dimensions of ${topic.toLowerCase()}, examining its current state, emerging trends, and future implications.`);
        sentences.push(`The significance of ${topic.toLowerCase()} extends far beyond traditional boundaries, creating new paradigms for innovation, efficiency, and growth. Organizations worldwide are recognizing the strategic imperative to understand and leverage these developments to maintain competitive advantage.`);
        sentences.push(`Through extensive research and analysis of market trends, industry reports, and expert insights, we have identified key patterns and opportunities that define the current trajectory of ${topic.toLowerCase()}. This presentation synthesizes these findings to provide actionable intelligence for decision-makers.`);
        sentences.push(`Our exploration will cover fundamental principles, practical applications, real-world case studies, and strategic recommendations. Each section builds upon the previous to create a comprehensive understanding of how ${topic.toLowerCase()} can drive meaningful outcomes in various organizational contexts.`);
        break;
        
      case 'analysis':
        sentences.push(`The current state of ${topic.toLowerCase()} reveals a complex ecosystem characterized by rapid innovation, increasing adoption rates, and evolving regulatory frameworks. Market analysis indicates significant growth potential, with projected compound annual growth rates exceeding industry averages across multiple sectors.`);
        sentences.push(`Key performance indicators demonstrate measurable improvements in efficiency, cost reduction, and user satisfaction when ${topic.toLowerCase()} initiatives are properly implemented. Organizations report average productivity gains of ${faker.number.int({ min: 15, max: 45 })}% and cost savings of approximately ${faker.number.int({ min: 20, max: 60 })}% within the first ${faker.number.int({ min: 6, max: 18 })} months of deployment.`);
        sentences.push(`Competitive landscape analysis reveals that early adopters are establishing significant market advantages, while late entrants face increasing barriers to entry. The technology maturity curve suggests we are approaching a critical inflection point where widespread adoption becomes inevitable.`);
        sentences.push(`Risk assessment frameworks identify potential challenges including implementation complexity, change management requirements, and infrastructure dependencies. However, comprehensive mitigation strategies can address these concerns while maximizing return on investment.`);
        break;
        
      case 'implementation':
        sentences.push(`Successful implementation of ${topic.toLowerCase()} requires a structured, phased approach that balances ambitious goals with practical constraints. Our recommended methodology encompasses strategic planning, stakeholder alignment, technical preparation, and performance monitoring throughout the deployment lifecycle.`);
        sentences.push(`Phase one focuses on foundational elements including needs assessment, resource allocation, and team formation. This critical stage establishes the framework for success by ensuring all prerequisites are met and potential obstacles are identified early in the process.`);
        sentences.push(`Phase two emphasizes pilot program development and controlled testing environments. This approach allows organizations to validate assumptions, refine processes, and build confidence before full-scale deployment. Pilot results typically show ${faker.number.int({ min: 10, max: 30 })}% improvement in target metrics.`);
        sentences.push(`Phase three involves scaled implementation with continuous monitoring and optimization. Best practices include regular performance reviews, stakeholder feedback sessions, and iterative improvements. Organizations following this methodology report ${faker.number.int({ min: 85, max: 95 })}% success rates in achieving stated objectives.`);
        break;
        
      case 'benefits':
        sentences.push(`The strategic advantages of embracing ${topic.toLowerCase()} extend across multiple organizational dimensions, creating value through improved operational efficiency, enhanced decision-making capabilities, and accelerated innovation cycles. Quantitative benefits include measurable improvements in key performance indicators and qualitative enhancements in organizational agility.`);
        sentences.push(`Financial impact analysis reveals significant cost optimization opportunities, with organizations typically achieving payback periods of ${faker.number.int({ min: 8, max: 24 })} months and ongoing annual savings of ${faker.number.int({ min: 15, max: 40 })}%. Revenue enhancement opportunities emerge through improved customer experiences and new service delivery models.`);
        sentences.push(`Operational benefits manifest as streamlined processes, reduced manual intervention, and enhanced accuracy in critical functions. Employee satisfaction surveys indicate increased job satisfaction and engagement when routine tasks are automated and employees can focus on higher-value activities.`);
        sentences.push(`Strategic positioning advantages include enhanced market responsiveness, improved customer insights, and accelerated time-to-market for new initiatives. These capabilities create sustainable competitive advantages that compound over time.`);
        break;
        
      case 'challenges':
        sentences.push(`While the potential of ${topic.toLowerCase()} is substantial, organizations must navigate complex implementation challenges that require careful planning and expert guidance. Common obstacles include technical integration complexity, change management resistance, and resource allocation constraints.`);
        sentences.push(`Technical challenges often stem from legacy system compatibility, data quality issues, and infrastructure limitations. Successful organizations invest in comprehensive technical assessments and phased modernization strategies to address these fundamental requirements systematically.`);
        sentences.push(`Organizational readiness factors significantly impact implementation success. Change management strategies must address skill gaps, cultural resistance, and communication barriers. Effective approaches include comprehensive training programs, executive sponsorship, and clear success metrics.`);
        sentences.push(`Regulatory and compliance considerations add complexity to implementation timelines and resource requirements. Proactive engagement with relevant authorities and industry standards bodies helps ensure alignment with evolving requirements and reduces compliance risks.`);
        break;
        
      case 'future':
        sentences.push(`The future trajectory of ${topic.toLowerCase()} points toward unprecedented transformation across industries, driven by accelerating technological capabilities, evolving user expectations, and emerging regulatory frameworks. Predictive analytics suggest exponential growth in adoption rates and capability sophistication over the next ${faker.number.int({ min: 3, max: 7 })} years.`);
        sentences.push(`Emerging trends indicate convergence with complementary technologies, creating synergistic opportunities for enhanced value creation. Integration possibilities include advanced analytics, automation platforms, and next-generation user interfaces that collectively reshape operational paradigms.`);
        sentences.push(`Market projections indicate sustained investment growth, with annual spending increases of ${faker.number.int({ min: 20, max: 50 })}% across relevant sectors. This investment surge will accelerate innovation cycles and expand accessibility to organizations of all sizes.`);
        sentences.push(`Strategic implications require forward-thinking organizations to develop long-term roadmaps that anticipate technological evolution while maintaining operational excellence. Early investment in foundational capabilities positions organizations to capitalize on emerging opportunities as they materialize.`);
        break;
        
      default:
        sentences.push(`This comprehensive analysis of ${topic.toLowerCase()} demonstrates the critical importance of understanding and embracing transformative technologies in today's competitive environment. The evidence clearly indicates that organizations must adapt their strategies to leverage these emerging capabilities effectively.`);
        sentences.push(`Implementation success depends on thorough planning, stakeholder alignment, and commitment to continuous improvement. Organizations that approach ${topic.toLowerCase()} systematically and strategically position themselves for sustained success and competitive advantage.`);
        sentences.push(`The investment required for effective implementation is substantial but justified by the potential returns and strategic benefits. Organizations must balance short-term costs with long-term value creation opportunities while maintaining operational stability.`);
        sentences.push(`Future success in this domain will require ongoing adaptation, continuous learning, and strategic partnerships with technology providers and industry experts. The rapidly evolving landscape demands agility and commitment to innovation excellence.`);
    }
    
    return sentences.join(' ');
  };

  const mockSlides = [
    { imageQuery: isTech ? 'technology-innovation' : isHealthcare ? 'healthcare-technology' : 'business-strategy', layout: 'title' as const, title: `${topic}: A Comprehensive Analysis`, subtitle: `Strategic Insights and Implementation Roadmap for ${new Date().getFullYear()}`, bulletPoints: [`Understanding the transformative potential of ${topic.toLowerCase()}`,'Strategic implications for organizational growth','Evidence-based recommendations for implementation','Future-proofing strategies for sustained success'], detailedContent: generateDetailedContent('introduction') },
    { imageQuery: isTech ? 'data-analytics-dashboard' : isHealthcare ? 'medical-research' : 'market-analysis', layout: 'detailed' as const, title: 'Market Landscape and Current State Analysis', subtitle: 'Understanding the ecosystem and competitive dynamics', bulletPoints: ['Current market size and growth trajectory analysis','Key players and competitive positioning strategies','Emerging trends and technological developments','Regulatory environment and compliance requirements'], detailedContent: generateDetailedContent('analysis') },
    { imageQuery: isTech ? 'business-growth-chart' : isHealthcare ? 'healthcare-improvement' : 'success-metrics', layout: 'split' as const, title: 'Strategic Benefits and Value Proposition', subtitle: 'Quantifiable advantages and competitive differentiation', bulletPoints: ['Operational efficiency improvements and cost optimization','Revenue enhancement through new service models','Customer experience transformation and satisfaction gains','Risk mitigation and compliance advantages'], detailedContent: generateDetailedContent('benefits') },
    { imageQuery: isTech ? 'project-management' : isHealthcare ? 'healthcare-workflow' : 'implementation-roadmap', layout: 'detailed' as const, title: 'Implementation Strategy and Roadmap', subtitle: 'Systematic approach to successful deployment', bulletPoints: ['Phase 1: Strategic planning and readiness assessment','Phase 2: Pilot program development and controlled testing','Phase 3: Scaled deployment with performance monitoring','Phase 4: Optimization and continuous improvement'], detailedContent: generateDetailedContent('implementation') },
    { imageQuery: isTech ? 'problem-solving' : isHealthcare ? 'healthcare-challenges' : 'risk-management', layout: 'comparison' as const, title: 'Challenges and Mitigation Strategies', subtitle: 'Addressing common obstacles and risk factors', bulletPoints: ['Technical integration complexity and legacy system compatibility','Change management resistance and organizational readiness','Resource constraints and budget considerations','Skill gaps and training requirements'], detailedContent: generateDetailedContent('challenges') },
    { imageQuery: isTech ? 'future-technology' : isHealthcare ? 'future-healthcare' : 'future-trends', layout: 'image' as const, title: 'Future Trends and Strategic Implications', subtitle: 'Emerging opportunities and long-term considerations', bulletPoints: ['Technology evolution and capability advancement timeline','Market dynamics and competitive landscape changes','Regulatory developments and compliance implications','Investment trends and funding pattern analysis'], detailedContent: generateDetailedContent('future') },
    { imageQuery: isTech ? 'success-celebration' : isHealthcare ? 'healthcare-success' : 'business-success', layout: 'conclusion' as const, title: 'Strategic Recommendations and Next Steps', subtitle: 'Actionable insights for immediate implementation', bulletPoints: [`Immediate action: Begin ${topic.toLowerCase()} readiness assessment within 30 days`,'Establish cross-functional implementation team with executive sponsorship','Conduct comprehensive pilot program to validate approach and metrics','Develop phased roadmap with clear milestones and success criteria'], detailedContent: generateDetailedContent('conclusion') },
  ];

  const slides = mockSlides.map(slide => ({
    ...slide,
    imageUrl: getImageUrl(slide.imageQuery, 800, 600),
    secondaryImageUrl: slide.layout === 'detailed' ? getImageUrl(`${slide.imageQuery}-data-chart`, 400, 300) : undefined,
    backgroundColor: style === 'creative' && (slide.layout === 'title' || slide.layout === 'conclusion') ? '#667eea' : undefined,
    content: `An in-depth exploration of ${topic.toLowerCase()} and its strategic implications for modern organizations.`,
    keyPoints: [ `Market opportunity: $${faker.number.int({ min: 50, max: 500 })} billion`, `Growth rate: ${faker.number.int({ min: 15, max: 45 })}% annually` ],
    examples: [ `${faker.company.name()} achieved ${faker.number.int({ min: 25, max: 60 })}% efficiency improvement` ],
    statistics: [ `${faker.number.int({ min: 75, max: 95 })}% of industry leaders prioritize this initiative` ],
  }));

  return { slides };
};

const getSystemPrompt = () => `You are an expert presentation creator AI. Your task is to generate a series of professional slides based on a user's topic and chosen style. You must return the output as a single, valid JSON object that strictly adheres to the provided APIResponse TypeScript interface. Do not include any markdown formatting, comments, or extraneous text outside of the JSON object.`;

const getUserPrompt = (topic: string, style: PresentationStyle) => `
Please generate a presentation on the topic: "${topic}".
The desired style is: "${style}".

The presentation should have between 6 and 8 slides, including a title slide, several detailed content slides, and a conclusion slide.
For each slide, provide all the fields as defined in the APIResponse interface.
For the main content slides (e.g., layout: 'detailed' or 'split'), the 'detailedContent' field must be very comprehensive, aiming for 400-500 words. It should be well-structured, professional, and insightful.
For every slide, provide a concise 'imageQuery' string of 2-4 words that is highly relevant to the slide's content. This query will be used to find a suitable background or supporting image. Example queries: 'financial-growth-chart', 'team-collaboration-meeting', 'futuristic-city-skyline'. Use hyphens instead of spaces.

Here is the TypeScript interface for the expected JSON output structure:

interface APIResponse {
  slides: {
    title: string;
    subtitle?: string;
    bulletPoints: string[];
    content?: string;
    detailedContent?: string;
    keyPoints?: string[];
    examples?: string[];
    statistics?: string[];
    imageQuery: string;
    layout: 'title' | 'content' | 'image' | 'split' | 'conclusion' | 'detailed' | 'comparison';
    backgroundColor?: string;
  }[];
}

Remember, your entire response must be ONLY the JSON object, without any other text or formatting.
`;

export const generateSlides = async (topic: string, style: PresentationStyle): Promise<APIResponse> => {
  if (!hasValidApiKey) {
    console.log('Using enhanced demo service - add your OpenAI API key to enable live AI generation');
    await new Promise(resolve => setTimeout(resolve, faker.number.int({ min: 1500, max: 3500 })));
    return generateMockPresentation(topic, style);
  }

  try {
    const completion = await openai!.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: getSystemPrompt() },
        { role: 'user', content: getUserPrompt(topic, style) },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Received empty response from AI.');
    }

    const parsedResponse: APIResponse = JSON.parse(content);

    const enhancedSlides = parsedResponse.slides.map(slide => ({
      ...slide,
      imageUrl: getImageUrl(slide.imageQuery, 800, 600),
      secondaryImageUrl: slide.layout === 'detailed' ? getImageUrl(`${slide.imageQuery}-data`, 400, 300) : undefined,
    }));

    return { slides: enhancedSlides };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    console.log('Falling back to enhanced demo service');
    return generateMockPresentation(topic, style);
  }
};
