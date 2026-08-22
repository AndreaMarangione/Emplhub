<div align="center">

# Emplhub

**Workforce management for field engineering teams.**

Time reporting, capacity planning, leave management and automated financial
reporting — built for a multi-company industrial engineering group.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js%2024-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)

</div>

> [!NOTE]
> **This repository is a showcase.** Emplhub is a private, closed-source
> application in production use. The source code is not published here.
> All names, order references and figures in the screenshots below are
> fictional.

---

## What it is

Field engineering work is hard to keep track of. Engineers move between
customer sites, log hours against dozens of concurrent work orders, take
leave that has to be approved and reflected in timesheets, and at the end of
every month somebody has to turn all of it into numbers the finance team can
actually use.

Emplhub is the internal system that does this. It replaced a stack of
spreadsheets shared over email with a single application that field staff,
team leads and administrators all work from — covering the full loop from an
engineer logging four hours on a Tuesday to a costed monthly report landing
in a director's inbox.

---

## Capacity planning

The planning board is the heart of the application: a month-wide grid where
every row is a person and every cell is a day. Past days show what was
actually reported; future days show what is planned. Leave is rendered
inline, so a team lead can see at a glance who is available next week and
who is not.

![Capacity planning board](assets/planning.png)

---

## Daily reporting

The landing page puts the engineer's active work orders one click away and
shows their month at a glance: ordinary hours, overtime and travel time,
navigable month by month.

![Dashboard](assets/dashboard.png)

---

## Work orders

Every job the group is contracted for, with quoted value, hours consumed and
budget remaining — filterable, sortable and searchable across every column
that matters.

![Work orders](assets/activities.png)

---

## Feature set

| Area | What it does |
| --- | --- |
| **Time reporting** | Multi-day entry, travel hours, start/end times, validation against the work order's active window |
| **Weekly timesheets** | Auto-generated per person and week, with justifications (work, leave, public holiday), business trips, shift flags and notes |
| **Capacity planning** | Month grid combining actuals and plans, grouped by role, with inline leave |
| **Leave management** | Request, approve or reject with email notification; approving regenerates every affected weekly timesheet transactionally |
| **Monthly cost reporting** | Excel workbook per company, grouped by role with per-role subtotals, uploaded to S3 and emailed on a schedule |
| **Revenue forecasting** | Quoted versus actual cost across work orders closing in a given month, exported on demand |
| **Access control** | Role-based (root, administrator, user, customer) and scoped by company and department |

---

## Architecture

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.png">
  <img alt="Emplhub architecture" src="assets/architecture-light.png">
</picture>

A conventional three-tier layout, with the interesting parts concentrated in
the API: the date engine that anchors every calendar computation to
`Europe/Rome`, the report generator that produces styled Excel workbooks, and
the scheduler that drives monthly delivery without anyone pressing a button.

**Server** — Node.js, TypeScript, Express, Prisma, PostgreSQL, ExcelJS,
MJML, Nodemailer, date-fns, node-schedule.

**Client** — React, TypeScript, Redux Toolkit, PrimeReact,
react-hook-form.

**Infrastructure** — AWS S3 for generated artefacts, scheduled jobs for
monthly reporting.

---

## Status

In active production use and under continuous development.

**Author** — [@Andrea Marangione]([https://github.com/riddim](https://github.com/AndreaMarangione))

<div align="center">
<sub>Screenshots are from the live application with all data anonymised.</sub>
</div>
