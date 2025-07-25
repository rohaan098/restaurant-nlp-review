import spacy
from collections import Counter
from spacy.lang.en.stop_words import STOP_WORDS

nlp = spacy.load("en_core_web_sm")

def autocomplete_search(api_key, input_text):
    url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    params = {
        "input": input_text,
        "types": "establishment",
        "key": api_key
    }
    response = requests.get(url, params=params)
    return response.json()

def get_place_details(api_key, place_id):
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "name,reviews,rating",
        "key": api_key
    }
    response = requests.get(url, params=params)
    return response.json()

def extract_top_and_bottom_reviews(reviews, top_n=10):
    sorted_reviews = sorted(reviews, key=lambda x: x.get('rating', 0), reverse=True)
    top_reviews = sorted_reviews[:top_n]
    bottom_reviews = sorted_reviews[-top_n:]
    return top_reviews, bottom_reviews

def extract_key_phrases_from_reviews(reviews):
    text = " ".join(r.get("text", "") for r in reviews)
    doc = nlp(text)
    phrases = [chunk.text.lower() for chunk in doc.noun_chunks if chunk.text.lower() not in STOP_WORDS and len(chunk.text) > 1]
    most_common = [p for p, _ in Counter(phrases).most_common(10)]
    return most_common
