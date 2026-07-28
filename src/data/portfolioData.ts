import { Project, SkillNode, CTFWriteup } from '../types';

export const VIVEK_INFO = {
  name: "Vivek Bhandari",
  title: "Web Application Security Researcher",
  subtitle: "Bug Bounty Hunter & Security Researcher",
  bio: "Cybersecurity researcher focused on offensive web security, vulnerability discovery, SSRF/LFI payload sanitization, and OAuth/API protocol flaw analysis. Active CTF player with competitive team background and bug bounty hunter.",
  email: "vivekbhandari.sec@gmail.com",
  github: "https://github.com/vivekbhandarisec",
  linkedin: "https://www.linkedin.com/in/vivekbhandarisec/",
  resume: "https://vivekbhandarisec.github.io/security/resume.pdf",
  location: "Global / Remote",
  status: "Available for Security Audits & Advisory",
  team: "Team Void-Walkers (CTF)",
  stats: [
    { label: "Team Global Rank", value: "Top 60 Worldwide" },
    { label: "Vulnerabilities Identified", value: "50" },
    { label: "Responsible Disclosures", value: "10" },
    { label: "Security Tools Built", value: "5+" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "exploit-feed",
    title: "Exploit Feed",
    tagline: "Real-time Cybersecurity RSS Intelligence Bot",
    category: "Security Tool",
    description: "A zero-maintenance Telegram bot that aggregates top cybersecurity RSS feeds, intelligently removes duplicate stories, generates concise AI-powered summaries using Groq's LLaMA 3.1, and delivers a clean daily cybersecurity briefing automatically every morning. Runs entirely on GitHub Actions with no dedicated server or infrastructure costs.",
    longDescription: "Exploit Feed is an automated threat intelligence pipeline. It aggregates cybersecurity news, vendor advisories, and CVE releases into Telegram. Using Groq's LLaMA 3.1 model, it deduplicates articles and generates clean daily summaries, operating cost-free via scheduled GitHub Actions workflows.",
    tags: ["Python", "Groq LLaMA 3.1", "Telegram Bot", "GitHub Actions", "RSS Feed"],
    githubUrl: "https://github.com/vivekbhandarisec",
    featured: true,
    accentColor: "#FF5E5B", // Electric Coral
    interactiveDemoType: "cve",
    highlights: [
      "Zero server cost deployment powered by GitHub Actions cron triggers",
      "LLaMA 3.1 AI summarization & intelligent duplicate story filtering",
      "Automated Telegram channel broadcast every morning"
    ]
  },
  {
    id: "urlpathguard",
    title: "URLPathGuard",
    tagline: "High-Performance URL Path Normalization & SSRF Defense",
    category: "Security Defense",
    description: "A lightweight, robust security middleware designed to mitigate SSRF, Path Traversal, and LFI attacks through strict canonical path resolution and RFC-compliant URL parsing.",
    longDescription: "URLPathGuard prevents server-side request forgery (SSRF) and local file inclusion (LFI) by sanitizing nested URL encodings, Unicode normalization tricks, dot-dot-slash variations, and DNS rebinding vectors before request execution.",
    tags: ["Python", "Go", "SSRF Defense", "Middleware", "OWASP Top 10"],
    githubUrl: "https://github.com/vivekbhandarisec",
    featured: true,
    accentColor: "#00F0FF", // Ice Blue
    interactiveDemoType: "ssrf",
    highlights: [
      "Prevents double URL-encoding bypasses & directory traversal",
      "Built-in private IP range (RFC 1918 / 6598) blocklists for SSRF prevention",
      "Zero-latency overhead benchmarked under high throughput"
    ]
  },
  {
    id: "zerostalker",
    title: "ZeroStalker",
    tagline: "Automated OSINT & Attack Surface Reconnaissance Engine",
    category: "Security Tool",
    description: "A modular, stealthy OSINT tool that maps organization subdomains, exposed cloud buckets, CORS misconfigurations, and leaked API endpoints during scope discovery.",
    longDescription: "ZeroStalker orchestrates passive DNS enumeration, certificate transparency log searching, reverse IP lookup, and endpoint discovery into a structured attack surface graph. Designed specifically for Bug Bounty recon and initial penetration testing phases.",
    tags: ["Python", "Nuclei", "Subdomain Recon", "CORS Audit", "OSINT"],
    githubUrl: "https://github.com/vivekbhandarisec",
    featured: true,
    accentColor: "#6366F1", // Deep Indigo
    interactiveDemoType: "osint",
    highlights: [
      "Multi-threaded subdomain brute forcing & CT-log scraping",
      "CORS misconfiguration & origin reflection validator",
      "Exportable JSON/Graph reports for instant report filing"
    ]
  },
  {
    id: "bandit-solutions",
    title: "OverTheWire Bandit Writeups",
    tagline: "Comprehensive Linux Privilege Escalation & Security Labs",
    category: "CTF Writeup",
    description: "In-depth technical breakdown and level-by-level solution repository for OverTheWire Bandit, covering Linux permissions, SSH key chains, grep/awk scripting, and privilege escalation.",
    longDescription: "A complete laboratory guide to mastering Linux command-line security basics, shell escaping, setuid binaries, cronjob exploits, and local networking security fundamentals required for competitive CTF competitions.",
    tags: ["Linux", "Bash", "SSH", "PrivEsc", "OverTheWire"],
    githubUrl: "https://github.com/vivekbhandarisec",
    featured: false,
    accentColor: "#38BDF8",
    interactiveDemoType: "ctf",
    highlights: [
      "34 levels fully documented with root causes & mitigation notes",
      "Custom Bash automation scripts for credential retrieval",
      "Essential foundation for web security researchers & CTF beginners"
    ]
  },
  {
    id: "voidwalkers-ctf",
    title: "Team Void-Walkers CTF Writeups",
    tagline: "Advanced Web Exploitation & Protocol Flaw Analysis",
    category: "CTF Writeup",
    description: "Battle-tested writeups from major CTF events detailing complex web vulnerabilities, OAuth state bypasses, JWT signature forgery, and blind SQL injection payloads.",
    longDescription: "Curated collection of CTF challenge solutions crafted for Team Void-Walkers in international security competitions. Includes custom exploit scripts, HTTP request chains, and cryptographic bypass analyses.",
    tags: ["Web Exploitation", "OAuth 2.0", "JWT Bypass", "Blind SQLi", "CTF"],
    githubUrl: "https://github.com/vivekbhandarisec",
    featured: false,
    accentColor: "#FF5E5B",
    interactiveDemoType: "ctf",
    highlights: [
      "Breakdowns of OAuth state parameter & redirect URI poisoning",
      "Custom Python scripts for race condition exploitation",
      "High-value CTF flag capture proofs & vulnerability remediation"
    ]
  }
];

export const SKILL_NODES: (SkillNode & { commandExample: string })[] = [
  {
    id: "burp-suite",
    name: "Burp Suite Community Edition",
    category: "tooling",
    proficiency: 95,
    iconName: "ShieldAlert",
    description: "Industry-standard web security testing framework used for intercepting HTTP traffic, extensions, and manual payload construction.",
    useCase: "Web app security audits, API proxying, custom Turbo Intruder race condition attacks.",
    commandExample: "turbo-intruder --target https://auth.target.com/api/v1/oauth --concurrent 50 --race",
    position: [0, 0, 0],
    connections: ["owasp-top-10", "nuclei", "python", "fastapi"]
  },
  {
    id: "owasp-top-10",
    name: "OWASP Top 10",
    category: "web-exploitation",
    proficiency: 98,
    iconName: "Flame",
    description: "Core security vulnerability standard covering Injection, Broken Auth, SSRF, IDOR, Security Misconfig, and Cryptographic Failures.",
    useCase: "Targeted bug bounty research, risk assessment, and mitigation design.",
    commandExample: "GET /api/v1/user?id=1024' OR '1'='1 --header 'X-Forwarded-For: 127.0.0.1'",
    position: [1.8, 1.2, -0.5],
    connections: ["burp-suite", "fastapi", "linux", "oauth"]
  },
  {
    id: "python",
    name: "Python 3",
    category: "scripting",
    proficiency: 92,
    iconName: "Code2",
    description: "Primary language for custom exploit weaponization, automated recon scripts, and security tooling development.",
    useCase: "Building Exploit Feed, ZeroStalker, and async HTTP exploit chains.",
    commandExample: "python3 exploit.py --target https://vulnerable-api.internal --payload ssrf_bypass.json",
    position: [-1.8, 1.5, 0.4],
    connections: ["fastapi", "burp-suite", "docker", "git"]
  },
  {
    id: "linux",
    name: "Linux Security & SysAdmin",
    category: "infrastructure",
    proficiency: 94,
    iconName: "Terminal",
    description: "Deep knowledge of Linux kernel permissions, setuid binaries, systemd, networking stack, and OverTheWire Bandit mastery.",
    useCase: "Server hardening, privilege escalation analysis, terminal tool execution.",
    commandExample: "find / -type f -perm -04000 -ls 2>/dev/null # Inspect SETUID Binaries",
    position: [-1.5, -1.2, -0.8],
    connections: ["docker", "python", "wireshark", "git"]
  },
  {
    id: "nuclei",
    name: "Nuclei Engine",
    category: "tooling",
    proficiency: 90,
    iconName: "Zap",
    description: "Fast, customizable vulnerability scanner using YAML template-based security testing.",
    useCase: "Large-scale bug bounty scanning and custom vulnerability template creation.",
    commandExample: "nuclei -u https://target.com -t templates/cves/2024/ -rate-limit 100",
    position: [1.6, -1.4, 0.6],
    connections: ["burp-suite", "linux", "docker"]
  },
  {
    id: "docker",
    name: "Docker Containerization",
    category: "infrastructure",
    proficiency: 88,
    iconName: "Box",
    description: "Isolated laboratory setup for testing exploits, deploying vulnerable CTF boxes, and tool distribution.",
    useCase: "Sandboxed exploit execution and reproducible security tool deployment.",
    commandExample: "docker run -rm -it --net=host --cap-drop=ALL sec-lab/ssrf-auditor:latest",
    position: [-2.2, -0.2, 1.2],
    connections: ["linux", "python", "git"]
  },
  {
    id: "fastapi",
    name: "FastAPI / Web APIs",
    category: "scripting",
    proficiency: 86,
    iconName: "Server",
    description: "High-performance Python backend framework used to create security intelligence APIs and microservices.",
    useCase: "Building Exploit Feed REST endpoints and real-time security dashboards.",
    commandExample: "uvicorn app.main:app --host 0.0.0.0 --port 3000 --workers 4",
    position: [0.8, 2.2, -1.0],
    connections: ["python", "burp-suite", "owasp-top-10"]
  },
  {
    id: "git",
    name: "Git & Version Control",
    category: "scripting",
    proficiency: 90,
    iconName: "GitBranch",
    description: "Code architecture, open-source repository maintenance, and collaborative security research.",
    useCase: "Maintaining open-source tools on GitHub (github.com/vivekbhandarisec).",
    commandExample: "git log -p -S 'AWS_SECRET' --pickaxe-regex # Audit Leaked Credentials",
    position: [-0.6, 2.0, 1.0],
    connections: ["python", "docker", "linux"]
  },
  {
    id: "wireshark",
    name: "Wireshark / PCAP",
    category: "tooling",
    proficiency: 85,
    iconName: "Activity",
    description: "Network packet dissection, protocol analysis, and traffic inspection.",
    useCase: "CTF Forensics, raw packet inspection, and unencrypted protocol payload extraction.",
    commandExample: "tshark -r capture.pcap -Y 'http.request.method == POST' -T fields -e http.file_data",
    position: [2.2, 0.2, -1.4],
    connections: ["linux", "burp-suite"]
  },
  {
    id: "oauth",
    name: "OAuth 2.0 & JWT",
    category: "web-exploitation",
    proficiency: 92,
    iconName: "KeyRound",
    description: "Authentication and authorization protocol analysis, token manipulation, and redirect URI poisonings.",
    useCase: "Discovering OAuth implementation bugs in high-severity bug bounty targets.",
    commandExample: "jwt_tool HEADER.PAYLOAD.SIGNATURE -X b --tamper 'role=admin'",
    position: [0.2, -2.1, -0.4],
    connections: ["owasp-top-10", "burp-suite"]
  }
];

export const CTF_WRITEUPS: CTFWriteup[] = [
  {
    id: "oauth-state-bypass",
    title: "OAuth 2.0 CSRF State Parameter & Redirect Poisoning",
    event: "Void-Walkers Internal CTF",
    category: "Web",
    difficulty: "Hard",
    points: 450,
    summary: "Exploiting an improperly validated state parameter combined with open redirect to hijack authorization codes and account takeovers.",
    keyTakeaway: "Always bind OAuth state parameters to cryptographically signed session cookies with strict SameSite attribute enforcement.",
    payloadExample: "https://auth.target.com/authorize?response_type=code&client_id=123&redirect_uri=https://attacker.com/callback&state=SIGNED_TOKEN"
  },
  {
    id: "bandit-overthewire",
    title: "OverTheWire Bandit: Levels 0 to 34 Detailed Walkthrough",
    event: "OverTheWire Wargames",
    category: "Linux Privilege Escalation",
    difficulty: "Medium",
    points: 500,
    summary: "Comprehensive guide covering file permissions, base64 decoding, SSL communication, cron exploits, setuid binaries, and Git history inspection.",
    keyTakeaway: "Linux security requires mastery of find flags, file permission bits, and environment variable manipulation.",
    payloadExample: "find / -user bandit26 -group bandit25 -size 33c 2>/dev/null"
  },
  {
    id: "ssrf-to-aws-metadata",
    title: "Blind SSRF to AWS IMDSv1 Metadata Extraction",
    event: "Web Security Cup 2025",
    category: "Web",
    difficulty: "Hard",
    points: 480,
    summary: "Bypassing naive IP blacklists using decimal IP encoding (2130706433) to query AWS metadata service http://169.254.169.254 and exfiltrate IAM role tokens.",
    keyTakeaway: "Enforce AWS IMDSv2 session tokens and validate parsed destination IPs after canonical name resolution.",
    payloadExample: "http://2130706433/latest/meta-data/iam/security-credentials/"
  }
];
