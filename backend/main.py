from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.claude_service import generate_queries
from services.search_service import search_profiles
from services.ranking_service import rank_profiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Talent Hunt API Running"}

@app.post("/search")
def search(jd: dict):
    description = jd.get("description", "")

    queries = generate_queries(description)

    all_links = []

    for q in queries:
        results = search_profiles(q)
        all_links.extend(results)

    unique_links = list(set(all_links))

    return {
        "queries": queries,
        "profiles": unique_links[:20]
    }

from services.ranking_service import rank_profiles

@app.post("/search")
def search(jd: dict):
    description = jd.get("description", "")

    queries = generate_queries(description)

    all_links = []

    for q in queries:
        results = search_profiles(q)
        all_links.extend(results)

    unique_links = list(set(all_links))
    clean_links = list(set(link.split("?")[0].rstrip("/") for link in unique_links))

    # NEW: ranking
    ranked = rank_profiles(unique_links, description)

    return {
        "profiles": ranked
    }