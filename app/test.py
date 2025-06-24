from itertools import product


myList = [
    ["a", "b"],
    ["c", "d"],
    ["e", "f"],
    ["g", "k", "p"],
  ]

print(list(*myList))
print(len(list(product(*myList))))