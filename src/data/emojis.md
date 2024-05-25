# Emojis

Download emojis from the [GitHub gemoji](https://github.com/github/gemoji) repository.

```sh
./download-emojis
```

Exclude objects with the categories `Flag` and `Smileys & Emotion`.

```sh
jq '.[] | select(.category as $category | ["Flags", "Smileys & Emotion"] | index($category) | not)' gemojis.json
```

Group emoji by the first character of its description string.

```sh
jq '[
  .[] |

  select(.emoji and .description and (.description | type == "string") and (.description | length > 0)) |
  
  {emoji: .emoji, word: .description}] |
  
  map(select(.word | length > 0)) |
  
  group_by(.word | .[0:1]) |
  
  map({key: .[0].word[0:1] | ascii_downcase, value: .}) |
  
  from_entries' \
    gemojis.json > emoji-list-alpha-`today`.json
```

Exclude objects with the categories `Flag` and `Smileys & Emotion`. Group emoji by the first character of its description string.

```sh
# Exclude listed categories
# group emojis by the first character in its descriptions 

jq '[
    .[] |

    select(
      .category as $category |
      ["Flags", "Smileys & Emotion"] |
      index($category) | not
    ) |

    select(
      .emoji and .description and
      (.description | type == "string") and
      (.description | length > 0)
    ) |
  
    {emoji: .emoji, word: .description}
  ] |

  map(select(.word | length > 0)) |
  
  group_by(.word | .[0:1]) |
  
  map({key: .[0].word[0:1] |
  
  ascii_downcase, value: .}) |
  from_entries' \
  gemojis.json > emoji-list-alpha-`today`.json
```
