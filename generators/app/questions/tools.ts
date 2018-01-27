import { ProposalProps } from "../core";
import { Question } from "yeoman-generator";

export const askTools = (props: ProposalProps): Question[] => [
    {
        type: "list",
        name: "build",
        message: "Build tool",
        when: props.build === undefined,
        default: "gulp",
        choices: [
            { name: "gulp", value: "gulp" },
            { name: "npm", value: "npm" }
        ]
    },
    {
        type: "confirm",
        name: "vscode",
        message: "Include VSCode settings?",
        default: true,
        when: props.vscode === undefined
    }
];