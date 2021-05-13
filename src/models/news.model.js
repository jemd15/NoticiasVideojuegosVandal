const cheerio = require('cheerio'); // librería para hacer scrapping
const fetch = require('sync-fetch'); // librería para leer la web
let newsModel = {};

const url = "https://vandal.elespanol.com";

newsModel.getNews = async () => {

  /**
   * el html viene en una codificación diferente, por lo que
   * primero decodificamos lo descargado para eliminar cualquier
   * caracter raro
  **/
  let html = fetch(url + '/noticias/videojuegos').arrayBuffer();
  const decoder = new TextDecoder('windows-1252');
  html = decoder.decode(html)

  // ahora cargamos lo leído a cheerio
  const $ = cheerio.load(html);
  let news = [];
  
  // por cada noticia obtenemos su titulo, descripción y fecha de publicación
  $('.caja620').map((i, el) => {
    news.push({
      "uid": `NOTICIA_${i+1}`,
      "updateDate": new Date($(el).find('.timestamp_fecha').attr('data-timestamp') * 1000),
      "titleText": $(el).find('a').text().trim(),
      "mainText": $(el).find('a').text().trim() + '. ' + $(el).find('.desccaja').text().trim(),
      "redirectionUrl": $(el).find('a').attr('href')
     })
  })

  return news
}

module.exports = newsModel;