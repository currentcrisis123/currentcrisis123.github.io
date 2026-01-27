**Frontend**

The build is deployed to Github Pages on the CurrentCrisis repo.
Github's runners seem to be disabled so you might have to configure your own runner locally if you want to deploy later builds.

Go to `repo --> Settings --> Actions --> Runners --> New self-hosted runner` and follow the instructions to set up your runner. If in doubt, ask ChatGPT or smth.

To run the runner locally, in Terminal root: 
`cd ./actions-runner && ./run.sh`
