import pandas as pd

# Load species.csv and parks.csv
species_data = pd.read_csv('./data/species.csv')
parks_data = pd.read_csv('./data/parks.csv')

# Define a function to count occurrences of each category for a park
def count_categories(group):
    return pd.Series({
        'Mammal': (group['Category'] == 'Mammal').sum(),
        'Bird': (group['Category'] == 'Bird').sum(),
        'Reptile': (group['Category'] == 'Reptile').sum(),
        'Amphibian': (group['Category'] == 'Amphibian').sum(),
        'Fish': (group['Category'] == 'Fish').sum(),
        'Vascular Plant': (group['Category'] == 'Vascular Plant').sum(),
        'Spider/Scorpion': (group['Category'] == 'Spider/Scorpion').sum(),
        'Insect': (group['Category'] == 'Insect').sum(),
        'Invertebrate': (group['Category'] == 'Invertebrate').sum(),
        'Fungi': (group['Category'] == 'Fungi').sum(),
        'Nonvascular Plant': (group['Category'] == 'Nonvascular Plant').sum(),
        'Crab/Lobster/Shrimp': (group['Category'] == 'Crab/Lobster/Shrimp').sum(),
        'Slug/Snail': (group['Category'] == 'Slug/Snail').sum(),
        'Algae': (group['Category'] == 'Algae').sum(),
    })

# Group species data by Park Name and apply the count_categories function
aggregated_data = species_data.groupby('Park Name').apply(count_categories).reset_index()

# Merge aggregated data with parks data to get State, Acres, Latitude, Longitude
final_data = pd.merge(aggregated_data, parks_data, on='Park Name')

# Reorder columns
final_data = final_data[['Park Name', 'State', 'Acres', 'Latitude', 'Longitude','Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish', 'Vascular Plant',
 'Spider/Scorpion', 'Insect', 'Invertebrate', 'Fungi', 'Nonvascular Plant',
 'Crab/Lobster/Shrimp', 'Slug/Snail', 'Algae']]

# Save to new CSV file
final_data.to_csv('./data/final.csv', index=False)
