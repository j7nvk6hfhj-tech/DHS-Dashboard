# DHS Logistics Order Dashboard

A web dashboard for cement orders: FIFO tokens, a live dispatch queue, dealer list, day-wise and dealer-wise summaries, and an Excel download.

- **Website hosting:** GitHub Pages (free)
- **Login and database:** Google Firebase (the free "Spark" plan is enough for a small team)
- **Login:** Google account (Gmail) or any email with a password. Only emails you add on the **Team** page can get in.
- **Roles:** enforced by the database security rules in `firestore.rules`, so a person can't get around them by tinkering with the page.

| Role | Can do |
|---|---|
| **Admin** | Everything, including the Team page (who can log in) and the dealer list |
| **Dispatch** | Add, edit and cancel orders, and mark orders Dispatched |
| **Order desk** | Add, edit and cancel orders |
| **Viewer** | See everything, change nothing |

## Files

| File | What it is |
|---|---|
| `index.html` | The page and its styling |
| `app.js` | All the dashboard logic |
| `firebase-config.js` | **You edit this once**: your Firebase project settings |
| `firestore.rules` | Who can read and change what. Paste it into Firebase |

---

## Setup (about 20 minutes, one time)

### 1. Create the Firebase project
1. Go to <https://console.firebase.google.com> and sign in with the Google account that will own the system.
2. Click **Create a project**. Name it, for example `dhs-logistics`. You can turn Google Analytics off.

### 2. Turn on login
1. In the left menu, open **Build → Authentication → Get started**.
2. On the **Sign-in method** tab, enable **Google**, choose a support email, and save.
3. Also enable **Email/Password**. Keep only the first switch on, then save.

### 3. Create the database
1. Open **Build → Firestore Database → Create database**.
2. Location: **asia-south1 (Mumbai)**. This can't be changed later.
3. Start in **production mode**.
4. Open the **Rules** tab, delete what's there, paste the whole of `firestore.rules`, and click **Publish**.

### 4. Make yourself the first Admin
1. Still in Firestore, open the **Data** tab and click **Start collection**.
2. Collection ID: `members`
3. Document ID: **your email in small letters**, for example `owner@gmail.com`
4. Add field `role` (string) = `admin`
5. Add field `name` (string) = your name, then click **Save**.

You add everyone else from the dashboard's **Team** page later.

### 5. Connect the website to Firebase
1. Click the ⚙️ next to **Project Overview**, then **Project settings**.
2. Under **Your apps**, click the **</>** (Web) icon. Give it any nickname and click **Register app**. You don't need Firebase Hosting.
3. Firebase shows a `firebaseConfig = { ... }` block. Copy those values into `firebase-config.js`, replacing each `PASTE_...`.

### 6. Put it on GitHub Pages
1. Create a new repository on <https://github.com>, for example `dhs-dashboard`.
2. Click **Add file → Upload files**, upload all the files from this folder, and click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main / (root)**, then **Save**.
4. After a minute or two, the site is live at `https://YOUR-GITHUB-NAME.github.io/dhs-dashboard/`.

### 7. Allow your website address to log in
1. In Firebase, go to **Authentication → Settings → Authorized domains → Add domain**.
2. Add `YOUR-GITHUB-NAME.github.io`. Leave out `https://` and the folder name.

### 8. First login
1. Open your site and click **Sign in with Google**, using the email from step 4.
2. On the **Dealers** tab, check the dealer list. Dhaam Home Solutions, CL Traders and Shree Sai Associate are added automatically on your first login.
3. On the **Team** tab, add your staff's emails and pick each person's role.

---

## How your staff log in
- **With Gmail:** tap **Sign in with Google**.
- **With any other email:** type the email and a new password, then tap **Create account**. They get a verification email. After clicking the link in it, they come back and tap **I've verified**. Next time they just tap **Sign in**.
- Anyone whose email isn't on the Team page sees "not on the authorised list" and can't see any data.
- To remove someone's access, remove them on the Team page. It takes effect immediately.

## Good to know
- **Data window:** the dashboard loads the last **120 days** of orders, which keeps it fast and inside the free limits. Older orders stay in the database. To see older months, raise `DAYS_LOADED` at the top of `app.js`.
- **Free limits:** the Spark plan allows 50,000 database reads a day. Every time someone opens the dashboard, it reads all the orders in the 120-day window. A few people using it all day should be fine at a few thousand orders. If you ever hit the limit, Firebase's pay-as-you-go **Blaze** plan costs very little at this size.
- **Tokens:** these are numbered by order time within each day, so if someone enters an order with an earlier time, the later tokens move up by one.
- **Making changes:** edit the files in GitHub (click a file, then the ✏️ icon) and commit. The site updates within a minute or two.
- **Products list:** edit the `PRODUCTS` line near the top of the dashboard logic in `app.js`.
