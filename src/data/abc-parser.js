let abc = await Deno.readTextFile('abc-emoji-list.json')
abc = JSON.parse(abc)

const sortAbc = {}
for (let i = 65; i <= 90; i++) {
  sortAbc[String.fromCharCode(i).toLowerCase()] = []
}

for (let letter in abc) {
  letter = abc[letter]
  sortAbc[letter] = []
  for (let word in letter) {
    word = letter[word]
    const firstletter = word.word[0]
    sortAbc[firstletter].push(word)
  }
}

// console.log(sortAbc)

abc = {}
for (let i = 65; i <= 90; i++) {
  const char = String.fromCharCode(i).toLowerCase()
  abc[char] = sortAbc[char]
}

abc = JSON.stringify(abc)

await Deno.writeTextFile('abc-emoji-list.json', abc)
