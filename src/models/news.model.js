const cheerio = require('cheerio'); // librería para hacer scrapping
const fetch = require('sync-fetch'); // librería para leer la web
let newsModel = {};

const url = "https://www.tarreo.com";

newsModel.getNews = async () => {
  const $ = cheerio.load(fetch(url + '/noticias').text());
  let news = [];
  
  // por cada noticia obtenemos su titulo, descripción y fecha de publicación
  $('div.content').has('.elementHeader').has('p').map((i, el) => {
    news.push({
      "uid": `NOTICIA_${i+1}`,
      "updateDate": $(el).find('time').attr('datetime'),
      "titleText": $(el).find('a.rC').attr('title'),
      "mainText": $(el).find('a.rC').attr('title').trim() + '. ' + $(el).find('.elementIntro').text().trim(),
      "redirectionUrl": url + $(el).find('.tc').find('a').attr('href').split('#')[0]
     })
  })

  return news
}

module.exports = newsModel;