export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Security Tool' | 'CTF Writeup' | 'Research Paper' | 'Security Defense';
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  stars?: number;
  featured: boolean;
  accentColor: string; // hex string for 3D glow accent
  interactiveDemoType: 'cve' | 'ssrf' | 'osint' | 'ctf';
  highlights: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'web-exploitation' | 'tooling' | 'infrastructure' | 'scripting';
  proficiency: number; // 1-100
  iconName: string;
  description: string;
  useCase: string;
  position: [number, number, number]; // 3D coordinates in constellation
  connections: string[]; // Connected skill IDs
}

export interface CTFWriteup {
  id: string;
  title: string;
  event: string;
  category: 'Web' | 'Crypto' | 'Forensics' | 'Linux Privilege Escalation';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  points: number;
  summary: string;
  keyTakeaway: string;
  payloadExample?: string;
  url?: string;
}

export interface TerminalCommandOutput {
  type: 'text' | 'link' | 'error' | 'success' | 'system' | 'json' | 'code';
  content: string;
  url?: string;
}
