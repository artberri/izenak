import scrapy
import re

start_urls = []
baseurl = 'https://www.euskaltzaindia.eus/index.php?option=com_ecoeoda&Itemid=469&task=bilaketa&view=bilaketa&lang=eu&query=%2A%3A%2A&mota=izenak&sexua_facet[]='
nora = 2190

for sexua in range(1, 3):
    url = baseurl + str(sexua) + '&nondik='
    for i in range(0, nora, 10):
        start_urls.append(url + str(i))

class EuskaltzaindisSpider(scrapy.Spider):
    name = 'euskaltzaindiaspider'
    start_urls = start_urls
    custom_settings = {
        'DOWNLOAD_DELAY': 1,
    }

    def parse(self, response):
        for name_url in response.css('#searchContent .col-md-8 h3 a ::attr("href")'):
            url = name_url.get()
            yield response.follow(url, callback=self.parse_name)

    def parse_name(self, response):
        content = response.css('#searchContent')
        name = content.css('h3 ::text').get()
        row = content.css('.row')
        translations = row.css(':nth-child(1) ::text').get().strip().replace('\t', '')
        metadata = row.css(':nth-child(2) ul')
        gender = metadata.css(':nth-child(2) ::text').get().strip().replace('\t', '').lower()
        hipocoristic = metadata.css(':nth-child(4) ::text').get().strip().replace('\t', '').lower()
        meaningTag = row.css('.col-md-12:nth-child(3) p').get()
        meaning = ''
        if meaningTag is not None:
            meaning = meaningTag.strip().replace('\t', '')
            meaning = re.sub('<[^<]+?>', '', meaning)

        yield {
            'name': name,
            'translations': translations,
            'gender': gender,
            'hipocoristic': hipocoristic,
            'meaning': meaning
        }
