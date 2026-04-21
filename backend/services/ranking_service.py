def rank_profiles(profiles, jd):
    jd = jd.lower()

    scored = []

    for link in profiles:
        score = 0

        # basic keyword scoring
        if "java" in jd and "java" in link:
            score += 2

        if "spring" in jd and "spring" in link:
            score += 2

        if "developer" in link:
            score += 1

        scored.append((link, score))

    # sort by score
    scored.sort(key=lambda x: x[1], reverse=True)

    return [item[0] for item in scored]