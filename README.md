# Webhook Git Generate Report Telegram Bot

<a href="https://codeclimate.com/github/jabardigitalservice/generate-report-webhook/maintainability"><img src="https://api.codeclimate.com/v1/badges/8da03b052b2ba3a7331c/maintainability" /></a>

This git webhook includes gitlab and github, installed in git organization settings, so all repos can use this webhook with one configuration. helps to automatically report each time according to the main task of making code or as a peer to peer code

## How to use

1. Make a pull request/merge request
2. Added evidence format in the description section
```bash
## Evidence
- title: 
- project: 
- participants: 
```
3. do Merge
4. The report will be sent directly by the Telegram bot, containing a screenshot of the pull request/merge request, title, project, participants, url
5. Participants are taken from the Telegram username

## Limitation

As for the limitations of this generated git webhook report for private repos, there is an additional process where this webhook feature will only send messages without screenshots, therefore it requires sending screenshots manually.

## Architecture

![image](https://user-images.githubusercontent.com/41193120/133529574-63c5a6a4-4499-4409-9e74-6dee38ac110a.png)

## Stack Technology
- NodeJS
- Express Framework
- Redis (Message Broker)
- Elastic (Logging)
- API Telegram

## Quick Start
Clone project and install dependencies:
```bash
git clone https://github.com/jabardigitalservice/generate-report-webhook.git
cd generate-report-webhook
cp .env.example .env
```

Run with Docker Compose
```bash
docker-compose up --build
```
