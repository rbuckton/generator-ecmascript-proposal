<!--#region:welcome-->
# Note to Author

> TODO: Remove this section before publishing.

Welcome to your new proposal repository. This document will serve as the introduction and explainer
for your proposal.

## Before creating a proposal

Please ensure the following:

  1. You are a member of TC39.
  1. You have read the [process document][Process].
  1. You have reviewed the [existing proposals][Proposals].

## Create your proposal repo

Follow these steps:

<% if (build === "gulp") { %>
  1. Go to your repo settings "Options" page, under "GitHub Pages", and set "Source" to 
    **master branch /docs folder** and click "Save".
    1. Ensure "Issues" is checked.
    1. Also, you probably want to disable "Wiki" and "Projects"
<% } else { %>
  1. Go to your repo settings "Options" page, under "GitHub Pages", and set "Source" to 
    **master branch** and click "Save".
    1. Ensure "Issues" is checked.
    1. Also, you probably want to disable "Wiki" and "Projects"
  1. Avoid merge conflicts with build process output files by running:
      ```sh
      git config --local --add merge.output.driver true
      ```
<% } %>

## Repository organization

The repository contains the following files/directories:

<% if (build === "gulp") { -%>
| Path              | Purpose                                 |
|:------------------|:----------------------------------------|
| /LICENSE          | ECMA compatible license (BSD-3 Clause)  |
| /README.md        | explainer (this file)                   |
| /gulpfile.js      | gulp build file                         |
| /spec             | ecmarkup sources for the specification  |
| /docs             | ecmarkup outputs                        |
<% } else { -%>
| Path              | Purpose                                 |
|:------------------|:----------------------------------------|
| /LICENSE          | ECMA compatible license (BSD-3 Clause)  |
| /README.md        | explainer (this file)                   |
| /spec.emu         | ecmarkup source for the specification   |
| /index.html       | ecmarkup output for the specification   |
<% } -%>

## Maintain your proposal repo

<% if (build === "gulp") { -%>
  1. Remove this "Note to Author" section from README.md.
  1. Make your changes to `spec/index.html`.

To build the specification, run:

```sh
gulp build
```

To preview the specification, run:

```sh
gulp start
```
<% } else { -%>
  1. Remove this "Note to Author" section from README.md.
  1. Make your changes to `spec.md`.
  1. Any commit that makes meaningful changes to the spec should run `npm run build` and commit the 
    resulting output.
  1. Whenever you update `ecmarkup`, run `npm run build` and commit any changes that come from that 
    dependency.
<% } -%>
<!--#endregion:welcome-->

<!--#region:intro-->
# <%= description || name %>

> TODO: Replace this with a summary or introduction for your proposal.
<!--#endregion:intro-->

<!--#region:status-->
## Status

**Stage:** <%= stage %>  
**Champion:** <%= hasChampion ? championName + (championGithub ? " (@" + championGithub + ")" : "") : "_None identified_" %>  

