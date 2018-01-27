import { ProposalProps } from "../core";
import { Question } from "yeoman-generator";

export const askAuthor = (props: ProposalProps, gitName: string, gitEmail: string, githubAccount: string): Question[] => [{
    type: "input",
    name: "authorName",
    message: "Author\'s Name",
    when: !props.authorName,
    default: gitName,
    store: true
}, {
    name: "authorEmail",
    message: "Author\'s Email",
    when: !props.authorEmail,
    default: gitEmail,
    store: true
}, {
    name: "authorGithub",
    message: "Author\'s GitHub Account",
    when: !props.authorGithub,
    default: githubAccount,
    store: true
}];