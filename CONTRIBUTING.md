# How to update the site

Everything is edited directly on github.com in a web browser. Each saved
change ("commit") rebuilds the site automatically; the live page updates
in about a minute. No software is required on your computer.

## Add a talk

1. Open the `_talks` folder in this repository on github.com.
2. Open `TEMPLATE.md` and copy its contents.
3. Go back to `_talks`, choose **Add file → Create new file**.
4. Name the file `YYYY-MM-DD-lastname.md`, using the talk date,
   for example `2026-10-12-rivera.md`.
5. Paste the template, fill in the fields between the two `---` lines,
   and **delete the `template: true` line**.
6. Press **Commit changes**.

Rules that keep the build happy:

- `date:` must be written `YYYY-MM-DD`.
- Keep the quotes around `title:` — a title containing a colon breaks
  the page without them.
- `semester:` must match the other entries for that semester exactly
  (for example `Fall 2026`), because it is what groups the schedule.
- Leave `room: ""` to show the default venue; type a room to override it.
- If a field does not apply (no host yet), delete the whole line.

## A week with no seminar

Create the file with only three fields:

```
---
semester: Fall 2026
date: 2026-11-23
note: "No seminar (Thanksgiving break)"
---
```

## The flyer

The flyer on the home page is generated automatically from the next
upcoming talk's entry: it shows the site banner, the speaker's photo,
name, affiliation, the talk title, and the date and room. Nothing
needs to be designed or uploaded week to week — the flyer rotates on
its own as each talk date passes.

To add the speaker's photo:

1. Open the `images` folder, choose **Add file → Upload files**, and
   upload the photo (square photos work best; name it after the
   speaker, for example `rivera.jpg`).
2. Open that talk's file in `_talks`, press the pencil icon, and set
   `photo: images/rivera.jpg`.
3. Commit.

If a talk has no `photo:` line, the flyer shows the speaker's
initials instead.

## The printable flyer

Every talk also gets a letter-size flyer page, built automatically
the moment the talk's file is committed. It is linked from the talk's
row on the schedule ("Flyer") and from the home-page card ("Printable
flyer"), and lives at `flyers/YYYY-MM-DD-lastname.html`.

A PDF of each flyer is also made automatically: a few minutes after a
talk is added or edited, a robot commit ("Update flyer PDFs") saves
`flyers/YYYY-MM-DD-lastname.pdf`, and the flyer page gains a
**Download PDF** link. Progress shows on the repository's **Actions**
tab, under "Flyer PDFs". The **Print / Save as PDF** button on the
flyer page works any time, too.

The flyer uses these fields from the talk's file:

- `title:` and the optional `subtitle:` (printed as a second line)
- `date:`, plus `time:` — leave `time:` out to use the usual seminar
  time from `_data/site.yml`
- `speaker:`, `affiliation:`, `photo:`
- the abstract, written below the second `---`
- `link:` (optional, e.g. the speaker's web page) — printed in the footer
- `host:` (optional) — printed in the footer

The banner text and logo are set once in `_data/site.yml`
(`flyer_series:` and `flyer_logo:`). Long titles and abstracts are
shrunk automatically to keep the flyer on one page.

## Edit the team or the links

- Team page: edit `_data/team.yml`. Photos go in `images/`.
- Links page: edit `_data/links.yml`.
- Site name, year, venue, time, contact address: edit `_data/site.yml`.

In these files, keep the indentation and the quotes exactly as they
are and change only the text between the quotes.

## If the site did not update

A broken build sends an email to whoever made the last commit. The
usual causes are a missing quote, a date not written `YYYY-MM-DD`, or
changed indentation in a `_data` file. Open your last edit, compare it
against `TEMPLATE.md` or the neighboring entries, and commit a fix.
