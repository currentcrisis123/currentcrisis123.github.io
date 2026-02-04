# Deploying Frontend & Backend

The build is deployed to Github Pages on the CurrentCrisis repo.
Github's runners are disabled on GHES so you will have to configure your own runner locally if you want to deploy later builds.
Current workflows are:
- `mirror`
- `deploy`

Since there are no Github-hosted runners, the `warm` job cannot be dependent on a self-hosted runner. The cron job is set on <a href='https://console.cron-job.org/login'>cron-job.com</a> and runs every 30mins to keep the Render instance warm. Adjust accordingly to avoid hitting Render's free tier limits.

Go to ` CurrentCrisis repo --> Settings --> Actions --> Runners --> New self-hosted runner` and follow the instructions to set up your runner. If in doubt, ask ChatGPT or smth.

To run the runner locally, in your root:
`cd ./actions-runner && ./run.sh`

# Structure

Frontend deployed to GH Pages, reverse proxy through Cloudflare.
Backend deployed to Render.
DB on MongoDB.
