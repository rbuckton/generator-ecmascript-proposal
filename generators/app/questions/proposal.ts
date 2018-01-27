import { ProposalProps } from "../core";
import { Question } from "yeoman-generator";

export const askProposal = (props: ProposalProps, githubAccount: string): Question[] => [
    {
        type: "input",
        name: "proposalGithub",
        message: "GitHub username or organization for repository",
        when: !props.proposalGithub,
        default: ({ authorGithub = props.authorGithub }) => authorGithub || githubAccount,
    },
    {
        name: "homepage",
        message: "Proposal homepage url",
        when: !props.homepage,
        default: ({ proposalGithub = props.proposalGithub, name = props.name }) => proposalGithub ? `https://github.com/${proposalGithub}/${name}#readme` : ""
    },
    {
        name: "spec",
        message: "Specification url",
        when: !props.spec,
        default: ({ proposalGithub = props.proposalGithub, name = props.name }) => proposalGithub ? `https://${proposalGithub}.github.io/${name}` : ""
    },
    {
        type: "list",
        name: "stage",
        message: "Proposal stage",
        default: "0",
        choices: [
            { name: "Strawman (Stage 0)", value: "0" },
            { name: "Proposal (Stage 1)", value: "1" },
            { name: "Draft (Stage 2)", value: "2" },
            { name: "Candidate (Stage 3)", value: "3" },
            { name: "Finished (Stage 4)", value: "4" }
        ]
    },
    {
        type: "checkbox",
        name: "sections",
        message: "Proposal sections",
        choices: [
            { name: "Prior Art", value: "prior-art", checked: true },
            { name: "Syntax", value: "syntax", checked: true },
            { name: "Semantics", value: "semantics", checked: true },
            { name: "Examples", value: "examples", checked: true },
            { name: "API", value: "api", checked: true },
            { name: "Grammar", value: "grammar", checked: true },
            { name: "References", value: "references", checked: true },
            { name: "Prior Discussion", value: "prior-discussion", checked: true }
        ]
    }
];