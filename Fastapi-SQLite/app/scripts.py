
# scripts file to store one time use functions (i.e. formatting csvs and what not)

import pandas as pd
import os
import time
from sentence_transformers import SentenceTransformer

# Code to make dataset.csv
def makeDataset():
    left_dir = './data/left'
    right_dir = './data/right'
    center_dir = './data/center'

    df = pd.DataFrame(columns=['Text', 'Bias'])

    for filename in os.listdir(left_dir):
        if filename.endswith('.txt'):
            filepath = os.path.join(left_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                new_row = {'Text': content, 'Bias': 1}
                df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)

    print("left done\n")

    for filename in os.listdir(right_dir):
        if filename.endswith('.txt'):
            filepath = os.path.join(right_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                new_row = {'Text': content, 'Bias': 0}
                df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)

    print("right done\n")

    for filename in os.listdir(center_dir):
        if filename.endswith('.txt'):
            filepath = os.path.join(center_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                new_row = {'Text': content, 'Bias': 0.5}
                df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)

    print("center done\n")

    df.to_csv('./data/dataset.csv', index=False)


# Generate word embeddings for training set
def generateEmbeddings(self, texts):
    model = SentenceTransformer('all-roberta-large-v1')
    print(len(texts))

    embeddings = []
    total = len(texts)
    count = 0

    print("Starting embeddings\n")

    for text in texts:
        embedding = model.encode(text)
        embeddings.append(embedding)

        if (count % 10 == 0):
            print("Progress: ", count / total, "\n")

        count += 1

    return embeddings

# Generate training embeddings from csv
def generateTrainingEmbeddings():
    rel_path = os.path.relpath("data/dataset.csv")
    df = pd.read_csv(rel_path)

    # Drop rows with empty cells
    df = df.dropna().reset_index(drop=True)

    # Generate features for NN
    texts = df.iloc[:, 0]
    texts = texts.astype(str)

    start_time = time.time()
    embeddings = generateEmbeddings(texts)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("\nWord Embedding Execution Time: ", elapsed_time, "\n")

    embeddings_df = pd.DataFrame(embeddings)

    embeddings_df.to_csv('./data/embeddings_2.csv', index=False)
