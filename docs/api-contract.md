# API Contract

## Overview

Time Auditor exposes a REST-style API through Next.js API routes.

Base path:

```text
/api
```

All protected endpoints require a valid Supabase access token in the `Authorization` header.

```text
Authorization: Bearer <access_token>
```

All request and response bodies use JSON unless otherwise stated.

Do not pass access tokens, user IDs, emails, or sensitive user data in query parameters.

The backend must derive the authenticated `user_id` from the Supabase access token. The frontend must not send `user_id` in request bodies.

Private `GET` responses must not be publicly cached.

---

## Standard Error Shape

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

---

## Common Error Codes

```text
VALIDATION_ERROR
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
CONFLICT
INTERNAL_SERVER_ERROR
```

---

## Common Status Codes

```text
200 OK - Request succeeded
201 Created - Resource created
204 No Content - Resource deleted or completed with no response body
400 Bad Request - Invalid request body or query parameters
401 Unauthorized - Missing or invalid authentication token
403 Forbidden - Authenticated user does not have access to the resource
404 Not Found - Resource does not exist or does not belong to the user
409 Conflict - Request conflicts with current resource state
500 Internal Server Error - Unexpected server error
```

---

# Profile Endpoints

## GET /api/profile

Returns the authenticated user's app profile.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```text
None
```

Response 200:

```json
{
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  }
}
```

Error Responses:

```text
401 UNAUTHORIZED
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

## PATCH /api/profile

Updates the authenticated user's app-level profile fields.

