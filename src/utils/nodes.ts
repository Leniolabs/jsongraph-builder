import { icons } from "./icons";

export interface NodeItem {
  id: string;
  title: string;
  description: string;
  icon?: keyof typeof icons;
  type: "trigger" | "common" | "output";
}

export interface NodeGroup {
  group: {
    name: string;
    description: string;
  };
  nodes: NodeItem[];
}

export function getNodeById(id: string): NodeItem | undefined {
  for (const group of nodes) {
    const node = group.nodes.find((node) => node.id === id);
    if (node) {
      return node;
    }
  }
}

export const nodes: NodeGroup[] = [
  {
    group: {
      name: "Trigger Nodes",
      description:
        "Nodes that act as entry points for the workflow, initiating the pipeline based on external events.",
    },
    nodes: [
      {
        id: "http_webhook_trigger",
        icon: "webhook",
        type: "trigger",
        title: "HTTP Webhook Trigger",
        description:
          "Starts the flow when an external webhook request is received.",
      },
      {
        id: "file_upload_trigger",
        icon: "file-up",
        type: "trigger",
        title: "File Upload Trigger",
        description:
          "Initiates the pipeline when a file is uploaded to a monitored location.",
      },
      {
        id: "schedule_trigger",
        icon: "calendar-cog",
        type: "trigger",
        title: "Scheduled Trigger",
        description:
          "Executes the workflow at predefined intervals (e.g., daily, hourly).",
      },
      {
        id: "email_received_trigger",
        icon: "mail-warning",
        type: "trigger",
        title: "Email Received Trigger",
        description:
          "Triggers when a new email is received in a specified inbox.",
      },
      {
        id: "database_change_trigger",
        icon: "database",
        type: "trigger",
        title: "Database Change Trigger",
        description:
          "Starts the flow when a change occurs in a monitored database (e.g., new row inserted).",
      },
      {
        id: "message_received_trigger",
        icon: "message-square-plus",
        type: "trigger",
        title: "Message Received Trigger",
        description:
          "Triggers when a new message is received in platforms like Slack, Discord, or WhatsApp.",
      },
      {
        id: "form_submission_trigger",
        icon: "form-input",
        type: "trigger",
        title: "Form Submission Trigger",
        description:
          "Executes the workflow when a form is submitted (e.g., Google Forms, Typeform).",
      },
      {
        id: "api_request_trigger",
        icon: "code",
        type: "trigger",
        title: "API Request Trigger",
        description: "Starts the flow when an API endpoint is called.",
      },
      {
        id: "system_event_trigger",
        icon: "cog",
        type: "trigger",
        title: "System Event Trigger",
        description:
          "Triggers based on predefined system events (e.g., user login, error log entry).",
      },
      {
        id: "rss_feed_update_trigger",
        icon: "rss",
        type: "trigger",
        title: "RSS Feed Update Trigger",
        description:
          "Triggers when a new article or entry is detected in an RSS feed.",
      },
    ],
  },
  {
    group: {
      name: "API Integration Nodes",
      description:
        "Nodes that connect to external services and APIs for data retrieval, updates, and automation.",
    },
    nodes: [
      {
        id: "salesforce_api",
        type: "common",
        title: "Salesforce API",
        description: "Fetch, update, or push data to Salesforce.",
      },
      {
        id: "google_drive_api",
        type: "common",
        title: "Google Drive API",
        description: "Upload, download, or search for files in Google Drive.",
      },
      {
        id: "twilio_api",
        type: "common",
        title: "Twilio API",
        description: "Send SMS or make phone calls via Twilio.",
      },
      {
        id: "openai_api",
        type: "common",
        title: "OpenAI API",
        description:
          "Generate text, summarize, or process natural language using OpenAI.",
      },
    ],
  },
  {
    group: {
      name: "File Processing Nodes",
      description:
        "Nodes for handling files, including downloading, extracting, and transcribing content.",
    },
    nodes: [
      {
        id: "download_file",
        icon: "download",
        type: "common",
        title: "Download File",
        description: "Fetch a file from a URL.",
      },
      {
        id: "extract_audio",
        icon: "file-audio",
        type: "common",
        title: "Extract Audio",
        description: "Convert video files to audio.",
      },
      {
        id: "transcribe_audio",
        icon: "audio-lines",
        type: "common",
        title: "Transcribe Audio",
        description: "Convert audio to text using AI models.",
      },
      {
        id: "extract_text_image",
        icon: "book-image",
        type: "common",
        title: "Extract Text from Image",
        description: "Perform OCR processing to extract text from images.",
      },
    ],
  },
  {
    group: {
      name: "Data Processing Nodes",
      description:
        "Nodes for processing structured and unstructured data, such as parsing, summarizing, and analyzing text.",
    },
    nodes: [
      {
        id: "json_parser",
        icon: "file-json",
        type: "common",
        title: "JSON Parser",
        description: "Parse JSON objects into structured data.",
      },
      {
        id: "csv_parser",
        icon: "table",
        type: "common",
        title: "CSV Parser",
        description: "Convert CSV files into structured data.",
      },
      {
        id: "text_cleanup",
        icon: "text-selection",
        type: "common",
        title: "Text Cleanup",
        description: "Normalize, remove stopwords, and tokenize text.",
      },
      {
        id: "sentiment_analysis",
        icon: "scan-face",
        type: "common",
        title: "Sentiment Analysis",
        description:
          "Analyze text to determine sentiment (positive, negative, neutral).",
      },
    ],
  },
  {
    group: {
      name: "Database & Query Nodes",
      description:
        "Nodes that allow querying and working with structured and unstructured data sources.",
    },
    nodes: [
      {
        id: "sql_query",
        icon: "database-zap",
        type: "common",
        title: "SQL Query",
        description: "Execute SQL queries on a relational database.",
      },
      {
        id: "nosql_query",
        icon: "database-zap",
        type: "common",
        title: "NoSQL Query",
        description:
          "Retrieve and manage data from NoSQL databases like MongoDB.",
      },
      {
        id: "search_engine_query",
        icon: "search-code",
        type: "common",
        title: "Search Engine Query",
        description:
          "Perform searches on engines like Elasticsearch or Algolia.",
      },
    ],
  },
  {
    group: {
      name: "Logic & Transformation Nodes",
      description:
        "Nodes that apply logic, conditions, and data transformations within a workflow.",
    },
    nodes: [
      {
        id: "condition",
        icon: "code",
        type: "common",
        title: "Condition",
        description: "Branch execution based on conditions.",
      },
      {
        id: "regex_extraction",
        icon: "regex",
        type: "common",
        title: "Regex Extraction",
        description:
          "Extract specific patterns from text using regular expressions.",
      },
      {
        id: "data_merge",
        icon: "git-merge",
        type: "common",
        title: "Data Merge",
        description: "Combine multiple data streams into a unified format.",
      },
    ],
  },
  {
    group: {
      name: "Output Nodes",
      description:
        "Nodes that generate, format, and send output from a pipeline.",
    },
    nodes: [
      {
        id: "generate_report",
        icon: "file-text",
        type: "output",
        title: "Generate Report",
        description: "Create a structured report from processed data.",
      },
      {
        id: "send_email",
        icon: "mail-plus",
        type: "output",
        title: "Send Email",
        description: "Dispatch an email with attachments or results.",
      },
      {
        id: "write_to_file",
        icon: "file-pen",
        type: "output",
        title: "Write to File",
        description: "Save results to a file (JSON, CSV, TXT).",
      },
    ],
  },
];

export const nodeTypes = nodes
  .flatMap((group) => group.nodes)
  .map((node) => node.id);

export const usedIcons = nodes.flatMap((group) =>
  group.nodes.map((node) => node.icon)
);

console.log(usedIcons);
