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
    const props = await this.prompt([{
      name: 'name',
      message: 'Proposal name',
      default: this.props.name || makeProposalName(path.basename(process.cwd())),
      filter: makeProposalName,
      validate: name => name.length > "proposal-".length
    }, {
      name: 'description',
      message: 'Description',
      when: !this.props.description,
    }, {
      type: 'list',
      name: 'stage',
      message: 'Proposal stage',
      default: 0,
      choices: stages,
      store: true
    }, {
      name: 'homepage',
      message: 'Proposal homepage url',
      when: !this.props.homepage
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: await this.user.git.name(),
      when: !this.props.authorName,
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: await this.user.git.email(),
      when: !this.props.authorEmail,
      store: true
    }, {
      name: 'githubAccount',
      message: 'GitHub username or organization',
      default: await this.user.github.username(),
      when: !this.props.authorUrl
    }]);
    this.props = merge(this.props, props);
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

    const {
      authorName,
      githubAccount,
      stage,
      name,
      description = name,
      homepage = githubAccount ? `https://github.com/${githubAccount}/${name}#readme` : 'about:blank'
    } = this.props;

    const title = description || name;
    const url = homepage || (githubAccount ? `https://github.com/${githubAccount}/${name}#readme` : 'about:blank');

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      { authorName }
    );

    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      { title, authorName, stage }
    );

    this.fs.copyTpl(
      this.templatePath('src/sec-introduction.html'),
      this.destinationPath('src/sec-introduction.html'),
      { url }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { title, stage }
    )
  }

  default() {
    this.composeWith(require.resolve('generator-node/generators/git'), {
      name: this.props.name,
      githubAccount: this.props.githubAccount
    });
  }

  install() {
    this.npmInstall();
  }

  end() {
    this.spawnCommandSync('npm', ['run', 'compile'], {
      cwd: this.destinationPath()
    });
  }
};
