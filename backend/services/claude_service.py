def generate_queries(jd: str):
    jd = jd.strip()

    return [
        f'site:linkedin.com/in "{jd}"',
        f'site:linkedin.com/in {jd} developer',
        f'site:linkedin.com/in {jd} India',
        f'site:linkedin.com/in intitle:{jd}'
    ]