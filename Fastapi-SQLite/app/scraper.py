
from urllib.request import urlopen
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from datetime import datetime, timezone
import re

# Global variables
accepted_dns = [ 
    "www.cnn.com", "www.foxnews.com", "www.foxbusiness.com", "www.bbc.com",
    "www.npr.org", "www.msnbc.com"
]

def fetch_and_parse_article(url, hostname):
    html = urlopen(url).read()
    soup = BeautifulSoup(html, features="html.parser")

    article_content = None
    article_author = None
    article_date = None
    article_title = None

    full_text = ""
    date = ""
    authors = []
    publisher = ""
    title = ""

    # CNN attributes
    if hostname == "www.cnn.com":

        publisher = "CNN"

        target_attrs_content = {"data-component-name": ["paragraph", "subheader"]}
        article_content = soup.find_all("p", attrs=target_attrs_content)

        target_attrs_author = {"class": "byline__name"}
        article_author = soup.find_all(attrs=target_attrs_author)

        target_attrs_date = {"class": "timestamp vossi-timestamp"}
        article_date_og = soup.find(attrs=target_attrs_date)
        article_date_og = article_date_og.get_text().replace('\n', '').replace('\t', '').replace("Updated", "").strip()
        article_date = re.sub(r' {2,}', ' ', article_date_og)

        target_attrs_title = {"class": "headline__text inline-placeholder vossi-headline-text"}
        article_title = soup.find(attrs=target_attrs_title)
    
    # Fox News/Business attributes
    if hostname == "www.foxnews.com" or hostname == "www.foxbusiness.com":

        publisher = "FOX"

        target_attrs_content = {"class": "article-body"}
        article_body = soup.find("div", attrs=target_attrs_content)
        article_content = article_body.find_all("p")

        target_attrs_author = {"class": "author-byline"}
        article_author_body = soup.find(attrs=target_attrs_author)
        article_author = article_author_body.find("a")

        target_attrs_date = {"class": "article-date"}
        article_date_og = soup.find(attrs=target_attrs_date)
        article_date_og = article_date_og.get_text().replace('\n', '').replace('\t', '').replace("Updated", "").strip()
        article_date = re.sub(r' {2,}', ' ', article_date_og)

        target_attrs_title = {"class": "headline speakable"}
        article_title = soup.find(attrs=target_attrs_title)

    # BBC attributes
    if hostname == "www.bbc.com":

        publisher = "BBC"

        target_attrs_content = {"class": "sc-9a00e533-0 hxuGS"}
        article_body = soup.find("article")
        article_content = article_body.find_all("p", attrs=target_attrs_content)

        target_attrs_author = {"class": "sc-801dd632-7 lasLGY"}
        article_author = soup.find_all(attrs=target_attrs_author)
        
        article_date_tag = soup.find("time")
        article_date_og = article_date_tag["datetime"]
        dt = datetime.strptime(article_date_og, "%Y-%m-%dT%H:%M:%S.%fZ")
        dt = dt.replace(tzinfo=timezone.utc)
        article_date = dt.strftime("%B %d, %Y %I:%M %p %Z")

        target_attrs_title = {"class": "sc-737179d2-0 dAzQyd"}
        article_title = soup.find(attrs=target_attrs_title)

    # NPR attributes
    if hostname == "www.npr.org":

        publisher = "NPR"

        target_attrs_content = {"id": "storytext"}
        article_body = soup.find("div", attrs=target_attrs_content)
        article_content = article_body.find_all("p")

        target_attrs_author = {"class": "byline__name byline__name--block"}
        article_author = soup.find_all(attrs=target_attrs_author)

        article_date_tag = soup.find("time")
        article_date_og = article_date_tag["datetime"]
        dt = datetime.fromisoformat(article_date_og)
        dt = dt.astimezone(timezone.utc)
        article_date = dt.strftime("%B %d, %Y %I:%M %p %Z")

        target_attrs_title = {"class": "storytitle"}
        article_title = soup.find(attrs=target_attrs_title)

    # MSNBC attributes
    if hostname == "www.msnbc.com":

        publisher = "MSNBC"

        target_attrs_content = {"class": "body-graf"}
        article_content = soup.find_all("p", attrs=target_attrs_content)

        target_attrs_author = {"class": "article-inline-byline"}
        article_author_body = soup.find("div", attrs=target_attrs_author)
        article_author = article_author_body.find_all("span")

        article_date_tag = soup.find("time")
        article_date_og = article_date_tag["datetime"]
        dt = datetime.strptime(article_date_og, "%Y-%m-%dT%H:%M:%S.%fZ")
        dt = dt.replace(tzinfo=timezone.utc)
        article_date = dt.strftime("%B %d, %Y %I:%M %p %Z")

        target_attrs_title = {"class": "article-hero-headline__htag lh-none-print black-print"}
        article_title = soup.find(attrs=target_attrs_title)


    # If nothing is found, treat URL as invalid for your purpose
    if not article_content:
        raise ValueError(f"URL '{url}' does not contain expected article content. Marking as invalid.")

    # Otherwise, extract and print cleaned text
    for content in article_content:
        clean_text = content.get_text().replace('\n', '').replace('\t', '')
        clean_text = re.sub(r' {2,}', ' ', clean_text)
        # print(clean_text, "\n")
        full_text += clean_text
    
    for author in article_author:
        clean_text = author.get_text().replace('\n', '').replace('\t', '')
        clean_text = re.sub(r' {2,}', ' ', clean_text)
        authors.append(clean_text)

    date = article_date

    title = article_title.get_text().replace('\n', '').replace('\t', '')
    title = re.sub(r' {2,}', ' ', title)

    return full_text, authors, date, publisher, title

def check_url(url):

    hostname = urlparse(url).hostname

    print(hostname)

    if hostname in accepted_dns:
        return hostname
    else:
        raise ValueError(f"Domain not currently accepted. Possible errors:\n"
                         "- Requires full address (including http:// or https://)\n"
                         "- Domain name currently not accepted, please use accepted domains\n")