'use strict';
const Generator = require('yeoman-generator');
const path = require("path");
const parseAuthor = require('parse-author');
const { kebabCase, isObject, isString, merge } = require("lodash");

function makeProposalName(name) {
  name = kebabCase(name);
  name = name.indexOf("proposal-") === 0 ? name : "proposal-" + name;
  return name;
}

const stages = [
  { name: 'Strawman (0)', value: 0 },
  { name: 'Proposal (1)', value: 1 },
  { name: 'Draft (2)', value: 2 },
  { name: 'Candidate (3)', value: 3 },
  { name: 'Finished (4)', value: 4 }
];

const sections = [
  { name: 'Motivations', value: 'motivations', checked: true },
  { name: 'Prior Art', value: 'prior-art', checked: true },
  { name: 'Syntax', value: 'syntax', checked: true },
  { name: 'Semantics', value: 'semantics', checked: true },
  { name: 'Examples', value: 'examples', checked: true },
  { name: 'API', value: 'api', checked: true },
  { name: 'Grammar', value: 'grammar', checked: true },
  { name: 'TODO', value: 'todo', checked: true },
  { name: 'References', value: 'references', checked: true },
  { name: 'Prior Discussion', value: 'prior-discussion', checked: true }
];

module.exports = class extends Generator {
  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
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
    const gitName = await this.user.git.name();
    const gitEmail = await this.user.git.email();
    const githubAccount = await this.user.github.username();
    const answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Repository name',
      default: this.props.name || makeProposalName(path.basename(process.cwd())),
      filter: makeProposalName,
      validate: name => name.length > "proposal-".length
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      when: !this.props.description,
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author\'s Name',
      default: gitName,
      when: !this.props.authorName,
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: gitEmail,
      when: !this.props.authorEmail,
      store: true
    }, {
      name: 'authorGithub',
      message: 'Author\'s GitHub Account',
      default: githubAccount,
      when: !this.props.authorGithub,
      store: true
    }, {
      type: 'confirm',
      name: 'hasChampion',
      message: 'Has a champion been identified?',
      when: !this.props.hasChampion,
      store: true,
    }, {
      type: 'input',
      name: 'championName',
      message: 'Champion\'s name',
      when: ({ hasChampion = this.props.hasChampion }) => !this.props.championName && hasChampion,
      default: ({ authorName = this.props.authorName }) => authorName,
      store: true
    }, {
      type: 'input',
      name: 'championGithub',
      message: 'Champion\'s GitHub account',
      when: ({ hasChampion = this.props.hasChampion }) => !this.props.championGitHub && hasChampion,
      default: ({ authorGithub = this.props.authorGithub }) => authorGithub,
      store: true
    }, {
      type: 'input',
      name: 'githubAccount',
      message: 'GitHub username or organization for repository',
      when: !this.props.githubAccount,
      default: ({ authorGithub = this.props.authorGithub}) => authorGithub || githubAccount,
    }, {
      name: 'homepage',
      message: 'Proposal homepage url',
      when: !this.props.homepage,
      default: ({ githubAccount = this.props.githubAccount, name = this.props.name }) => githubAccount ? `https://github.com/${githubAccount}/${name}#readme` : '',
      store: true
    }, {
      name: 'spec',
      message: 'Specification url',
      when: !this.props.spec,
      default: ({ githubAccount = this.props.githubAccount, name = this.props.name }) => githubAccount ? `https://${githubAccount}.github.io/${name}` : '',
      store: true
    }, {
      type: 'list',
      name: 'stage',
      message: 'Proposal stage',
      default: 0,
      choices: stages,
      store: true
    }, {
      type: 'checkbox',
      name: 'sections',
      message: 'Proposal sections',
      choices: sections,
      filter: result => new Set(result),
      store: true
    }]);
    this.props = merge(this.props, answers);
  }

  writing() {
    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    pkg = merge({
      name: kebabCase(this.props.name),
      version: '0.0.0',
      private: true,
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      keywords: ["javascript", "ecmascript"],
      scripts: {
        compile: "gulp build",
        start: "gulp start"
      },
      license: "SEE LICENSE IN https://tc39.github.io/ecma262/#sec-copyright-and-software-license",
      devDependencies: {
        "del": "^2.2.2",
        "ecmarkup": "^3.11.2",
        "gulp": "^3.9.1",
        "gulp-emu": "^1.1.0",
        "gulp-live-server": "0.0.30"
      }
    }, pkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copy(
      this.templatePath('vscode'),
      this.destinationPath('.vscode')
    );

    this.fs.copy(
      this.templatePath('docs'),
      this.destinationPath('docs')
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/sec-introduction.html'),
      this.destinationPath('src/sec-introduction.html'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    )
  }

  default() {
    this.composeWith(require.resolve('generator-node/generators/git'), {
      name: this.props.name,
      githubAccount: this.props.githubAccount
    });
  }

  install() {
    // this.npmInstall();
  }

  end() {
    // this.spawnCommandSync('npm', ['run', 'compile'], {
    //   cwd: this.destinationPath()
    // });
  }
};
