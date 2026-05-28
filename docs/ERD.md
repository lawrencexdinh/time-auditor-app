## MVP Database Schema

### PROFILE

```text
PROFILE
  id uuid PK / FK -> auth.users.id
  email text not null
  created_at timestamptz not null default now()
  updated_at timestamptz not null default now()
```

### PROJECT

```text
PROJECT
  id uuid PK default gen_random_uuid()
  user_id uuid not null FK -> PROFILE.id
  title text not null
  created_at timestamptz not null default now()
  updated_at timestamptz not null default now()
```

### TASK

```text
TASK
  id uuid PK default gen_random_uuid()
  user_id uuid not null FK -> PROFILE.id
  project_id uuid nullable FK -> PROJECT.id
  title text not null
  description text nullable
  due_date timestamptz nullable
  completed_at timestamptz nullable
  created_at timestamptz not null default now()
  updated_at timestamptz not null default now()
```

### TIMER_SESSION

```text
TIMER_SESSION
  id uuid PK default gen_random_uuid()
  user_id uuid not null FK -> PROFILE.id
  started_at timestamptz not null
  ended_at timestamptz nullable
  planned_intervals integer not null
  focus_duration_mins integer not null
  break_duration_mins integer not null
  created_at timestamptz not null default now()
  updated_at timestamptz not null default now()
```

### TIMER_INTERVAL

```text
TIMER_INTERVAL
  id uuid PK default gen_random_uuid()
  user_id uuid not null FK -> PROFILE.id
  session_id uuid not null FK -> TIMER_SESSION.id
  task_id uuid nullable FK -> TASK.id
  project_id uuid nullable FK -> PROJECT.id
  type text not null
  goal text nullable
  duration_mins integer not null
  focus_score integer nullable
  started_at timestamptz not null
  ended_at timestamptz not null
  created_at timestamptz not null default now()
  updated_at timestamptz not null default now()
```

## Relationships

```text
auth.users 1 -> 1 PROFILE

PROFILE 1 -> many PROJECTS
PROFILE 1 -> many TASKS
PROFILE 1 -> many TIMER_SESSIONS
PROFILE 1 -> many TIMER_INTERVALS

PROJECT 1 -> many TASKS
PROJECT 1 -> many TIMER_INTERVALS

TASK 1 -> many TIMER_INTERVALS

TIMER_SESSION 1 -> many TIMER_INTERVALS
```

## Constraints

```text
PROFILE.id references auth.users.id.

PROJECT.user_id references PROFILE.id.
TASK.user_id references PROFILE.id.
TIMER_SESSION.user_id references PROFILE.id.
TIMER_INTERVAL.user_id references PROFILE.id.

TASK.project_id is nullable.
TASK.project_id references PROJECT.id.

TIMER_INTERVAL.session_id references TIMER_SESSION.id.
TIMER_INTERVAL.task_id is nullable.
TIMER_INTERVAL.task_id references TASK.id.
TIMER_INTERVAL.project_id is nullable.
TIMER_INTERVAL.project_id references PROJECT.id.

TIMER_INTERVAL.type must be one of:
  FOCUS
  BREAK
  OTHER

TIMER_INTERVAL.focus_score is nullable.
TIMER_INTERVAL.focus_score should only be set when TIMER_INTERVAL.type = FOCUS.

Task time is derived from TIMER_INTERVAL.duration_mins.
Project time is derived from TIMER_INTERVAL.duration_mins.
Daily focus time is derived from TIMER_INTERVAL.duration_mins where type = FOCUS.
Daily break time is derived from TIMER_INTERVAL.duration_mins where type = BREAK.
Average focus score is derived from TIMER_INTERVAL.focus_score where type = FOCUS.
```

## Deferred Tables

```text
SUBJECT
DISTRACTION_LOG
CATEGORY
TAG
DAILY_REVIEW
WEEKLY_REVIEW
```
