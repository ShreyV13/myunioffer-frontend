# Launch Day App.jsx Swap

Run this command to go live:
```
cd ~/Desktop/business/uniprepai/myunioffer/frontend && python3 src/pages/saved-release/swap-to-live.py && git add . && git commit -m "LAUNCH: swap to live pages" && git push
```

To revert if anything breaks:
```
cd ~/Desktop/business/uniprepai/myunioffer/frontend && git revert HEAD && git push
```
