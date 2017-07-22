<!--
Welcome to your new proposal repository. This document will serve as the introduction and 
 strawman for your proposal.

The repository is broken down into the following layout:

  /README.md        # intro/strawman (this file)
  /LICENSE          # ECMA compatible license (BSD-3 Clause)
  /src              # ecmarkup sources for the specification
  /docs             # ecmarkup output

To build the specification, run:

  npm run compile

To preview the specification, run:

  npm run start

It is recommended that you configure GitHub Pages in your GitHub repository to point to the
'/docs' directory after you push these changes to 'master'. That way the specification text
will be updated automatically when you publish.

-->

# <%=description||name%>

<!-- Replace this with a summary or introduction for your proposal -->

## Status

**Stage:** <%=stage%>  
**Champion:** <%=hasChampion ? championName + (championGithub ? " @(" + championGithub + ")" : "") : "_None identified_"%>

_For more information see the [TC39 proposal process](https://tc39.github.io/process-document/)._

## Authors

* <%=authorName%><%=authorGithub ? " (@" + authorGithub + ")" : ""%>

<%-sections.has("motivations") ? "# Motivations" : "<!-- # Motivations -->"%>

<!-- Motivations and use cases for the proposal --->

<%-sections.has("prior-art") ? "# Prior Art" : "<!-- # Prior Art -->"%>

<!-- Links to similar concepts in existing languages, prior proposals, etc. -->

<%-sections.has("prior-art") ? "" : "<!--"%>
* Language: [Concept](url)  
<%-sections.has("prior-art") ? "" : "-->"%>

<%-sections.has("syntax") ? "# Syntax" : "<!-- # Syntax -->"%>

<!-- Examples of syntax -->

<%-sections.has("syntax") ? "" : "<!--"%>
```js
```
<%-sections.has("syntax") ? "" : "-->"%>

<%-sections.has("semantics") ? "# Semantics" : "<!-- # Semantics -->"%>

<!-- Static and runtime semantics of the proposal -->

<%-sections.has("examples") ? "# Examples" : "<!-- # Examples -->"%>

<!-- Examples of the proposal -->

<%-sections.has("examples") ? "" : "<!--"%>
```js
```
<%-sections.has("examples") ? "" : "-->"%>

<%-sections.has("api") ? "# API" : "<!-- # API -->"%>

<!-- Description of High-level API -->

<%-sections.has("grammar") ? "# Grammar" : "<!-- # Grammar -->"%>

<!-- Grammar for the proposal. Please use grammarkdown (github.com/rbuckton/grammarkdown#readme) 
     syntax in fenced code blocks as grammarkdown is the grammar format used by ecmarkup. -->

<%-sections.has("grammar") ? "" : "<!--"%>
```grammarkdown
```
<%-sections.has("grammar") ? "" : "-->"%>

<%-sections.has("todo") ? "# TODO" : "<!-- # TODO -->"%>

<%-sections.has("todo") ? "" : "<!--"%>
The following is a high-level list of tasks to progress through each stage of the [TC39 proposal process](https://tc39.github.io/process-document/):

### Stage 1 Entrance Criteria

[ ] Identified a "[champion][Champion]" who will advance the addition.  
[ ] [Prose][Prose] outlining the problem or need and the general shape of a solution.  
[ ] Illustrative [examples][Examples] of usage.  
[ ] High-level [API][API].  

### Stage 2 Entrance Criteria

[ ] [Initial specification text][Specification].  
[ ] [Transpiler support][Transpiler] (_Optional_).  

### Stage 3 Entrance Criteria

[ ] [Complete specification text][Specification].  
[ ] Designated reviewers have [signed off][Stage3ReviewerSignOff] on the current spec text.  
[ ] The ECMAScript editor has [signed off][Stage3EditorSignOff] on the current spec text.  

### Stage 4 Entrance Criteria

[ ] [Test262](https://github.com/tc39/test262) acceptance tests have been written for mainline usage scenarios and [merged][Test262PullRequest].  
[ ] Two compatible implementations which pass the acceptance tests: [\[1\]][Implementation1], [\[2\]][Implementation2].  
[ ] A [pull request][Ecma262PullRequest] has been sent to tc39/ecma262 with the integrated spec text.  
[ ] The ECMAScript editor has signed off on the [pull request][Ecma262PullRequest].  

<%-sections.has("todo") ? "" : "-->"%>

<%-sections.has("references") ? "# References" : "<!-- # References -->"%>

<!-- Links to other specifications, etc. -->

<%-sections.has("references") ? "" : "<!--"%>
* [Title](url)
<%-sections.has("references") ? "" : "-->"%>

<%-sections.has("prior-discussion") ? "# Prior Discussion" : "<!-- # Prior Discussion -->"%>

<!-- Links to prior discussion topics on https://esdiscuss.org -->

<%-sections.has("prior-discussion") ? "" : "<!--"%>
* [Subject](https://esdiscuss.org)
<%-sections.has("prior-discussion") ? "" : "-->"%>

<!-- The following are shared links used throughout the README: -->

[Champion]: #status
[Prose]: #motivations
[Examples]: #examples
[API]: #api
[Specification]: <%=spec%>
[Transpiler]: #todo
[Stage3ReviewerSignOff]: #todo
[Stage3EditorSignOff]: #todo
[Test262PullRequest]: #todo
[Implementation1]: #todo
[Implementation2]: #todo
[Ecma262PullRequest]: #todo