# emojis

Download gemojis

```sh
./download-emojis
```

Exclude objects with the categories `Flag` and `Smileys & Emotion`. 

```sh
jq '.[] | select(.category as $category | ["Flags", "Smileys & Emotion"] | index($category) | not)' gemojis.json
```

Exclude objects with the categories `Flag` and `Smileys & Emotion`. Group by first letter of description string. 

```sh
jq '[.[] | select(.category as $category | ["Flags", "Smileys & Emotion"] | index($category) | not) | select(.emoji and .description and (.description | type == "string") and (.description | length > 0)) | {emoji: .emoji, word: .description}] | map(select(.word | length > 0)) | group_by(.word | .[0:1]) | map({key: .[0].word[0:1] | ascii_downcase, value: .}) | from_entries' test.json
```
