
from urllib.request import urlopen
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import re

# Global variables
accepted_dns = [ # "apnews.com",
    "www.cnn.com", "www.foxnews.com", "www.foxbusiness.com", "www.bbc.com",
    "www.npr.org"
]

def fetch_and_parse_article(url, hostname):
    html = urlopen(url).read()
    soup = BeautifulSoup(html, features="html.parser")

    article_content = None

    # CNN attributes
    if hostname == "www.cnn.com":
        target_attrs = {"data-component-name": ["paragraph", "subheader"]}
        article_content = soup.find_all("p", attrs=target_attrs)
    
    # Fox News/Business attributes
    if hostname == "www.foxnews.com" or hostname == "www.foxbusiness.com":
        target_attrs = {"class": "article-body"}
        article_body = soup.find("div", attrs=target_attrs)
        article_content = article_body.find_all("p")

    # BBC attributes
    if hostname == "www.bbc.com":
        target_attrs = {"class": "sc-9a00e533-0 hxuGS"}
        article_body = soup.find("article")
        article_content = article_body.find_all("p", attrs=target_attrs)

    # NPR attributes
    if hostname == "www.npr.org":
        target_attrs = {"id": "storytext"}
        article_body = soup.find("div", attrs=target_attrs)
        article_content = article_body.find_all("p")

    # If nothing is found, treat URL as invalid for your purpose
    if not article_content:
        raise ValueError(f"URL '{url}' does not contain expected article content. Marking as invalid.")

    # Otherwise, extract and print cleaned text
    for content in article_content:
        clean_text = content.get_text().replace('\n', '').replace('\t', '')
        clean_text = re.sub(r' {2,}', ' ', clean_text)
        print(clean_text, "\n")

def check_url(url):

    hostname = urlparse(url).hostname

    print(hostname)

    if hostname in accepted_dns:
        return hostname
    else:
        raise ValueError(f"Domain not currently accepted. Possible errors:\n"
                         "- Requires full address (including http:// or https://)\n"
                         "- Domain name currently not accepted, please use accepted domains\n")

# ------ Start of main -------- #
# Fetch the HTML content from the URL
cnn_url = "https://www.cnn.com/2025/03/11/politics/department-of-education-cuts/index.html" 
fox_url = "https://www.foxnews.com/politics/blue-state-governor-another-appearance-trump-before-100-day-speech-happy-here"
foxb_url = "https://www.foxbusiness.com/economy/bessent-says-us-weigh-chinas-failure-phase-one-trade-deal-from-first-term-negotiations"
bbc_url = "https://www.bbc.com/news/articles/cwy6lg3p7ero"
npr_url = "https://www.npr.org/2025/04/29/g-s1-63458/trump-aims-to-unleash-local-police-but-cautions-against-standing-in-the-way-of-ice"
fake_url = "www.google.com"

# ENTER URL HERE (Must be full url)
url = npr_url

try:
    fetch_and_parse_article(url, check_url(url))
except ValueError as e:
    print(e)