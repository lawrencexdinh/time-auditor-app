### Target User

Sam, 20 year old university student diagnosed with ADHD at 18 years old. "Has classes 4 days/week and works part-time (16–20 hrs/week) on top of study. He` spends way too long on certain tasks and too little on others, with little awareness of where his time is being spent.
Attempted to fix this with handwritten to-do lists, notion dashboards, calendar apps and pomodoro timers but still struggles to meet deadlines, and has no proper feedback loop.
Has also attempted productivity apps, and spent over $50-$100 on paid options but still nothing sticks. Lives on a MacBook, works in Chrome, uses Google Calendar.
Frustration builds up after each failed attempt, making him revert to thinking the solution is sheer willpower to work & "try harder".
For Sam, this isn't an occasional bad day, it's the texture of every weekday during semester.

### Problem Statement

**Pain:**
Young university students with ADHD reach 5pm regularly believing they 'worked all day' but unable to account for where 6 of those hours went. The mismatch between perceived and actual time use produces guilt, missed deadlines, and erodes self-trust. Having no data of how their time was spent leads to an inability to assess how they can improve for the next day.

**Why existing solutions don't work for this specific user:**
Existing tools fall into two camps, and neither serves Sam. Pomodoro apps like Pomofocus and Forest enforce focus bursts but offer no reflection or accountability once the timer ends - the data evaporates and there's no feedback loop into tomorrow's plan. Time trackers like Toggl, Timing, and RescueTime sit at the opposite extreme: they either demand disciplined manual logging that ADHD specifically undermines, or run silently in the background producing data without behaviour change. Sam needs the interruption-and-audit loop that lives between these two camps - and nothing currently fills that gap.

Even when the underlying tracking is competent, the interfaces aren't built for him. Toggl and Timing are designed around corporate project-billing workflows: client codes, billable hours, invoice exports. Their visual language is enterprise SaaS, not the focus-and-reflection rhythm a neurodivergent student needs to sustain a daily habit.

**Why now / why this**

- The adult ADHD diagnosis and treatment in Australia has surged by 450% over the last decade, but medication alone is not a sufficient treatment. This app serves as a daily behavioural remedy for ADHD affected tertiary students (diagnosed and undiagnosed), by merging the best parts of the existing solutions (pomodoro style timer, a todo list, and time auditor) into a centralised app that neurodivergent individuals will actually stick with.

### MVP Scope

**Task Management (macOS Desktop)**

- 📋 Todo list, with option to add due date, description, project and subject it's apart of.
- 📋 Projects to categorise a group of tasks.
- 📋 University Subjects to group projects & tasks
- 📋 Each task & project has a log of how much total time has been spent on it.

\*\*Time Audit macOS (macOS Desktop)

- 📋 Configurable pomodoro interval timer (15 / 30 / 60 / 90+ min) & how many intervals before long break
  - Option to add task, goal, project and subject to entry for pomodoro session timer
    - Once break ends, the task, goal, project and subject auto-populates into the entry for the next interval.
      - Can change the task before initiating timer.
      - User can change task and add a new task in the entry screen, with an option to configure the project and subject that the new task is associated to
      - If changing timer entry to a previously created task, the associated project & subject will autofill if user has already set it
  - Timer countdown runs in app and small banner shows timer countdown with goal being the label.
    - If there is no goal but there is a task associated to the timer, the task will show
  - Post-interval check-in: self-scoring focus from 1-10, once score is entered it will ask "Start Break Time"
  - Elegant timer sounds as default

**Insights (macOS Desktop)**

- 📋 Focus & work hours breakdown by day, week, and month
  - Each timeframe has their own pie-chart and histogram breakdown
    - Tab with tasks time breakdown
    - Other tab with projects time breakdown
    - Bar graph with total focus time, break time, and other
    - Average focus score based off of self-reported numbers

**Authentication**

- Ability to login via email & password saved to a PostgreSQL
- User stays logged in app with no time limit, unless they log out

### Out of Scope

The following are explicitly deferred or excluded from v1. This list is a contract with future-self: scope creep into any of these items requires a deliberate, dated decision to update this PRD.

