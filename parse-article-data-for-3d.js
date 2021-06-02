const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const he = require('he');

// Create reference instance
const marked = require('marked');

// Override function
const renderer = {
  heading(text, level) {
    return `{ "type": "header", "data": { "headerLevel": "${level}", "headerText": "${he.decode(
      text
    )}" } },`;
  },
  image(href, title, text) {
    return `{ "type": "image", "data": { "imageUrl": "${href}" } },`;
  },
  code(code) {
    return `{ "type": "codeblock", "data": { "code": "${code}" } },`;
  },
  paragraph(text) {
    try {
      parsedJson = JSON.parse(text.slice(0, text.lastIndexOf(',')));
    } catch (error) {
      if (text === '') return '';
      return `{ "type": "paragraph", "data": { "text": "${he.decode(
        text
      )}" } },`;
    }
    // json parsing worked
    if (parsedJson['type']) {
      if (parsedJson.type == 'image') {
        return `{ "type": "image", "data": { "imageUrl": "${parsedJson.data.imageUrl}" } },`;
      }
    }
    return '';
  },
  link(href, title, text) {
    return text;
  },
  html(html) {
    // return html
    return '';
  },
  list(list) {
    // return `{ "type": "list", "data": { "list": "${list}" } },`;
    return ''; // fix later
  },
  listitem(text) {
    return `{ "type": "listitem", "data": { "listitem": "${text}" } },`;
  },
  em(text) {
    return text;
  },
  br(src) {
    return '';
  },
  emStrong(src, maskedSrc, prevChar) {
    return src;
  },
  strong(text) {
    return text;
  },
  codespan(src) {
    return src;
  },
  code(code, infostring, escaped) {
    if (infostring !== 'sh')
      return '{ "type": "paragraph", "data": { "text": "TO DO: This should be a block of code. Jason hasn\'t implemented this yet. :(" } },';
    return `{ "type": "codeblock", "data": { "code": "${code}" } },`;
  },
};

getArticleData = (filePath, articleDir) => {
  let fileContent = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

  const meta = matter(fileContent);

  renderer.image = (href, title, text) => {
    return `{ "type": "image", "data": { "imageUrl": "/articles/${articleDir}/${href}" } },`;
  };

  let interpretedContent = marked(meta.content);

  // get rid of final comma
  interpretedContent = interpretedContent.slice(
    0,
    interpretedContent.lastIndexOf(',')
  );

  // add the brackets to make this bad boy an official json array
  let jsonArray = '[' + interpretedContent + ']';

  // handle newline and other escape characters
  // jsonArray = jsonArray.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
  jsonArray = jsonArray
    .replace(/\n/g, ' ')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');

  let articleData = {};
  articleData.title = meta.data.title;
  articleData.author = meta.data.author;
  articleData.date = meta.data.date;
  articleData.graphic = meta.data.graphic;
  articleData.content = JSON.parse(jsonArray);

  return articleData;
};

marked.use({ renderer });

let articleDataArray = [];

var dirs = fs.readdirSync(path.join(__dirname, 'contents', 'articles'));
dirs.forEach(dir => {
  dirPath = path.join(__dirname, 'contents', 'articles', dir);
  if (fs.lstatSync(dirPath).isDirectory())
    articleDataArray.push(getArticleData(path.join(dirPath, 'index.md'), dir));
});

let outfilePath = path.join(__dirname, 'src-3d', 'article-data.json');
fs.writeFile(outfilePath, JSON.stringify(articleDataArray, null, 2), () => {});
