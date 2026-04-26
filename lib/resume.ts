import { readFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";

export type ResumeContact = {
  label: string;
  href?: string;
  icon: string;
};

export type ResumeCompetency = {
  label: string;
  value: string;
  icon: string;
};

export type ResumeExperience = {
  role: string;
  companyLine: string;
  bullets: string[];
  current?: boolean;
};

export type ResumeEducation = {
  school: string;
  credential: string;
  details: string;
};

export type ParsedResume = {
  name: string;
  contact: ResumeContact[];
  competencies: ResumeCompetency[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  interests: string[];
};

type LatexCommand = {
  args: string[];
  start: number;
  end: number;
};

const competencyIcons: Record<string, string> = {
  "Engineering Leadership": "psychology",
  Languages: "code",
  "Frameworks & Libraries": "layers",
  "Architecture & Systems": "architecture",
  "Reliability & Operations": "monitoring",
  "Cloud & DevOps": "cloud",
  "ML & AI": "bolt",
};

function findMatchingBrace(input: string, openIndex: number) {
  let depth = 0;

  for (let index = openIndex; index < input.length; index += 1) {
    if (input[index] === "\\" && index + 1 < input.length) {
      index += 1;
      continue;
    }

    if (input[index] === "{") {
      depth += 1;
    }

    if (input[index] === "}") {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function readBraceGroup(input: string, openIndex: number) {
  const closeIndex = findMatchingBrace(input, openIndex);

  if (closeIndex === -1) {
    return null;
  }

  return {
    value: input.slice(openIndex + 1, closeIndex),
    end: closeIndex + 1,
  };
}

function readCommandArgs(input: string, command: string, start: number): LatexCommand | null {
  let commandStart = input.indexOf(`\\${command}`, start);

  while (commandStart !== -1) {
    const nextCharacter = input[commandStart + command.length + 1];

    if (!nextCharacter || !/[A-Za-z]/.test(nextCharacter)) {
      break;
    }

    commandStart = input.indexOf(`\\${command}`, commandStart + 1);
  }

  if (commandStart === -1) {
    return null;
  }

  const args: string[] = [];
  let cursor = commandStart + command.length + 1;

  while (input[cursor] && /\s/.test(input[cursor])) {
    cursor += 1;
  }

  while (input[cursor] === "{") {
    const group = readBraceGroup(input, cursor);

    if (!group) {
      break;
    }

    args.push(group.value);
    cursor = group.end;

    while (input[cursor] && /\s/.test(input[cursor])) {
      cursor += 1;
    }
  }

  return {
    args,
    start: commandStart,
    end: cursor,
  };
}

function readAllCommands(input: string, command: string) {
  const commands: LatexCommand[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    const nextCommand = readCommandArgs(input, command, cursor);

    if (!nextCommand) {
      break;
    }

    commands.push(nextCommand);
    cursor = nextCommand.end;
  }

  return commands;
}

function getSection(input: string, name: string) {
  const sectionStart = input.indexOf(`\\section{${name}}`);

  if (sectionStart === -1) {
    return "";
  }

  const nextSection = input.indexOf("\\section{", sectionStart + 1);

  return input.slice(sectionStart, nextSection === -1 ? undefined : nextSection);
}

function decodeLatex(input: string) {
  return input
    .replace(/%.*$/gm, "")
    .replace(/\\href\{([^{}]*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, "$2")
    .replace(/\\textbf\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, "$1")
    .replace(/\\textit\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, "$1")
    .replace(/\\small\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, "$1")
    .replace(/\\small/g, "")
    .replace(/\\scshape/g, "")
    .replace(/\\Huge/g, "")
    .replace(/\\fa[A-Za-z]+/g, "")
    .replace(/\\\\(?:\[[^\]]*\])?/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\\textasciitilde\{\}/g, "~")
    .replace(/\\&/g, "&")
    .replace(/\\%/g, "%")
    .replace(/---/g, "-")
    .replace(/--/g, "-")
    .replace(/–/g, "-")
    .replace(/~/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getHref(input: string) {
  const match = input.match(/\\href\{([^{}]+)\}/);
  return match?.[1];
}

function parseHeading(input: string) {
  const centerMatch = input.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/);
  const heading = centerMatch?.[1] ?? "";
  const lines = heading
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const name = decodeLatex(lines[0] ?? "Muhammad Anwer").replace(/\\\\.*$/, "").trim();
  const contactLine = lines.slice(1).join(" ");
  const contactParts = contactLine
    .split(/\$\\mid\$/)
    .map((part) => part.replace(/^\\;|\\;$/g, "").trim())
    .filter(Boolean);

  const contact = contactParts.map((part) => {
    const label = decodeLatex(part);
    const href = getHref(part);

    if (part.includes("faPhone")) {
      return { label, icon: "phone" };
    }

    if (part.includes("faEnvelope")) {
      return { label, href, icon: "mail" };
    }

    if (part.includes("faLinkedin")) {
      return { label, href, icon: "open_in_new" };
    }

    if (part.includes("faGithub")) {
      return { label, href, icon: "open_in_new" };
    }

    return { label, href, icon: "open_in_new" };
  });

  return { name, contact };
}

function parseCompetencies(input: string) {
  return readAllCommands(getSection(input, "Core Competencies"), "resumeItem").map((item) => {
    const decoded = decodeLatex(item.args[0] ?? "");
    const [label = "Competency", ...valueParts] = decoded.split(":");
    const normalizedLabel = label.trim();

    return {
      label: normalizedLabel,
      value: valueParts.join(":").trim(),
      icon: competencyIcons[normalizedLabel] ?? "code",
    };
  });
}

function parseExperience(input: string) {
  const section = getSection(input, "Professional Experience");
  const headings = readAllCommands(section, "resumeSubheading");

  return headings.map((heading, index) => {
    const nextHeading = headings[index + 1];
    const body = section.slice(heading.end, nextHeading?.start);
    const [role = "", dates = "", company = "", location = ""] = heading.args.map(decodeLatex);
    const bullets = readAllCommands(body, "resumeItem").map((item) => decodeLatex(item.args[0] ?? ""));

    return {
      role,
      companyLine: [company, location, dates].filter(Boolean).join(" | "),
      bullets,
      current: /present/i.test(dates),
    };
  });
}

function parseEducation(input: string) {
  const section = getSection(input, "Education");

  return readAllCommands(section, "resumeSubheading").map((heading) => {
    const [school = "", dates = "", credential = "", location = ""] = heading.args.map(decodeLatex);

    return {
      school,
      credential,
      details: [location, dates].filter(Boolean).join(" | "),
    };
  });
}

function parseInterests(input: string) {
  return readAllCommands(getSection(input, "Interests \\& Affiliations"), "resumeItem").map((item) =>
    decodeLatex(item.args[0] ?? ""),
  );
}

export async function getResumeFromTex(): Promise<ParsedResume> {
  noStore();

  const resumePath = path.join(process.cwd(), "public", "resume.tex");
  const tex = await readFile(resumePath, "utf8");
  const heading = parseHeading(tex);

  return {
    name: heading.name,
    contact: heading.contact,
    competencies: parseCompetencies(tex),
    experience: parseExperience(tex),
    education: parseEducation(tex),
    interests: parseInterests(tex),
  };
}
