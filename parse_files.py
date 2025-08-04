import json

with open('files.json', 'r') as f:
    data = json.load(f)

print("All files in the repository:")
for item in data['tree']:
    if item['type'] == 'blob':
        print(f"https://raw.githubusercontent.com/swairua/ziratech-website/main/{item['path']}")
