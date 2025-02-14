# jsongraph-builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

A modern, open-source tool for building JSON graphs through an interactive conversation with a chatbot powered by Langgraph. Using Vite, OpenAI, XYFlow/React, and Dagree, this project dynamically generates a structured graph of nodes and edges, making it easy to visualize and manage complex workflows.

---

## Table of Contents

- [jsongraph-builder](#jsongraph-builder)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Development Server](#development-server)
    - [Building the Project](#building-the-project)
  - [License](#license)

---

## Overview

The **jsongraph-builder** project leverages a simple Langgraph agent (using `createReactAgent`) that triggers a tool to generate a JSON graph structure. The graph consists of nodes and edges represented by the following type:

```typescript
export type IGraph = {
  nodes: {
    id: string;
    nodeId: string;
  }[];
  edges: {
    sourceId: string;
    targetId: string;
  }[];
};
```

These nodes get mapped to a predefined list of nodes, grouped by category, such as **Trigger Nodes**, **API Integration Nodes**, **File Processing Nodes**, **Data Processing Nodes**, **Database & Query Nodes**, **Logic & Transformation Nodes**, and **Output Nodes**.

---

## Tech Stack

- **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling.
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
- **[Langgraph](https://github.com/langchain/langgraph)** - For creating and managing graph-based workflows.
- **[OpenAI](https://openai.com/)** - To power AI features and integrations.
- **[XYFlow/React](https://github.com/xyflow/react)** - For advanced flow management in React.
- **[Dagree](https://www.npmjs.com/package/@dagrejs/dagre)** - For graph layout and visualization.

---

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Leniolabs/jsongraph-builder.git
cd jsongraph-builder
npm install
```

Setup your OPENAI_API_KEY under the .env (copy the .env.example)

---

## Usage

### Development Server

Start the development server with:

```bash
npm run dev
```

This will launch the Vite development server.

### Building the Project

To build the project for deployment:

```bash
docker-compose build
```

---

## License

This project is open source under the [MIT License](./LICENSE).

---

Happy coding!
