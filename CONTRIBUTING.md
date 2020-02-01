# Rules for contribute in the project

Please if you want to contribute with this open source project, read carefully the all article and follow our rules. 

## Create a new issue

- Write a self explained title to the issue
- Always make a description of the issue
- If it is necessary create the steps for reproduce the bug
- Write the issue in english
- Use the available templates for create the issue

## Issue assigment

- Only assign an issue if you are going to work on it.
- One you select the issue to work on, assign it to your user.
- After an issue is assigned to you, go to the project and be sure that you have the latest version of develop branch.
- After you are in develop, create a new branch with the `feature` name on it, and the number of the issue, like the following example:
    - `feature/23`

## Pull request to develop

After you finish with the issue, and you want to integrate your changes into `develop`, be sure fulfill this requirement before:

- Always have `develop` on it latest version.
- Make `rebase` to the latest version of the `develop` branch. exp: `git rebase origin/develop`
- After the current `feature` branch is successful rebased into `develop`, check if it did not break anything.
- After fix all the possibles problem with the `rebase`, then push the `feature` branch and ask for a pull request in `develop`.

## Integrate develop in master

- After the all team of the project decide that the current version of develop is ready for integrate in master, one of the developers of the core team should integrate it to the **master** branch.
