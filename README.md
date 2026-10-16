# Common Drug Reference Prototypes

&ensp;
```diff
- Please note this prototype has not been linked up with heroku so can only be viewed on a local machine.
- Contact matthew.proctor-leake@nhs.net if this needs to be set up.
```
&ensp;
## Project Setup
### Cloning the project
Clone the project using git:
```shell
git clone https://github.com/nhsbsa/cdr-client-prototype.git
```
or
```shell
git clone git@github.com:nhsbsa/cdr-client-prototype.git
```
### NPM Setup
Dependencies must be installed following the [NHSBSA dependency chain abuse guidance](https://nhsbsa.github.io/nhsbsa-digital-playbook/security/tech-node-dependency-chain-abuse/#safe-execution).
Scan the lock file for malware **before** installing, check `osvscan.md` for any vulnerabilities:
```shell
docker run --rm -v "${PWD}:/src" -w /src ghcr.io/google/osv-scanner:latest scan -f markdown --lockfile=package-lock.json --output osvscan.md
```
if no issues found, then run
```shell
npm ci
```

To change dependencies, use the `--package-lock-only` flag (for example `npm install --package-lock-only`), scan again, then run `npm ci`.
If there are issues downloading dependencies, you may need to add the nhsbsa npm repository.
To do this:
- Create the file ~/.npmrc
- Add the following configuration:
```shell
registry=https://dps-nexus.service.nhsbsa:8443/repository/npm
strict-ssl=false
```

&ensp;
***
&ensp;
## Running the Prototype locally
To run the prototype locally:

```shell
npm run dev
```

optionally the below command if live reload is not needed
```shell
node index.js
```
The prototype will be available on http://localhost:3000 (or the PORT set in .env).
The server restarts and the browser reloads automatically when files in `templates`, `lib` or `public` change.

## Running Pa11y accessibility checks
 
```shell
npm run pa11y
```
&ensp;
***
&ensp;
## Procedure for merging branches
Pull in the latest version of main locally using 

```git pull origin main```

Create a local branch using your initials followed by /. The describe the change, using the Jira ticket number if you have it.

```For example, mpl/MM-700-discontinuation-journey```

Make your changes locally and then push up to Github using your IDE commit tab, or using the following commands in your terminal:

```
git add .
git commit -m "change comments go here"
git push origin local-branch-name
```
&ensp;

| ![image](https://user-images.githubusercontent.com/111366792/206462599-1694bc16-e187-4f2b-b970-9c68f31aa2ce.png) |
|-|
<strong>Once pushed, there should be a highlight at the top of the repo asking to 'compare and pull request'. Select this button.</strong>
<p></p>

| ![image](https://user-images.githubusercontent.com/111366792/206463076-ce8b10d2-cdc1-4d77-b1a3-71f7b58158cf.png) |
|-|
<strong>Then you need to add a reviewer and create the pull request<strong>
<p></p>

| ![image](https://user-images.githubusercontent.com/111366792/206469532-0151b98e-40c1-4d11-b7c2-6a4dee1d3f82.png) |
|-|
<strong>The reviewer will be notified and will review the changes before marking it as being able to be merged. Then it can be merged in to main from the pull request. If the reviewer is able to merge this on their side then they will notify the user who did the pull request that it has been completed. <strong>
<p></p>