| Capability                                                                                                                                                          | Status | Why Deferred                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------- |
| Web app full UI (todo dashboard + insights on web)                                                                                                                  | v2     | Requires complex programming infrastructure |
| Colour-coded calendar view of how you spent your time                                                                                                               | v2     | Requires complex programming infrastructure |
| User selects timer duration, then recommended break time, long break time and no. of intervals populates in settings mentioning "Recommended" with option to change | v2     | Requires complex programming infrastructure |
| User can configure timer sound or even add their own (like Apple's alarm app)                                                                                       | v2     | Requires complex programming infrastructure |
| Subjects (separate hierarchy above Projects)                                                                                                                        | v2     | Requires complex programming infrastructure |
| Google based login system                                                                                                                                           | v3     | Requires complex programming infrastructure |
| Community & gamification: add "Forest" inspired community aspect and feature similar to the planting of a tree                                                      | v3     | Requires complex programming infrastructure |
| Blocking apps during focus time                                                                                                                                     | v3     | Requires complex programming infrastructure |
| Automatic activity tracking & focus score for each timer                                                                                                            | v3     | Requires complex programming infrastructure |
| AI time-management coach                                                                                                                                            | v4     | Requires complex programming infrastructure |
| AI-generated daily schedules from your todo list and past behaviour                                                                                                 | v4     | Requires complex programming infrastructure |
| Calendar sync to auto-pause prompts during meetings & university classes                                                                                            | v4     | Requires complex programming infrastructure |

### User Stories

> **As a** [user type], **I want to** [do something], **so that** [outcome].

**Task Management (macOS Desktop)**

As a user, I want to add tasks that populate into a clean, minimalistic dashboard so that I can have a clearly laid out view of everything I need to do.

As a user, I want to add due dates and descriptions to each task, and be able to order my dashboard by due date so that I can easily know what tasks to prioritise.

As a user, I want to associate tasks to their subsequent university subject and/or project to have a more organised view of all my tasks and be able to filter my dashboard by subject and project.

As a user, I want there to be a column on the dashboards showing how much time I've spent on each task, project and university subject so that I can accurately plan how much time to block out for future tasks & projects according to past data.

As a user, I want three separate dashboards, one for tasks, one for projects and another for university subjects so that I can get individual breakdowns of time spent across multiple levels

\*\*Time Audit macOS (macOS Desktop)

As a user, I want to run a seamless pomodoro timer that shows as a non-invasive moveable banner on my macOS so that I can be constantly mindful of the timer without forgetting about it.

As a user, I want to be able to add what task I'm going to do and what my goal is for that session block so that I can remain intentional with my time throughout the day.

As a user, if a task has already been created in the task manager dashboard with a set project & subject, I want the project and subject to auto populate into the pomodoro session entry so that I can have a seamless experience when starting a focus sesion.

As a user, when I create a new task in the pomodoro session entry, I want an option to associate that task to a project and subject so that I can easily organise new coming tasks.

As a user, I want the task I inputted into the pomodoro timer to show on the banner to get a constant reminder of what I'm meant to be doing with the time block incase I get sidetracked and forget.

As a user, I want to have a dedicated page on the app that displays the timer, the task and goal of that block for when I have two screens and want a bigger view of the pomodoro that's bigger than the small banner.

As a user, I want to report how focused I was for each time block from 1-10 before initiating my break block to keep myself accountable throughout the day especially when I get sidetracked.

**Insights (macOS Desktop)**

As a user, I want to have visual and numerical breakdowns of my total focus time and break time for each day, week and month so that I can see how consistent my inputs are.

As a user, I want to have separate tabs that breakdown time spent across tasks, projects and subjects across each day, week and month so that I can see which subjects or projects I'm neglecting.

As a user, I want to see a daily average of my focus scores and a trend graph showing the averages across weeks and months to get a feedback loop on the effectiveness of my time management strategies.

**Authentication**

As a new user, I want to easily sign up for the platform by inputting my email, my password and password confirmation so that I can start using the app shortly after download.

As a user, I want my email & password safely stored so that I can have data privacy and feel comfortable using the application.

As a returning user, I want to stay logged into the app unless I log out to have that I can have minimal friction using the application everyday allowing me to stay more consistent with time tracking.

### 5.1 Product Success Metrics

Measured across the closed beta period (Aug 12–22, 2026) unless otherwise noted. "Active user" = a user who has logged in at least once on a given day. "Completed pomodoro" = a started timer that ran to completion or was ended early with a focus score logged.

- **Activation: ≥75% of users who complete sign-up start at least one pomodoro within 24 hours.** _Why:_ Activation is the leakiest funnel step in any productivity tool. If users sign up but never start a timer, the product has failed at first impression. 75% is realistic for a focused beta cohort (vs ~30% for cold consumer signups). Below 75%, your onboarding is broken.
- **Engagement: Median active user completes ≥3 pomodoros per active day.** _Why:_ Three pomodoros (~75–90 min focused work) is the minimum threshold where the day-end stats become meaningful. Below that, the user isn't generating enough data to feel value. This metric tells you whether the product is being used as intended, not just opened.
- **Audit completion: ≥80% of completed pomodoros end with a focus score logged.** _Why:_ The focus score is your differentiator vs Pomofocus and Forest. If users skip it, you're a regular pomodoro app with extra steps. 80% is achievable because the score is a single tap (1-10) and required to start the break — it's friction-low. Below 80%, the prompt UX needs redesign.
- **Insight engagement: ≥50% of beta users open the Insights tab at least 3 times during the beta period.** _Why:_ Insights is the _payoff_ of all the data collection. If users don't return to the breakdowns, you've built a logger, not a feedback loop. This metric tells you whether the audit data is actually closing the loop you designed it to close.
- **Week 2 retention: ≥40% of users active in beta week 1 are still active in week 2.** _Why:_ Week 2 retention is the single most predictive metric for long-term app survival in productivity tools. The novelty wears off after ~7 days; what remains is real product-market fit. 40% is honest for a category where most apps see 15–25% week-2 retention. This is the metric that tells you whether you have a product or a demo.
- **Bad-day return rate: ≥60% of users who skip ≥2 consecutive days return for at least one session afterward.** _Why:_ This is the metric that protects against the ADHD shame-spiral failure mode. Even if you've decided to keep the focus score and breakdown views, users will still occasionally have bad weeks. Whether they come back after a gap is the truest test of whether your product is psychologically safe. Below 60% means the app feels like a place users go to feel bad, and they avoid re-entering. Track this even though you've kept the structured-feedback model - it's the early warning system if the audit's concerns turn out to be right.

#### 5.2 Project Success Metrics

These measure whether building this app serves the broader career goal.

- **Shipped: production deployment by August 23, 2026.** _Why:_ The deadline you committed to. Anchors everything else. A late launch cascades into MU SEM2 timing and the OMSCS application window.
- **Real users: ≥10 beta users actively using the app during the closed beta period.** _Why:_ "Real users" is what separates a portfolio piece from a hobby project on a recruiter's screen. Ten is achievable through your existing network (r/ADHD, r/getstudying, friends, family). It's also enough to generate meaningful feedback without overwhelming you in support load.
- **Public artefacts: ≥10 dev-log blog posts published, each linking to the live app.** _Why:_ Builds your hireable narrative. Each post is a piece of evidence that you can think _and_ communicate about engineering - both are interview-relevant. Linking to the live app converts the post from "I built a thing" into "I built a thing you can use right now," which is rare and impressive.
- **Portfolio integration: app live on LinkedIn Featured, resume, and portfolio site by by August 30.** _Why:_ The week after launch is when momentum matters most. Recruiters Googling you immediately after launch should land on a polished story. Delaying this by even two weeks loses the narrative window.
- **Hiring signal: ≥1 technical interview secured by Sep 30, 2026 where the interviewer references the project.** _Why:_ The truest test of whether the app is doing its career job. An interview where the interviewer says "tell me about Time Auditor" is a 10x stronger conversation than a generic behavioral round. One such interview by end of September is realistic given an aggressive job hunt starting July 20.
