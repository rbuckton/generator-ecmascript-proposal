"use strict";
import Generator = require("yeoman-generator");
import parseAuthor = require("parse-author");
import * as path from "path";
import * as questions from "./questions";
import { kebabCase, isObject, isString, merge, pick } from "lodash";
import { makeProposalName, ProposalProps } from "./core";

class ProposalGenerator extends Generator {
    public props: ProposalProps;
    public pkg: any;

    initializing() {
        this.pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
        this.props = {
            name: this.pkg.name,
            description: this.pkg.description,
            version: this.pkg.version,
            homepage: this.pkg.homepage
        };
        if (isObject(this.pkg.author)) {
            this.props.authorName = this.pkg.author.name;
            this.props.authorEmail = this.pkg.author.email;
            this.props.authorUrl = this.pkg.author.url;
        }
        else if (isString(this.pkg.author)) {
            const author = parseAuthor(this.pkg.author);
            this.props.authorName = author.name;
            this.props.authorEmail = author.email;
            this.props.authorUrl = author.url;
        }
    }

    async prompting() {
        const promptValues = this.config.get("promptValues") || {};
        merge(this.props, promptValues);

        const gitName = await this.user.git.name();
        const gitEmail = await this.user.git.email();
        const githubAccount = await this.user.github.username();
        const answers = await this.prompt([
            ...questions.askIntro(this.props),
            ...questions.askAuthor(this.props, gitName, gitEmail, githubAccount),
            ...questions.askChampion(this.props),
            ...questions.askProposal(this.props, githubAccount),
            ...questions.askTools(this.props)
        ]);

        this.props = merge(this.props, answers);
        merge(promptValues, pick(this.props, [
            "hasChampion",
            "championName",
            "championGithub",
            "githubAccount",
            "spec",
            "stage",
            "sections",
            "build",
            "vscode"
        ]));
        this.config.set("promptValues", promptValues);
    }

    writing() {
        this.pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
        this.pkg = merge({
            name: kebabCase(this.props.name),
            version: "0.0.0",
            private: true,
            description: this.props.description,
            homepage: this.props.homepage,
            author: {
                name: this.props.authorName,
                email: this.props.authorEmail,
                url: this.props.authorUrl
            },
            keywords: ["javascript", "ecmascript"],
            scripts: this.props.build === "gulp" ? {
                    build: "gulp build",
                    start: "gulp start"
                }: {
                    build: "ecmarkup spec.emu > index.html"
                },
            license: "SEE LICENSE IN https://tc39.github.io/ecma262/#sec-copyright-and-software-license",
            devDependencies: this.props.build === "gulp" ? {
                    "ecmarkup": "^3.12",
                    "del": "^2.2.2",
                    "gulp": "^3.9.1",
                    "gulp-emu": "^1.1.0",
                    "gulp-live-server": "0.0.30"
                } : {
                    "ecmarkup": "^3.11.2"
                }
        }, this.pkg);
        this.fs.writeJSON(this.destinationPath("package.json"), this.pkg);

        this.fs.copyTpl(
            this.templatePath("LICENSE"),
            this.destinationPath("LICENSE"),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath("README.md"),
            this.destinationPath("README.md"),
            { ...this.props, sections: new Set(this.props.sections) }
        )

        if (this.props.build === "gulp") {
            this.fs.copy(
                this.templatePath("gulpfile.js"),
                this.destinationPath("gulpfile.js")
            );
            this.fs.copyTpl(
                this.templatePath("spec/index.html"),
                this.destinationPath("spec/index.html"),
                this.props
            );
        }
        else {
            this.fs.copyTpl(
                this.templatePath("spec/index.html"),
                this.destinationPath("spec.md"),
                this.props
            );
        }

        if (this.props.vscode) {
            this.fs.copy(this.templatePath("vscode/extensions.json"), this.destinationPath(".vscode/extensions.json"));
            this.fs.copy(this.templatePath("vscode/settings.json"), this.destinationPath(".vscode/settings.json"));
            this.fs.copyTpl(this.templatePath("vscode/tasks.json"), this.destinationPath(".vscode/tasks.json"), {
                type: this.props.build === "gulp" ? "gulp" : "npm",
                kind: this.props.build === "gulp" ? "task" : "script"
            });
        }

        // TODO: git hooks
    }

    default() {
        this.composeWith(require.resolve("generator-node/generators/git"), {
            name: this.props.name,
            githubAccount: this.props.proposalGithub
        });
    }

    install() {
        this.npmInstall();
    }

    end() {
        this.spawnCommandSync("npm", ["run", "build"], {
            cwd: this.destinationPath()
        });
    }
};

export = ProposalGenerator;