This endpoint does not update the user's Supabase Auth login email. Account email changes should use the Supabase Auth email update flow.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "email": "user@example.com"
}
```

Response 200:

```json
{
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T11:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

# Project Endpoints

## GET /api/projects

Returns all projects owned by the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```text
None
```

Response 200:

```json
{
  "projects": [
    {
      "id": "uuid",
      "title": "Time Auditor App",
      "created_at": "2026-05-28T10:00:00Z",
      "updated_at": "2026-05-28T10:00:00Z"
    }
  ]
}
```

Error Responses:

```text
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## POST /api/projects

Creates a new project for the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "title": "Time Auditor App"
}
```

Response 201:

```json
{
  "project": {
    "id": "uuid",
    "title": "Time Auditor App",
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## PATCH /api/projects/:id

Updates an existing project owned by the authenticated user.

Auth:

```text
Required
```

Path Parameters:

```text
id: Project ID
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "title": "Updated Project Name"
}
```

Response 200:

```json
{
  "project": {
    "id": "uuid",
    "title": "Updated Project Name",
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T11:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

## DELETE /api/projects/:id

Deletes an existing project owned by the authenticated user.

If the project has linked tasks or timer intervals, the first delete request should return `409 CONFLICT`.

If the user confirms they still want to remove the project, the frontend should call the same endpoint with `force=true`.

When `force=true`, the backend should:

```text
set tasks.project_id to null where project_id = selected project id
set timer_intervals.project_id to null where project_id = selected project id
delete the project
```

Auth:

```text
Required
```

Path Parameters:

```text
id: Project ID
```

Query Parameters:

```text
force: boolean, optional
```

Request Body:

```text
None
```

Response 204:

```text
No body
```

Conflict Response 409:

```json
{
  "error": {
    "code": "CONFLICT",
    "message": "Project has linked tasks or timer intervals. Confirm deletion to remove the project and unlink related records."
  },
  "conflict": {
    "tasks_count": 3,
    "timer_intervals_count": 12,
    "resolution": "Call DELETE /api/projects/:id?force=true to delete the project and set linked project_id values to null."
  }
}
```

Error Responses:

```text
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
409 CONFLICT
500 INTERNAL_SERVER_ERROR
```

---

# Task Endpoints

## GET /api/tasks

Returns all tasks owned by the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
project_id: uuid, optional, filters tasks by project
completed: boolean, optional, filters completed/incomplete tasks
```

Request Body:

```text
None
```

Response 200:

```json
{
  "tasks": [
    {
      "id": "uuid",
      "project_id": "uuid",
      "title": "Draft API contract",
      "description": "Define every MVP endpoint and response shape",
      "due_date": "2026-05-29T00:00:00Z",
      "completed_at": null,
      "created_at": "2026-05-28T10:00:00Z",
      "updated_at": "2026-05-28T10:00:00Z"
    }
  ]
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## POST /api/tasks

Creates a new task for the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "title": "Draft API contract",
  "description": "Define every MVP endpoint and response shape",
  "project_id": "uuid",
  "due_date": "2026-05-29T00:00:00Z"
}
```

Response 201:

```json
{
  "task": {
    "id": "uuid",
    "project_id": "uuid",
    "title": "Draft API contract",
    "description": "Define every MVP endpoint and response shape",
    "due_date": "2026-05-29T00:00:00Z",
    "completed_at": null,
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

## PATCH /api/tasks/:id

Updates an existing task owned by the authenticated user.

Auth:

```text
Required
```

Path Parameters:

```text
id: Task ID
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "title": "Draft API contract v1",
  "description": "Define every MVP endpoint and response shape",
  "project_id": "uuid",
  "due_date": "2026-05-29T00:00:00Z",
  "completed_at": "2026-05-28T12:00:00Z"
}
```

Response 200:

```json
{
  "task": {
    "id": "uuid",
    "project_id": "uuid",
    "title": "Draft API contract v1",
    "description": "Define every MVP endpoint and response shape",
    "due_date": "2026-05-29T00:00:00Z",
    "completed_at": "2026-05-28T12:00:00Z",
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T12:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

## DELETE /api/tasks/:id

Deletes an existing task owned by the authenticated user.

If the task has linked timer intervals, the first delete request should return `409 CONFLICT`.

If the user confirms they still want to remove the task, the frontend should call the same endpoint with `force=true`.

When `force=true`, the backend should:

```text
set timer_intervals.task_id to null where task_id = selected task id
delete the task
```

Auth:

```text
Required
```

Path Parameters:

```text
id: Task ID
```

Query Parameters:

```text
force: boolean, optional
```

Request Body:

```text
None
```

Response 204:

```text
No body
```

Conflict Response 409:

```json
{
  "error": {
    "code": "CONFLICT",
    "message": "Task has linked timer intervals. Confirm deletion to remove the task and unlink related timer intervals."
  },
  "conflict": {
    "timer_intervals_count": 7,
    "resolution": "Call DELETE /api/tasks/:id?force=true to delete the task and set linked task_id values to null."
  }
}
```

Error Responses:

```text
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
409 CONFLICT
500 INTERNAL_SERVER_ERROR
```

---

# Timer Session Endpoints

## POST /api/timer-sessions

Creates a new timer session for the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "planned_intervals": 4,
  "focus_duration_mins": 25,
  "break_duration_mins": 5,
  "started_at": "2026-05-28T09:00:00Z"
}
```

Response 201:

```json
{
  "timer_session": {
    "id": "uuid",
    "started_at": "2026-05-28T09:00:00Z",
    "ended_at": null,
    "planned_intervals": 4,
    "focus_duration_mins": 25,
    "break_duration_mins": 5,
    "created_at": "2026-05-28T09:00:00Z",
    "updated_at": "2026-05-28T09:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## PATCH /api/timer-sessions/:id/end

Ends an existing timer session owned by the authenticated user.

Auth:

```text
Required
```

Path Parameters:

```text
id: Timer session ID
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "ended_at": "2026-05-28T11:00:00Z"
}
```

Response 200:

```json
{
  "timer_session": {
    "id": "uuid",
    "started_at": "2026-05-28T09:00:00Z",
    "ended_at": "2026-05-28T11:00:00Z",
    "planned_intervals": 4,
    "focus_duration_mins": 25,
    "break_duration_mins": 5,
    "created_at": "2026-05-28T09:00:00Z",
    "updated_at": "2026-05-28T11:00:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
409 CONFLICT
500 INTERNAL_SERVER_ERROR
```

---

# Timer Interval Endpoints

## GET /api/timer-intervals

Returns timer intervals owned by the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
date: YYYY-MM-DD, optional, filters intervals by date
timezone: IANA timezone string, required if date is provided
start_date: YYYY-MM-DD, optional, filters intervals from this date
end_date: YYYY-MM-DD, optional, filters intervals up to this date
session_id: uuid, optional, filters intervals by timer session
task_id: uuid, optional, filters intervals by task
project_id: uuid, optional, filters intervals by project
type: FOCUS | BREAK | OTHER, optional, filters intervals by type
```

Request Body:

```text
None
```

Response 200:

```json
{
  "timer_intervals": [
    {
      "id": "uuid",
      "session_id": "uuid",
      "task_id": "uuid",
      "project_id": "uuid",
      "type": "FOCUS",
      "goal": "Finish API contract",
      "duration_mins": 25,
      "focus_score": 8,
      "started_at": "2026-05-28T09:00:00Z",
      "ended_at": "2026-05-28T09:25:00Z",
      "created_at": "2026-05-28T09:25:00Z",
      "updated_at": "2026-05-28T09:25:00Z"
    }
  ]
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## POST /api/timer-intervals

Creates a new timer interval for the authenticated user.

Auth:

```text
Required
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "session_id": "uuid",
  "task_id": "uuid",
  "project_id": "uuid",
  "type": "FOCUS",
  "goal": "Finish API contract",
  "duration_mins": 25,
  "focus_score": 8,
  "started_at": "2026-05-28T09:00:00Z",
  "ended_at": "2026-05-28T09:25:00Z"
}
```

Response 201:

```json
{
  "timer_interval": {
    "id": "uuid",
    "session_id": "uuid",
    "task_id": "uuid",
    "project_id": "uuid",
    "type": "FOCUS",
    "goal": "Finish API contract",
    "duration_mins": 25,
    "focus_score": 8,
    "started_at": "2026-05-28T09:00:00Z",
    "ended_at": "2026-05-28T09:25:00Z",
    "created_at": "2026-05-28T09:25:00Z",
    "updated_at": "2026-05-28T09:25:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

## PATCH /api/timer-intervals/:id

Updates an existing timer interval owned by the authenticated user.

This supports correcting mistakes in logged timer data.

Auth:

```text
Required
```

Path Parameters:

```text
id: Timer interval ID
```

Query Parameters:

```text
None
```

Request Body:

```json
{
  "task_id": "uuid",
  "project_id": "uuid",
  "type": "FOCUS",
  "goal": "Updated focus goal",
  "duration_mins": 30,
  "focus_score": 9,
  "started_at": "2026-05-28T09:00:00Z",
  "ended_at": "2026-05-28T09:30:00Z"
}
```

Response 200:

```json
{
  "timer_interval": {
    "id": "uuid",
    "session_id": "uuid",
    "task_id": "uuid",
    "project_id": "uuid",
    "type": "FOCUS",
    "goal": "Updated focus goal",
    "duration_mins": 30,
    "focus_score": 9,
    "started_at": "2026-05-28T09:00:00Z",
    "ended_at": "2026-05-28T09:30:00Z",
    "created_at": "2026-05-28T09:25:00Z",
    "updated_at": "2026-05-28T09:35:00Z"
  }
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

## DELETE /api/timer-intervals/:id

Deletes an existing timer interval owned by the authenticated user.

This supports correcting incorrectly logged timer data.

Auth:

```text
Required
```

Path Parameters:

```text
id: Timer interval ID
```

Query Parameters:

```text
None
```

Request Body:

```text
None
```

Response 204:

```text
No body
```

Error Responses:

```text
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
500 INTERNAL_SERVER_ERROR
```

---

# Insights Endpoints

## GET /api/insights/daily

Returns daily time tracking insights for the authenticated user.

The `timezone` query parameter is required so the backend can calculate the user's local day correctly.

Auth:

```text
Required
```

Query Parameters:

```text
date: YYYY-MM-DD, required
timezone: IANA timezone string, required
```

Example:

```text
GET /api/insights/daily?date=2026-05-28&timezone=Australia/Melbourne
```

Request Body:

```text
None
```

Response 200:

```json
{
  "date": "2026-05-28",
  "timezone": "Australia/Melbourne",
  "totals": {
    "focus_mins": 150,
    "break_mins": 30,
    "other_mins": 15,
    "average_focus_score": 7.8
  },
  "by_task": [
    {
      "task_id": "uuid",
      "task_title": "Draft API contract",
      "duration_mins": 50,
      "average_focus_score": 8.5
    }
  ],
  "by_project": [
    {
      "project_id": "uuid",
      "project_title": "Time Auditor App",
      "duration_mins": 100,
      "average_focus_score": 8.0
    }
  ]
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## GET /api/insights/weekly

Returns weekly time tracking insights for the authenticated user.

The `timezone` query parameter is required so the backend can calculate the user's local week correctly.

Auth:

```text
Required
```

Query Parameters:

```text
week_start: YYYY-MM-DD, required
timezone: IANA timezone string, required
```

Example:

```text
GET /api/insights/weekly?week_start=2026-05-25&timezone=Australia/Melbourne
```

Request Body:

```text
None
```

Response 200:

```json
{
  "week_start": "2026-05-25",
  "week_end": "2026-05-31",
  "timezone": "Australia/Melbourne",
  "totals": {
    "focus_mins": 780,
    "break_mins": 150,
    "other_mins": 60,
    "average_focus_score": 7.9
  },
  "by_day": [
    {
      "date": "2026-05-28",
      "focus_mins": 150,
      "break_mins": 30,
      "other_mins": 15,
      "average_focus_score": 7.8
    }
  ],
  "by_task": [
    {
      "task_id": "uuid",
      "task_title": "Draft API contract",
      "duration_mins": 100,
      "average_focus_score": 8.5
    }
  ],
  "by_project": [
    {
      "project_id": "uuid",
      "project_title": "Time Auditor App",
      "duration_mins": 300,
      "average_focus_score": 8.0
    }
  ]
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

## GET /api/insights/monthly

Returns monthly time tracking insights for the authenticated user.

The `timezone` query parameter is required so the backend can calculate the user's local month correctly.

Auth:

```text
Required
```

Query Parameters:

```text
month: YYYY-MM, required
timezone: IANA timezone string, required
```

Example:

```text
GET /api/insights/monthly?month=2026-05&timezone=Australia/Melbourne
```

Request Body:

```text
None
```

Response 200:

```json
{
  "month": "2026-05",
  "timezone": "Australia/Melbourne",
  "totals": {
    "focus_mins": 3200,
    "break_mins": 650,
    "other_mins": 240,
    "average_focus_score": 8.1
  },
  "by_day": [
    {
      "date": "2026-05-28",
      "focus_mins": 150,
      "break_mins": 30,
      "other_mins": 15,
      "average_focus_score": 7.8
    }
  ],
  "by_task": [
    {
      "task_id": "uuid",
      "task_title": "Draft API contract",
      "duration_mins": 220,
      "average_focus_score": 8.5
    }
  ],
  "by_project": [
    {
      "project_id": "uuid",
      "project_title": "Time Auditor App",
      "duration_mins": 900,
      "average_focus_score": 8.0
    }
  ]
}
```

Error Responses:

```text
400 VALIDATION_ERROR
401 UNAUTHORIZED
500 INTERNAL_SERVER_ERROR
```

---

# Validation Rules

## Profile

```text
email is optional
email must be a valid email format if provided
PATCH /api/profile does not update Supabase Auth login email
```

---

## Projects

```text
title is required
title must be a non-empty string
```

---

## Project Deletion

```text
If project has no linked tasks or timer intervals, delete immediately.

If project has linked tasks or timer intervals and force is not true, return 409 CONFLICT.

If project has linked tasks or timer intervals and force is true:
  set tasks.project_id to null where project_id = selected project id
  set timer_intervals.project_id to null where project_id = selected project id
  delete project
```

---

## Tasks

```text
title is required
title must be a non-empty string
description is optional
project_id is optional
if project_id is provided, it must belong to the authenticated user
due_date is optional
completed_at is optional
```

---

## Task Deletion

```text
If task has no linked timer intervals, delete immediately.

If task has linked timer intervals and force is not true, return 409 CONFLICT.

If task has linked timer intervals and force is true:
  set timer_intervals.task_id to null where task_id = selected task id
  delete task
```

---

## Timer Sessions

```text
planned_intervals is required
planned_intervals must be greater than 0
focus_duration_mins is required
focus_duration_mins must be greater than 0
break_duration_mins is required
break_duration_mins must be greater than or equal to 0
started_at is required
ended_at is optional
ended_at must be after started_at
```

---

## Timer Intervals

```text
session_id is required
session_id must belong to the authenticated user

task_id is optional
if task_id is provided, it must belong to the authenticated user

project_id is optional
if project_id is provided, it must belong to the authenticated user

type is required
type must be one of: FOCUS, BREAK, OTHER

goal is optional

duration_mins is required
duration_mins must be greater than 0

focus_score is optional
if type = FOCUS, focus_score must be between 1 and 10 if provided
if type = BREAK, focus_score should be null
if type = OTHER, focus_score should usually be null

started_at is required
ended_at is required
ended_at must be after started_at
```

---

## Insights

```text
timezone is required for all insights endpoints
timezone must be a valid IANA timezone string

Daily insights require date in YYYY-MM-DD format
Weekly insights require week_start in YYYY-MM-DD format
Monthly insights require month in YYYY-MM format

Insights must be calculated using the user's local timezone, not UTC calendar boundaries.
```

---

# Derived Values

The following values should be calculated from `timer_intervals` and not stored directly in the MVP database schema.

```text
Total task time = sum(timer_intervals.duration_mins) where task_id = selected task id

Total project time = sum(timer_intervals.duration_mins) where project_id = selected project id
plus intervals attached to tasks inside the selected project

Daily focus time = sum(timer_intervals.duration_mins) where type = FOCUS and started_at falls within the selected local date in the provided timezone

Daily break time = sum(timer_intervals.duration_mins) where type = BREAK and started_at falls within the selected local date in the provided timezone

Average focus score = avg(timer_intervals.focus_score) where type = FOCUS and focus_score is not null
```
