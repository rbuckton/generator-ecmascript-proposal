import { ProposalProps, makeProposalName } from "../core";
import { Question } from "yeoman-generator";
import * as path from "path";

export const askIntro = (props: ProposalProps): Question[] => [{
    type: "input",
    name: "name",
    message: "Repository name",
    when: !props.name,
    default: props.name || makeProposalName(path.basename(process.cwd())),
    filter: makeProposalName,
    validate: name => name.length > "proposal-".length
}, {
    type: "input",
    name: "description",
    message: "Description",
    when: !props.description,
}];