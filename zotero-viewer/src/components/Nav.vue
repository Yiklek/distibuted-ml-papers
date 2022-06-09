<script setup lang="ts">
import { computed, ref } from "vue";
import * as constant from "../constant";
const props = defineProps({
	datas: Array,
})
</script>

<template>
  <p v-if="datas== undefined || datas.length == 0">no data</p>
  <ul class="report combineChildItems" v-else>
    <h1>分布式机器学习论文列表</h1>
    <li v-for="data in datas" :key="data" class="journalArticle">
      <h3><router-link :to="data.path">{{ data.display }}</router-link></h3>
    </li>
  </ul>
</template>

<style>
/**1 */
body {
  background: white;
}

a {
  text-decoration: underline;
}

body {
  padding: 0;
}

ul.report li.item {
  border-top: 4px solid #555;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
  margin-bottom: 2em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

h2 {
  margin: 0 0 0.5em;
}

h2.parentItem {
  font-weight: bold;
  font-size: 1em;
  padding: 0 0 0.5em;
  border-bottom: 1px solid #ccc;
}

/* If combining children, display parent slightly larger */
ul.report.combineChildItems h2.parentItem {
  font-size: 1.1em;
  padding-bottom: 0.75em;
  margin-bottom: 0.4em;
}

h2.parentItem .title {
  font-weight: normal;
}

h3 {
  margin-bottom: 0.6em;
  font-weight: bold !important;
  font-size: 1em;
  display: block;
}

/* Metadata table */
th {
  vertical-align: top;
  text-align: right;
  width: 15%;
  white-space: nowrap;
}

td {
  padding-left: 0.5em;
}

ul.report,
ul.notes,
ul.tags {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

/* Tags */
h3.tags {
  font-size: 1.1em;
}

ul.tags {
  line-height: 1.75em;
  list-style: none;
}

ul.tags li {
  display: inline;
}

ul.tags li:not(:last-child):after {
  content: ", ";
}

/* Child notes */
h3.notes {
  font-size: 1.1em;
}

ul.notes {
  margin-bottom: 1.2em;
}

ul.notes > li:first-child p {
  margin-top: 0;
}

ul.notes > li {
  padding: 0.7em 0;
}

ul.notes > li:not(:last-child) {
  border-bottom: 1px #ccc solid;
}

ul.notes > li p:first-child {
  margin-top: 0;
}

ul.notes > li p:last-child {
  margin-bottom: 0;
}

/* Add quotation marks around blockquote */
ul.notes > li blockquote p:not(:empty):before,
li.note blockquote p:not(:empty):before {
  content: "“";
}

ul.notes > li blockquote p:not(:empty):last-child:after,
li.note blockquote p:not(:empty):last-child:after {
  content: "”";
}

/* Preserve whitespace on plaintext notes */
ul.notes li p.plaintext,
li.note p.plaintext,
div.note p.plaintext {
  white-space: pre-wrap;
}

/* Display tags within child notes inline */
ul.notes h3.tags {
  display: inline;
  font-size: 1em;
}

ul.notes h3.tags:after {
  content: " ";
}

ul.notes ul.tags {
  display: inline;
}

ul.notes ul.tags li:not(:last-child):after {
  content: ", ";
}

/* Child attachments */
h3.attachments {
  font-size: 1.1em;
}

ul.attachments li {
  padding-top: 0.5em;
}

ul.attachments div.note {
  margin-left: 2em;
}

ul.attachments div.note p:first-child {
  margin-top: 0.75em;
}

div table {
  border-collapse: separate;
}

div table td,
div table th {
  /* border: 1px #ccc solid; */
  border-collapse: separate;
  word-break: break-all;
}

div table td p:empty::after,
div table th p:empty::after {
  content: "\00a0";
}

div table td *:first-child,
div table th *:first-child {
  margin-top: 0;
}

div table td *:last-child,
div table th *:last-child {
  margin-bottom: 0;
}
</style>

<style media="screen,projection">
/**2 */
/* Generic styles */
@media screen {
  body {
    font: 62.5% Georgia, Times, serif;
    width: 780px;
    margin: 0 auto;
  }

  h2 {
    font-size: 1.5em;
    line-height: 1.5em;
    font-family: Georgia, Times, serif;
  }

  p {
    line-height: 1.5em;
  }

  a:link,
  a:visited {
    color: #900;
  }

  a:hover,
  a:active {
    color: #777;
  }

  ul.report {
    font-size: 1.4em;
    width: 680px;
    margin: 0 auto;
    padding: 20px 20px;
  }

  /* Metadata table */
  table {
    border: 1px #ccc solid;
    overflow: auto;
    width: 100%;
    margin: 0.1em auto 0.75em;
    padding: 0.5em;
  }
}
</style>


<style media="print">
/*3 */
@media print {
  body {
    font: 12pt "Times New Roman", Times, Georgia, serif;
    margin: 0;
    width: auto;
    color: black;
  }

  /* Page Breaks (page-break-inside only recognized by Opera) */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }

  ul,
  ol,
  dl {
    page-break-inside: avoid;
    color-adjust: exact;
  }

  h2 {
    font-size: 1.3em;
    line-height: 1.3em;
  }

  a {
    color: #000;
    text-decoration: none;
  }
}
</style>