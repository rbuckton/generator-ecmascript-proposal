import { kebabCase } from "lodash";

export function makeProposalName(name: string) {
    name = kebabCase(name);
    name = name.startsWith("proposal-") ? name : "proposal-" + name;
    return name;
}

export interface ProposalProps {
    name?: string,
    description?: string,
    version?: string,
    homepage?: string
    authorName?: string;
    authorEmail?: string;
    authorUrl?: string;
    authorGithub?: string;
    hasChampion?: boolean;
    championName?: string;
    championGithub?: string;
    proposalGithub?: string;
    spec?: string;
    sections?: string[] | Set<string>;
    build?: string;
    vscode?: boolean;
}