_For detailed status of this proposal see [TODO](#todo), below._  
<!--#endregion:status-->

<!--#region:authors-->
## Authors

* <%= authorName %><%= authorGithub ? " (@" + authorGithub + ")" : "" %>  
<!--#endregion:authors-->

<!--#region:motivations-->
# Motivations

> TODO: Replace this with motivations and use cases for the proposal.
<!--#endregion:motivations-->

<!--#region:prior-art-->
<%- sections.has("prior-art") ? "" : "<!--\n" -%>
# Prior Art 

> TODO: Add links to similar concepts in existing languages, prior proposals, etc.

* Language: [Concept](url)  
<%- sections.has("prior-art") ? "" : "-->\n" -%>
<!--#endregion:prior-art-->

<!--#region:syntax-->
<%- sections.has("syntax") ? "" : "<!--\n" -%>
# Syntax

> TODO: Provide examples of syntax.

```js
```
<%- sections.has("syntax") ? "" : "-->\n" -%>
<!--#endregion:syntax-->

<!--#region:semantics-->
<%- sections.has("semantics") ? "" : "<!--\n" -%>
# Semantics

> TODO: Describe static and runtime semantics of the proposal.
<%- sections.has("semantics") ? "" : "-->\n" -%>
<!--#endregion:semantics-->

<!--#region:examples-->
<%- sections.has("examples") ? "" : "<!--\n" -%>
# Examples

> TODO: Provide examples of the proposal.

```js
```
<%- sections.has("examples") ? "" : "-->\n" -%>
<!--#endregion:examples-->

<!--#region:api-->
<%- sections.has("api") ? "" : "<!--\n" -%>
# API

> TODO: Provide description of High-level API.
<%- sections.has("api") ? "" : "-->\n" -%>
<!--#endregion:api-->

<!--#region:grammar-->
<%- sections.has("grammar") ? "" : "<!--\n" -%>
# Grammar

> TODO: Provide the grammar for the proposal. Please use [grammarkdown][Grammarkdown] syntax in 
> fenced code blocks as grammarkdown is the grammar format used by ecmarkup.

```grammarkdown
```
<%- sections.has("grammar") ? "" : "-->\n" -%>
<!--#endregion:grammar-->

<!--#region:references-->
<%- sections.has("references") ? "" : "<!--\n" -%>
# References

> TODO: Provide links to other specifications, etc.

* [Title](url)  
<%- sections.has("references") ? "" : "-->\n" -%>
<!--#endregion:references-->

<!--#region:prior-discussion-->
<%- sections.has("prior-discussion") ? "" : "<!--\n" -%>
# Prior Discussion

> TODO: Provide links to prior discussion topics on https://esdiscuss.org.

* [Subject](https://esdiscuss.org)  
<%- sections.has("prior-discussion") ? "" : "-->\n" -%>
<!--#endregion:prior-discussion-->

<!--#region:todo-->
# TODO

The following is a high-level list of tasks to progress through each stage of the [TC39 proposal process](https://tc39.github.io/process-document/):

### Stage 1 Entrance Criteria

* [ ] Identified a "[champion][Champion]" who will advance the addition.  
* [ ] [Prose][Prose] outlining the problem or need and the general shape of a solution.  
* [ ] Illustrative [examples][Examples] of usage.  
* [ ] High-level [API][API].  

### Stage 2 Entrance Criteria

* [ ] [Initial specification text][Specification].  
* [ ] [Transpiler support][Transpiler] (_Optional_).  

### Stage 3 Entrance Criteria

* [ ] [Complete specification text][Specification].  
* [ ] Designated reviewers have [signed off][Stage3ReviewerSignOff] on the current spec text.  
* [ ] The ECMAScript editor has [signed off][Stage3EditorSignOff] on the current spec text.  

### Stage 4 Entrance Criteria

* [ ] [Test262](https://github.com/tc39/test262) acceptance tests have been written for mainline usage scenarios and [merged][Test262PullRequest].  
* [ ] Two compatible implementations which pass the acceptance tests: [\[1\]][Implementation1], [\[2\]][Implementation2].  
* [ ] A [pull request][Ecma262PullRequest] has been sent to tc39/ecma262 with the integrated spec text.  
* [ ] The ECMAScript editor has signed off on the [pull request][Ecma262PullRequest].  
<!--#endregion:todo-->

<!--#region:links-->
<!-- The following links are used throughout the README: -->
[Process]: https://tc39.github.io/process-document/
[Proposals]: https://github.com/tc39/proposals/
[Grammarkdown]: http://github.com/rbuckton/grammarkdown#readme
[Champion]: #status
[Prose]: #motivations
[Examples]: #examples
[API]: #api
[Specification]: <%=spec%>

<!-- The following links should be supplied as the proposal advances: -->
[Transpiler]: #todo <!-- TODO: provide link to github PR -->
[Stage3ReviewerSignOff]: #todo <!-- TODO: provide link to github issue -->
[Stage3EditorSignOff]: #todo <!-- TODO: provide link to github issue -->
[Test262PullRequest]: #todo <!-- TODO: provide link to github PR -->
[Implementation1]: #todo <!-- TODO: provide link to github issue -->
[Implementation2]: #todo <!-- TODO: provide link to github issue -->
[Ecma262PullRequest]: #todo <!-- TODO: provide link to github PR -->
<!--#endregion:links-->