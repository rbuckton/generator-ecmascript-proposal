import { ProposalProps } from "../core";
import { Question } from "yeoman-generator";

export const askChampion = (props: ProposalProps): Question[] => [{
    type: "confirm",
    name: "hasChampion",
    message: "Has a champion been identified?",
    when: !props.hasChampion,
}, {
    type: "input",
    name: "championName",
    message: "Champion\'s name",
    when: ({ hasChampion = props.hasChampion }) => hasChampion && !props.championName,
    default: ({ authorName = props.authorName }) => authorName
}, {
    type: "input",
    name: "championGithub",
    message: "Champion\'s GitHub account",
    when: ({ hasChampion = props.hasChampion }) => hasChampion && !props.championGithub,
    default: ({ authorGithub = props.authorGithub }) => authorGithub
}];