import requests

SERP_API_KEY = "2069030e44b922afe13ae4a552586cdff2987f7f50ccf2d056eb4e6c01322aac"

def search_profiles(query):
    url = "https://serpapi.com/search"

    params = {
        "q": query,
        "api_key": SERP_API_KEY,
        "engine": "google"
    }

    response = requests.get(url, params=params)
    data = response.json()

    links = []

    for result in data.get("organic_results", []):
        link = result.get("link", "")
        if "linkedin.com/in" in link:
            links.append(link)

    return links