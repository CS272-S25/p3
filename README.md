# CS472 Group Project

## Git Collaboration Guide
- There are multiple branches in this repository. 
    - `main` branch: This is the main branch where the stable version of the code resides.
    - `dev` branch: This is the development branch where new features and changes are made and merged before publishing it to `main` branch.
    - `frontend/feature-xxx` branches: These branches are used for developing specific features in the frontend.
    - `backend/feature-xxx` branches: These branches are used for developing specific features in the backend.
- Steps to follow:
    1. At the beginning, `git clone` the repository to your local machine.
    2. Check the branches you'll work on:
        ```bash
        git branch -r
        git checkout xxx
        ```
    3. Always `git pull origin xxx` before starting to work on the `xxx` branch.
    4. Use `git push origin xxx` to push your changes to the `xxx` branch.

- Reference Links
    - Update Git branches from master: https://stackoverflow.com/questions/3876977/update-git-branches-from-master 