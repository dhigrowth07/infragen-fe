// ── Shared TypeScript interfaces for the AI Agent Chatbot ─────────────────────

export type CardType = "booking_form" | "lead_form" | "handoff";
export type MessageRole = "user" | "model";
export type MessageSender = "bot" | "user";

export interface ChipItem {
  icon: string;
  label: string;
  action?: string;
  payload?: string;
}

export interface SessionMemory {
  propertyType?: string;
  location?: string;
  budget?: string;
  purpose?: string;
  name?: string;
  phone?: string;
  email?: string;
  visitBooked?: boolean;
}

export interface MessageItem {
  id: number;
  sender: MessageSender;
  text: string;
  time: string;
  chips?: ChipItem[];
  properties?: import("@/data/properties").PropertyItem[];
  cardType?: CardType;
  isToolProgress?: boolean;
}

// ── API payload shapes ────────────────────────────────────────────────────────

export interface ApiMessage {
  role: MessageRole;
  content: string;
}

export interface ChatRequest {
  messages: ApiMessage[];
  sessionMemory: SessionMemory;
  toolResult?: {
    name: string;
    content: string;
  };
}

export interface ToolCallResponse {
  type: "tool_call";
  name: string;
  args: Record<string, unknown>;
}

export interface MessageResponse {
  type: "message";
  text: string;
}

export type ChatApiResponse = ToolCallResponse | MessageResponse | { type: "error"; message: string };

// ── Tool argument shapes ──────────────────────────────────────────────────────

export interface SearchPropertiesArgs {
  propertyType?: string;
  location?: string;
  budgetLabel?: string;
}

export interface GetCompanyInfoArgs {
  topic: string;
}

export interface BookSiteVisitArgs {
  propertyTitle?: string;
  location?: string;
}

export interface SaveLeadArgs {
  purpose?: string;
}

export interface CalculateEMIArgs {
  principal: number;
  annualRate: number;
  tenureYears: number;
}

export interface FindNearbyAreasArgs {
  location: string;
}

export interface GetServiceDetailsArgs {
  serviceName: string;
}
