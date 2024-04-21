import pandas as pd
import numpy as np

# Read the CSV file into a pandas DataFrame
df = pd.read_csv('./data/final.csv')

# Extract the 'Acres' column as a numpy array
acres = df['Acres'].values.astype(float)

# Calculate summary statistics
min_acres = np.min(acres)
q1 = np.percentile(acres, 25)
median = np.percentile(acres, 50)
q3 = np.percentile(acres, 75)
max_acres = np.max(acres)

# Print the summary statistics
print("Min:", min_acres)
print("Lower Quartile:", q1)
print("Median:", median)
print("Upper Quartile:", q3)
print("Max:", max_acres)
