export interface DocumindArgs {
    cleanup?: boolean;
    concurrency?: number;
    filePath: string;
    llmParams?: LLMParams;
    maintainFormat?: boolean;
    model?: ModelOptions;
    openaiAPIEndpoint?: string;
    openaiAPIKey?: string;
    outputDir?: string;
    pagesToConvertAsImages?: number | number[];
    tempDir?: string;
}
export declare enum ModelOptions {
    gpt_4o = "gpt-4o",
    gpt_4o_mini = "gpt-4o-mini"
}
export interface Page {
    content: string;
    contentLength: number;
    page: number;
}
export interface DocumindOutput {
    completionTime: number;
    fileName: string;
    inputTokens: number;
    outputTokens: number;
    pages: Page[];
}
export interface CompletionResponse {
    content: string;
    inputTokens: number;
    outputTokens: number;
}
export interface CompletionArgs {
    apiKey: string;
    imagePath: string;
    llmParams?: LLMParams;
    maintainFormat: boolean;
    model: ModelOptions;
    priorPage: string;
}
export interface LLMParams {
    frequencyPenalty?: number;
    maxTokens?: number;
    presencePenalty?: number;
    temperature?: number;
    topP?: number;
}
