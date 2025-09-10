import 'dotenv/config';

export const CONFIG = {
  // Qdrant Configuration
  QDRANT_URL: process.env.QDRANT_URL,
  QDRANT_API_KEY: process.env.QDRANT_API_KEY,
  COLLECTION_NAME: process.env.COLLECTION_NAME || 'knowledge_items',
  
  // OpenAI Configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  EMBEDDING_MODEL: process.env.EMBEDDING_MODEL || 'text-embedding-ada-002',

  // Embedding Configuration
  EMBEDDING_PROVIDER: (process.env.EMBEDDING_PROVIDER || 'fastembed').toLowerCase(),
  EMBEDDING_SERVICE_URL: process.env.EMBEDDING_SERVICE_URL || 'http://127.0.0.1:5000',
  
  UPSERT_BATCH_SIZE: Number(process.env.UPSERT_BATCH_SIZE ?? 64),
  CHUNK_SIZE: Number(process.env.CHUNK_SIZE ?? 1000),
  CHUNK_OVERLAP: Number(process.env.CHUNK_OVERLAP ?? 200)
};

export const SAMPLE_CONTENT = `
AI Agents & Agentic AI: Understanding the Building Blocks and the Orchestrated Whole

The field of artificial intelligence is undergoing a profound shift. We are moving beyond models that simply respond to prompts and toward systems that can proactively pursue goals. This new frontier is dominated by two interconnected concepts: the AI Agent and the broader paradigm of Agentic AI. While these terms are often used interchangeably, understanding the distinction between the individual component (the Agent) and the systemic architecture (Agentic AI) is key to grasping the future of autonomous technology. This essay will define and explore AI agents, delve into the principles of Agentic AI, compare their roles, and discuss the implications of this powerful evolution.

I. The AI Agent: The Autonomous Unit of Action

At its core, an AI Agent is a software program that perceives its environment, makes decisions, and takes actions to achieve specific goals autonomously. Think of it not as a simple tool, but as a digital entity with a degree of independence. A good analogy is a human assistant. You don't tell them every single key to press; you give them a goal—"compile a report on quarterly sales"—and they figure out the steps: gathering data from spreadsheets, analyzing trends, writing summaries, and formatting the document.

The fundamental components of an AI agent are what give it this capability. These are often described in a conceptual loop known as the Perception-Action Cycle, or the "Sense-Think-Act" loop.

1. Perception: This is the agent's ability to receive input from its environment. This environment could be anything: a digital space like a computer desktop, a database, a website, or even the physical world via sensors like cameras or microphones. Perception involves reading files, understanding user prompts, processing visual data, or parsing audio commands.

2. Decision-Making (Cognition): This is the "brain" of the operation. After perceiving the environment and its current state, the agent must process this information. This is where a Large Language Model (LLM) or other AI model typically comes into play. The agent uses its internal model to reason, plan, and decide on the next best action to take to move closer to its goal. It might break a large goal into smaller sub-tasks, evaluate different strategies, or determine that it needs more information.

3. Action: Once a decision is made, the agent must execute it. This involves interacting with its environment. Actions can be digital, such as clicking a button, typing text, calling an API (Application Programming Interface), writing code, or moving a file. In robotics, actions are physical, like moving a motor or activating a gripper.

4. Goal (Optional but crucial): While not always listed as a separate component, the goal is the north star for the agent. It is the objective it strives to achieve. Without a goal, an agent is just a program reacting to stimuli without purpose.

A simple example of an AI agent is a customer service chatbot that goes beyond pre-written answers. It perceives the customer's question, uses an LLM to understand the intent and formulate a thoughtful response (decision-making), and then acts by sending that response back to the user. A more complex agent could be one that is tasked with managing your email inbox. Its goal is to reduce clutter. It perceives new emails, decides which are spam, which are important, and which can be archived, and then acts by moving them to the appropriate folders—all without human intervention.

II. Agentic AI: The Symphony of Orchestrated Intelligence

If an AI Agent is a single skilled musician, then Agentic AI is the conductor and the entire orchestra working in harmony to perform a complex symphony. Agentic AI refers to the overarching design pattern, framework, or system where multiple AI agents work together, often sequentially or hierarchically, to solve complex problems that are beyond the capability of a single agent.

The key principle of Agentic AI is collaboration and specialization. Instead of having one monolithic, gigantic AI model trying to do everything at once (which is often inefficient and error-prone), Agentic AI breaks a problem down and assigns specialized sub-tasks to different agents, each with a specific role and expertise.

There are several common patterns or architectures in Agentic AI systems:

1. The Single Agent Loop: This is the simplest agentic pattern, featuring just one agent operating the Perception-Action Cycle repeatedly until its goal is met. The email management agent described above is an example of this pattern.

2. Multi-Agent Collaboration: This involves multiple agents working together on a problem simultaneously. They can debate ideas, critique each other's work, and combine their strengths to reach a consensus or a superior solution. For instance, a software development team could be simulated with a "Architect Agent" that designs the code structure, a "Programmer Agent" that writes the code, and a "Tester Agent" that looks for bugs and vulnerabilities. They work together, passing the code between them until it meets a quality standard.

3. Sequential or Chain-of-Thought: This is a very common and powerful pattern. One agent's output becomes the next agent's input, creating a chain of reasoning and action. For example, a research task might be handled by:
   - Agent 1 (Researcher): Perceives the query "What are the latest advancements in battery technology?", decides to search the web, and acts by compiling a list of relevant articles and papers.
   - Agent 2 (Analyst): Perceives the compiled research, decides to summarize and extract key points, and acts by writing a draft report.
   - Agent 3 (Editor): Perceives the draft, decides to check for clarity, grammar, and coherence, and acts by polishing the final report.

4. Hierarchical or Manager-Worker: This pattern features a "manager" agent that receives a high-level goal. The manager breaks this goal down into sub-tasks, which it then delegates to specialized "worker" agents. The manager oversees their progress, integrates their results, and handles any errors that arise. This is a robust structure for handling very large and complex projects.

The power of Agentic AI lies in this division of labor. It allows for more complex, multi-step reasoning, improves reliability (if one agent fails, others can compensate), and can leverage different AI models optimized for specific tasks (e.g., one agent for analysis, another for creative writing).

III. Comparison: The Agent vs. The Agentic System

While deeply intertwined, the distinction between an AI Agent and Agentic AI is fundamental. The following comparison highlights their different scopes and purposes.

| Aspect                | AI Agent (The Component)                          | Agentic AI (The System / Paradigm)                |
|-----------------------|---------------------------------------------------|---------------------------------------------------|
| **Scope**             | Individual, autonomous entity.                    | A framework or architecture comprising multiple agents. |
| **Primary Focus**     | Completing a single task or a well-defined goal.  | Solving a complex, multi-faceted problem by breaking it down. |
| **Analogy**           | A single worker with a specific skill.            | An entire company, project team, or supply chain. |
| **Complexity**        | Lower complexity; operates on a Sense-Think-Act loop. | High complexity; involves orchestration, communication, and task management between agents. |
| **Key Ability**       | Autonomy within its defined environment.          | Collaboration, specialization, and workflow management. |
| **Example**           | A chatbot that can look up order status.          | A system where Agent A finds customer info, Agent B analyzes support history, and Agent C drafts a personalized response. |
| **Dependency**        | Can often function as a standalone unit.          | Inherently dependent on the interaction between multiple agents. |

In essence, an AI Agent is the fundamental building block—the atom of autonomy. Agentic AI is the molecule—a more complex structure formed by combining these atoms in specific, powerful ways. You cannot have Agentic AI without AI Agents, but a single AI Agent operating alone is not necessarily an example of a full Agentic AI system.

IV. Implications, Benefits, and Challenges

The move towards agents and agentic systems is not just a technical curiosity; it represents a fundamental shift in how we interact with and leverage artificial intelligence.

Benefits:
- **Handling Complexity:** Agentic AI can tackle problems of immense scale and difficulty, from discovering new drugs by simulating molecular interactions to managing global logistics networks.
- **Efficiency and Automation:** They promise to automate not just simple tasks, but entire multi-step job functions, freeing human workers for more strategic and creative roles.
- **Enhanced Reliability and Quality:** Multi-agent systems can include "checker" or "critic" agents that validate work, leading to higher-quality outputs with fewer errors than a single model might produce.
- **Specialization:** Instead of relying on one general-purpose model, we can use the best model for each specific sub-task, leading to superior overall performance.

Challenges and Considerations:
- **Cost and Resource Intensity:** Running multiple large AI models in sequence or parallel requires significant computational power and can be expensive.
- **Complexity of Management:** Designing, orchestrating, and debugging a system of interacting agents is a significant engineering challenge. Ensuring they communicate effectively and don't get stuck in loops is difficult.
- **Safety and Control:** The more autonomous a system becomes, the harder it is to control. We must develop robust frameworks to ensure these systems remain aligned with human values and intentions. The "alignment problem" becomes more acute.
- **Unpredictability:** The emergent behavior of multiple agents interacting can sometimes be unpredictable, leading to unintended consequences.
- **Security:** A complex agentic system presents a larger "attack surface" for bad actors who might try to manipulate one agent to compromise the entire system.

V. The Future: A Collaborative Horizon

The trajectory of AI is clearly pointing toward greater autonomy. The future will likely involve a seamless collaboration between humans and agentic systems. We will move from being operators of tools to becoming supervisors and directors of digital workforces. We will define high-level objectives—"Develop a new marketing strategy," "Find a cure for this disease," "Optimize our energy grid"—and agentic AI systems will work tirelessly in the background to make it happen.

This future is not about replacing humanity but about augmenting our capabilities to unprecedented levels. The development of AI Agents and Agentic AI marks a pivotal step out of the digital toddlerhood of single-task programs and into a new era of sophisticated, collaborative, and truly intelligent systems. Understanding the distinction and the synergy between the agent and the agentic system is the first step in navigating this exciting and transformative future.
`;