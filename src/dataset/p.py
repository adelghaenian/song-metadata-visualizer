import pandas as pd

df = pd.read_csv('data_with_pca - Copy.csv')

print(df[:70000])

df[:70000].to_csv("compact_data.csv")