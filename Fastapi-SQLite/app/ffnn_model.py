import pandas as pd
from sentence_transformers import SentenceTransformer
import os
import time
from joblib import dump, load

from app.scraper import fetch_and_parse_article, check_url

# For prebuilt neural network
from sklearn.neural_network import MLPRegressor

class NeuralNetworkModel():
    def __init__(self):
        self.url = ""
        self.model = SentenceTransformer('all-roberta-large-v1')
        
    def generateSoloEmbedding(self, text):
        return self.model.encode(text)

    def train(self):

        print("Starting training\n")

        features_csv="binaries/embeddings_2.csv"
        outputs_csv="binaries/outputs_training.csv"

        rel_path_em = os.path.relpath(features_csv)
        em_df = pd.read_csv(rel_path_em)

        rel_path_ot = os.path.relpath(outputs_csv)
        ot_df = pd.read_csv(rel_path_ot)
        
        regressor = MLPRegressor(hidden_layer_sizes=(512, 256, 128, 64, 32, 16, 8, 4, 2,), activation='relu', solver='adam', max_iter=500, random_state=42)

        start_time = time.time()
        regressor.fit(em_df, ot_df.squeeze())
        end_time = time.time()

        elapsed_time = end_time - start_time
        print("\nNeural Network Execution Time: ", elapsed_time, "\n")

        dump(regressor, 'binaries/mlp_model.joblib')

    def test(self, url):
        full_text = "" 
        authors = []
        date = ""
        publisher = ""

        try:
            full_text, authors, date, publisher = fetch_and_parse_article(url, check_url(url))
        except ValueError as e:
            print(e)

        start_time = time.time()
        test_data = self.generateSoloEmbedding(full_text)
        end_time = time.time()
        elapsed_time = end_time - start_time
        print("\nSolo Word Embedding Execution Time: ", elapsed_time, "\n")

        test_data = test_data.reshape(1, 1024)

<<<<<<< HEAD
        regressor = load('../binaries/mlp_model.joblib')
=======
        regressor = load('binaries/mlp_model.joblib')
>>>>>>> 16e5351d817a864fd12424878a59ab8fdab55aa5

        y_pred = regressor.predict(test_data)

        print("y_pred: ", y_pred, "\n")
        
        print("Authors:")
        for author in authors:
            print("- ", author)

        print("\nDate:", date)
        print("Publisher:", publisher)

        return float(y_pred), authors, date, publisher, full_text

# ---- Start of main ---- #

print(os.getcwd())

model = NeuralNetworkModel()
# model.train()
#print(os.getcwd())
model.test("https://www.cnn.com/2025/03/11/politics/department-of-education-cuts/index.html")

# MSNBC https://www.msnbc.com/opinion/msnbc-opinion/first-100-days-wall-street-trump-newsletter-rcna203413
# New York Post https://nypost.com/2025/04/29/lifestyle/why-just-checking-in-emails-are-a-bad-idea-experts-say/
# Democracy Now! https://www.democracynow.org/2025/4/25/elon_musk_xai_memphis_tennessee
# Daily Wire https://www.dailywire.com/news/trump-labor-dept-threatens-states-giving-unemployment-benefits-to-illegals?topStoryPosition=undefined&author=Amanda+Prestigiacomo&category=News&elementPosition=3&row=1&rowHeadline=Top+Stories&rowType=Top+Stories&title=Trump+Labor+Dept+Threatens+States+Giving+Unemployment+Benefits+To+Illegals
# NPR https://www.npr.org/2025/04/29/g-s1-63458/trump-aims-to-unleash-local-police-but-cautions-against-standing-in-the-way-of-ice
# New York Post https://nypost.com/2025/04/29/opinion/why-saquon-barkleys-trump-meet-up-riled-the-racist-left/
# CNN https://www.cnn.com/2025/03/11/politics/department-of-education-cuts/index.html
# Fox News https://www.foxnews.com/politics/blue-state-governor-another-appearance-trump-before-100-day-speech-happy-here
# Fox Business https://www.foxbusiness.com/economy/bessent-says-us-weigh-chinas-failure-phase-one-trade-deal-from-first-term-negotiations
# BBC https://www.bbc.com/news/articles/cwy6lg3p7ero